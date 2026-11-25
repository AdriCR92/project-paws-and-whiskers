import "../../styles/Header.css"
import { NavLink } from "react-router-dom"
import pawLogo from "../../images/paws-logo.png"

function Header() {
    return (
        <header className="header"> 
            <div className="header__inner">
                <span className="header__brand">
                    <img src={pawLogo} alt="" width={66} height={66} />   
                    Paws & Whiskers
                </span>
                <ul className="header__menu">
                    <li><NavLink to="/" end>Home</NavLink></li>
                    <li><NavLink to="/explore">Explore Cats</NavLink></li>
                    <li className="header__menu-item--highlighted">
                        <NavLink to="/pawfect-match">Pawfect Match</NavLink>
                    </li>
                    <li><NavLink to="/about">About</NavLink></li>
                </ul>
            </div>
        </header>
    );
}

export default Header;
