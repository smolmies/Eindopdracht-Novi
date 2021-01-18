import {NavLink} from 'react-router-dom';
import './NavBar.scss';
import catLogo from './aan-de-cuwaart-logo-transparent.svg';


function NavBar() {
return(
    <nav>
        <ul>
            <img id="logo" src={catLogo} alt="logo of a cat silhouette" />
            <li>
                <NavLink exact to="/">
                    Welkom
                </NavLink>
            </li>
            <li>
                <NavLink to="/about-us">
                    Over ons
                </NavLink>
            </li>
            <li>
                <NavLink to="/appointment">
                    Afspraak maken
                </NavLink>
            </li>

            <li>
                <NavLink to="/contact">
                    Contact
                </NavLink>
            </li>
            <button type='button' className="login-button">
                <NavLink exact to="/login">Login</NavLink>
            </button>
        </ul>
    </nav>
    );
}

export default NavBar;