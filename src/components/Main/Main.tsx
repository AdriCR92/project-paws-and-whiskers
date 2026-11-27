import "../../styles/Main.css"
import { Link } from "react-router-dom"
import homeImage from "../../images/home-img.png"
import pawIcon from "../../images/paw-icon.png"
import quizIcon from "../../images/quiz-icon.png"

function Main () {
    return (
        <>
        <section className="home-page">
            <div className="home-page__content">
                <h1 className="home-page__tittle">Find your kind of cat</h1>
                <p>Explore cat breeds and get to know their personalities, coats, and origins.</p>
                <Link className="home-page__link" to="/explore">
                    Explore cats
                </Link>
            </div>

            <img
            className="home-page__image"
            src={homeImage}
            alt="A fluffy cat resting on a blanket"
            />
        </section>
        <div className="home-shortcuts">
            <Link 
                className="home-shortcuts__card home-shortcuts__card--match" 
                to="/pawfect-match"
            >
                <img
                className="home-shortcuts__icon"
                src={quizIcon}
                alt="Quiz Icon"
                />
                <h2 className="home-shortcuts__title">Find Your Pawfect Match</h2>
                <p>Take a short quiz to find breeds that fit your preferences.</p>
            </Link>

            <Link className="home-shortcuts__card" to="/about">
                <img
                className="home-shortcuts__icon"
                src={pawIcon}
                alt="Paw Icon"
                />
                <h2 className="home-shortcuts__title">About Paws & Whiskers</h2>
                <p>Meet the creator and the cat who inspired the app.</p>
            </Link>
        </div>
        
        </>
        
    )
}
export default Main
