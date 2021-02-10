import React, { useContext } from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import { AuthContext, useAuthState } from '../context/AuthContext';
import './NavBar.scss';
import catLogo from './aan-de-cuwaart-logo-transparent.svg';

function NavBar() {
    const { logout } = useContext(AuthContext);
    const { isAuthenticated } = useAuthState();
    const history = useHistory();
return(
    <nav>
        <img id="logo" src={catLogo} alt="logo of a cat silhouette" />
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
                <NavLink to="/booking">Afspraak maken</NavLink>
            </li>
            <li>
            <NavLink to="/contact">
                Contact
            </NavLink>
            </li>

        </ul>
        <div className="button-pack">
            {isAuthenticated ? (
                <>
                <button type='button' className="sign-button" onClick={logout}>Log uit</button>
                <button type='button' className="profile-button" onClick={() => history.push('/profile')}>Mijn profiel</button>
                </>
            ) : (
                <>
                <button type='button' className="sign-button" onClick={() => history.push('/register')}>Registreer</button>
                <button type='button' className="sign-button" onClick={() => history.push('/login')}>Log in</button>
                </>
            )}
        </div>
    </nav>
    );
}

export default NavBar;