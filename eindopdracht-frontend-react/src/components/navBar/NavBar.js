import {NavLink, useHistory} from 'react-router-dom';
import './NavBar.scss';
import catLogo from './aan-de-cuwaart-logo-transparent.svg';


function NavBar() {
    const history = useHistory();
return(
    <nav><img id="logo" src={catLogo} alt="logo of a cat silhouette" />
        <ul>

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
            </ul>
        <div className="button-pack">
        <button type='button' className="sign-button" onClick={() => history.push('/register')}>Registreer</button>
        <button type='button' className="sign-button" onClick={() => history.push('/login')}>Log in</button>
        </div>
    </nav>
    );
}

export default NavBar;