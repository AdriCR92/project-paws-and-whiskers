import "../../styles/Main.css"
import heroImage from "../../assets/images/home-hero Small.png"
import pawIcon from "../../assets/images/paw-icon Small.png"
import quizIcon from "../../assets/images/quiz-icon Small.png"

function Main () {
    return (
        <>
        <section className="home-hero">
            <div className="home-hero__content">
                <h1 className="home-hero__tittle">Find your kind of cat</h1>
                <p>Explore cat breeds and find one that fits your preferences.</p>
                <a className="home-hero__link" href="#explore-cats">
                    Explore cats
                </a>
            </div>

            <img
            className="home-hero__image"
            src={heroImage}
            alt="A fluffy cat resting on a blanket"
            />
        </section>
        <div className="home-shortcuts">
            <a className="home-shortcuts__card home-shortcuts__card--match" href="#pawfect-match">
                <img
                className="home-shortcuts__icon"
                src={quizIcon}
                alt="Quiz Icon"
                />
                <h2 className="home-shortcuts__title">Find Your Pawfect Match</h2>
                <p>Take a short quiz to find breeds that fit your preferences.</p>
            </a>

            <a className="home-shortcuts__card" href="#about-author">
                <img
                className="home-shortcuts__icon"
                src={pawIcon}
                alt="Paw Icon"
                />
                <h2 className="home-shortcuts__title">About Paws & Whiskers</h2>
                <p>Meet the creator and the cat who inspired the app.</p>
            </a>
        </div>
        
        </>
        
    )
}
export default Main