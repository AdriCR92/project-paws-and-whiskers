import "../../styles/Header.css"
import pawLogo from "../../images/paws-logo.png"

function Header() {
    return (
        <header className="header"> 
            <div className="header__inner">
                <span className="header__brand">
                    <img src={pawLogo} alt="" width={24} height={24} />   
                    Paws & Whiskers
                </span>
                <ul className="header__menu">
                    <li>Home</li>
                    <li>Explore Cats</li>
                    <li className="header__menu-item--highlighted">Pawfect Match</li>
                    <li>About</li>
                </ul>
            </div>
        </header>
    );
}

export default Header;