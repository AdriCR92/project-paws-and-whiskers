import { useState } from 'react'
import firstCat from '../../../../images/Q1Cat-image.jpeg'
import secondCat from '../../../../images/Q2Cat-image.jpeg'
import thirdCat from '../../../../images/Q3Cat-image.jpeg'
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
    const [answers, setAnswers] = useState<Partial<Record<typeof questions[number]['id'], string>>>({})
    const question = questions[step]
    const progressLabel = `Question ${step + 1} of ${questions.length}`

    return (
        <section className="match-page" aria-labelledby="match-page-title">
            <header className="match-page__intro">
                <h1 id="match-page-title">Pawfect Match Quiz</h1>
                <p>Discover cat breeds based on your preferences.</p>
            </header>
            <div className="match-page__layout">
                <div className="match-page__card">
                    <p aria-live="polite">{progressLabel}</p>
                    <progress aria-label={progressLabel} value={step + 1} max={questions.length} />
                    <fieldset className="match-page__question">
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
                        <button type="button" disabled={step === 0} onClick={() => setStep(step - 1)}>
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
                                disabled
                            >
                                See My Match
                            </button>
                        )}
                    </div>
                </div>
                <img className="match-page__photo" src={question.image} alt="" width={256} height={320} />
            </div>
        </section>
    )
}

export default MatchPage
