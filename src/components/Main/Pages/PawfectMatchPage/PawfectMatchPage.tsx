import { useRef, useState } from 'react'
import { findBreedMatch } from '../../../../data/breeds'
import MatchResultPopup from '../../Popup/MatchResultPopup/MatchResultPopup'
import firstCat from '../../../../images/Q1Cat-image.jpeg'
import secondCat from '../../../../images/Q2Cat-image.jpeg'
import thirdCat from '../../../../images/Q3Cat-image.jpeg'
import fourthCat from '../../../../images/Q4Cat-image.jpeg'
import '../../../../styles/PawfectMatchPage.css'

const questions = [
    {
        title: 'What’s your ideal day at home?',
        options: ['A quiet day curled up on the couch', 'A little downtime and a little play', 'An active day with lots to do'],
        image: firstCat,
    },
    {
        title: 'How much time would you spend playing with your cat?',
        options: ['A short play session each day', 'A few play breaks throughout the day', 'Lots of time for interactive play'],
        image: secondCat,
    },
    {
        title: 'How often would you enjoy brushing your cat?',
        options: ['Occasionally', 'A few times a week', 'Every day'],
        image: thirdCat,
    },
    {
        title: 'What kind of companion would you prefer?',
        options: ['An independent cat who likes their own space', 'A cat who enjoys company and quiet time', 'A social cat who likes to stay close'],
        image: fourthCat,
    },
]

function MatchPage() {
    const [step, setStep] = useState(0)
    const [answers, setAnswers] = useState<Partial<Record<number, number>>>({})
    const resultDialog = useRef<HTMLDialogElement>(null)
    const selectedOptions = questions.map((_, index) => answers[index])
    const match = selectedOptions.every((option) => option !== undefined)
        ? findBreedMatch(selectedOptions)
        : undefined
    const question = questions[step]
    const progressLabel = `Question ${step + 1} of ${questions.length}`

    return (
        <section className="match-page" aria-labelledby="match-page-title">
            <header className="match-page__intro">
                <h1 id="match-page-title">Pawfect Match Quiz</h1>
                <p>Find a cat breed that fits your lifestyle.</p>
            </header>
            <div className="match-page__layout">
                <div className="match-page__card">
                    <p aria-live="polite">{progressLabel}</p>
                    <progress aria-label={progressLabel} value={step + 1} max={questions.length} />
                    <fieldset className="match-page__question">
                        <legend>{question.title}</legend>
                        {question.options.map((option, optionIndex) => (
                            <label className="match-page__option" key={option}>
                                <input
                                    type="radio"
                                    name={`question-${step}`}
                                    value={option}
                                    checked={answers[step] === optionIndex}
                                    onChange={() => setAnswers({ ...answers, [step]: optionIndex })}
                                />
                                {option}
                            </label>
                        ))}
                    </fieldset>
                    <div className="match-page__actions">
                        <button type="button" disabled={step === 0} onClick={() => setStep(step - 1)}>
                            Back
                        </button>
                        {step < questions.length - 1 ? (
                            <button
                                className="match-page__next"
                                type="button"
                                disabled={answers[step] === undefined}
                                onClick={() => setStep(step + 1)}
                            >
                                Next <span aria-hidden="true">→</span>
                            </button>
                        ) : (
                            <button
                                className="match-page__next"
                                type="button"
                                disabled={!match}
                                onClick={() => resultDialog.current?.showModal()}
                            >
                                See My Match
                            </button>
                        )}
                    </div>
                </div>
                <img className="match-page__photo" src={question.image} alt="" width={256} height={320} />
            </div>
            <MatchResultPopup dialogRef={resultDialog} breed={match} />
        </section>
    )
}

export default MatchPage
