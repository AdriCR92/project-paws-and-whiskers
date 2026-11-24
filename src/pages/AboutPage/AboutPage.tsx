import "../../styles/AboutPage.css"
import developerImage from "../../images/developer-and-max.png"
import reactIcon from "../../assets/react.svg"
import viteIcon from "../../assets/vite.svg"
import catApiIcon from "../../images/cat-icon.png"
import cssIcon from "../../images/CSS-icon.png"
import htmlIcon from "../../images/HTML-icon.png"
import typescript from "../../images/ts-icon.png"

const technologies = [
    { name: "CSS" , icon: cssIcon },
    { name: "HTML" , icon: htmlIcon },
    { name: "TypeScript", icon: typescript},
    { name: "React" , icon: reactIcon },
    { name: "Vite" , icon: viteIcon },
    { name: "The Cat API" , icon: catApiIcon }
    
]

function AboutPage() {
    return (
        <section className="about-page" aria-labelledby="about-title">
            <h1 className="about-page__title" id="about-title">Meet the Developer</h1>

            <div className="about-page__content">
                <figure className="about-page__portrait">
                    <img
                        className="about-page__image"
                        src={developerImage}
                        alt="Adri cuddling with her gray cat, Max"
                        width={240}
                        height={320}
                    />
                    <figcaption>Adri &amp; Max</figcaption>
                </figure>

                <div className="about-page__description">
                    <h2>Hi, I’m Adri.</h2>
                    <p>I’m a web developer and the creator of Paws &amp; Whiskers, my final project at TripleTen.</p>
                    <p>I’m also a cat mom to Max, my gray-and-white tuxedo cat. He’s been part of my life for almost three years.</p>

                    <section className="about-page__inspiration">
                        <h2>The Inspiration Behind Paws &amp; Whiskers</h2>
                        <p>Max inspired me to create a place where people can explore cat breeds and learn what life with different cats might be like.</p>
                        <p>Sometimes your perfect match finds you. That’s what happened with Max. He came into my life when I least expected it, filled my heart, and made my days a little happier.</p>
                    </section>
                </div>
            </div>

            <section className="about-page__build">
                <div>
                    <h2>Built with Love &amp; Code</h2>
                    <ul className="about-page__technologies">
                        {technologies.map(({ name, icon }) => (
                            <li key={name}>
                                {icon && <img src={icon} alt="" width={18} height={18} />}
                                {name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="about-page__links">
                    <a href="https://github.com/AdriCR92">
                        <span className="about-page__github-icon" aria-hidden="true" />
                        GitHub
                    </a>
                    <a href="https://www.linkedin.com/in/adriana-capriles-rivera/">
                        <span className="about-page__linkedIn-icon" aria-hidden="true" />
                        LinkedIn
                    </a>
                </div>
            </section>
        </section>
    )
}

export default AboutPage
