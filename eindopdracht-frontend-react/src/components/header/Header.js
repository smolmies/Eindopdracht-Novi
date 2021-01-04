import React from 'react';
import { NavLink } from 'react-router-dom';
import headerImage from './lilly-banner.jpg';
import './Header.css';

function Header() {
    return (
        <>
            <header>
                <nav>
                    <ul>
                        <li>
                            <NavLink exact to="/">
                                Welkom
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/about-us">
                                Over ons
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/appointment">
                                Afspraak maken
                            </NavLink>
                        </li>

                        <li>
                            <NavLink exact to="/contact">
                                Contact
                            </NavLink>
                        </li>
                        <button>Login</button>
                    </ul>
                </nav>
            </header>
            <div className="image-container">
                <img src={headerImage} alt="Header cozy cat" className="header-image" />
                <h1>Dierenpension
                    <br />
                    'Aan de Cuwaart'
                </h1>
            </div>
        </>
    );
}

export default Header;