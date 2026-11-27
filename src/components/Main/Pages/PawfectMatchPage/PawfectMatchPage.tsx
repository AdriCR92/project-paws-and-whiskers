import ErrorPopup from '../../Popup/ErrorPopup/ErrorPopup'
import { useRef, useState } from 'react'
import MatchResultPopup from '../../Popup/MatchResultPopup/MatchResultPopup'
import type { MatchResult, QuizAnswers } from '../../../../types/types'
import { getBreeds } from '../../../../utils/catFactsApi'
import { findBreedMatch } from '../../../../utils/findBreedMatch'
import firstCat from '../../../../images/Q1Cat-image.jpeg'
import secondCat from '../../../../images/Q2Cat-image.jpeg'
import thirdCat from '../../../../images/Q3Cat-image.jpeg'
import pawIcon from '../../../../images/paw-icon.png'
import '../../../../styles/PawfectMatchPage.css'

const questions = [
    {
        id: 'coat',
        title: 'What kind of coat do you prefer?',
        options: ['Short hair', 'Long hair', 'No preference'],
        image: firstCat,
    },
    {
        id: 'pattern',
        title: 'Which coat pattern do you like most?',
        options: ['Solid', 'Tabby', 'Pointed', 'No preference'],
        image: secondCat,
    },
    {
        id: 'country',
        title: 'Where would you like your match to be from?',
        options: ['Asia', 'Europe', 'North America', 'Anywhere'],
        image: thirdCat,
    },
] as const

function MatchPage() {
    const [step, setStep] = useState(0)
    const [answers, setAnswers] = useState<QuizAnswers>({})
    const [result, setResult] = useState<MatchResult | null>(null)
    const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
    const headingRef = useRef<HTMLHeadingElement>(null)
    const dialogRef = useRef<HTMLDialogElement>(null)
    const seenBreedsByAnswers = useRef(new Map<string, Set<string>>())
    const question = questions[step]
    const progressLabel = `Question ${step + 1} of ${questions.length}`

    const answersKey = JSON.stringify(questions.map(({ id }) => answers[id]))

    function handleRetake() {
        if (result) {
            const seenBreeds = seenBreedsByAnswers.current.get(answersKey) ?? new Set<string>()
            const breedName = result.breed.breed

            if (seenBreeds.has(breedName)) seenBreeds.clear()
            seenBreeds.add(breedName)
            seenBreedsByAnswers.current.set(answersKey, seenBreeds)
        }
        dialogRef.current?.close()
        setStep(0)
        setAnswers({})
        setResult(null)
        setStatus('idle')
        headingRef.current?.focus()
    }

    async function handleSeeMatch() {
        setStatus('loading')

        try {
            const catalog = await getBreeds()
            if (catalog.length === 0) throw new Error('The breed catalog is empty.')

            setResult(findBreedMatch(catalog, answers, seenBreedsByAnswers.current.get(answersKey)))
            dialogRef.current?.showModal()
            setStatus('idle')
        } catch {
            setStatus('error')
        }
    }

    return (
        <section className="match-page" aria-labelledby="match-page-title">
            <header className="match-page__intro">
                <h1 className="page-title-with-paws" id="match-page-title" ref={headingRef} tabIndex={-1}>
                    <img src={pawIcon} alt="" />
                    <span>Pawfect Match Quiz</span>
                    <img src={pawIcon} alt="" />
                </h1>
                <p>Discover cat breeds based on your preferences.</p>
            </header>
            <div className="match-page__layout">
                <div className="match-page__card">
                    <p aria-live="polite">{progressLabel}</p>
                    <progress aria-label={progressLabel} value={step + 1} max={questions.length} />
                    <fieldset className="match-page__question" disabled={status === 'loading'}>
                        <legend>{question.title}</legend>
                        {question.options.map((option) => (
                            <label className="match-page__option" key={option}>
                                <input
                                    type="radio"
                                    name={question.id}
                                    value={option}
                                    checked={answers[question.id] === option}
                                    onChange={() => setAnswers({ ...answers, [question.id]: option })}
                                />
                                {option}
                            </label>
                        ))}
                    </fieldset>
                    <div className="match-page__actions">
                        <button type="button" disabled={step === 0 || status === 'loading'} onClick={() => setStep(step - 1)}>
                            Back
                        </button>
                        {step < questions.length - 1 ? (
                            <button
                                className="match-page__next"
                                type="button"
                                disabled={answers[question.id] === undefined}
                                onClick={() => setStep(step + 1)}
                            >
                                Next <span aria-hidden="true">→</span>
                            </button>
                        ) : (
                            <button
                                className="match-page__next"
                                type="button"
                                disabled={answers[question.id] === undefined || status === 'loading'}
                                onClick={handleSeeMatch}
                            >
                                <span role="status">{status === 'loading' ? 'Finding your match…' : 'See My Match'}</span>
                            </button>
                        )}
                    </div>
                    {status === 'error' && (
                        <ErrorPopup
                            title="We couldn’t find your match"
                            description="Your answers are saved for this attempt."
                            onRetry={handleSeeMatch}
                        />
                    )}
                </div>
                <img className="match-page__photo" src={question.image} alt="" width={256} height={320} />
            </div>
            <MatchResultPopup dialogRef={dialogRef} result={result} onRetake={handleRetake} />
        </section>
    )
}

export default MatchPage
