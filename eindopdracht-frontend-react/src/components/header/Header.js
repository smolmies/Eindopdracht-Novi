import React from 'react';
import {NavLink} from 'react-router-dom';

function Header(props) {
    return ( <>
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
                    </ul>
                </nav>
                <div className="image-container">
                    <img src="././assets/cat-background.jpg" alt="Header image plants" className="header-image" />
                    <h1>Dierenpension 'Aan de Cuwaart'</h1>
                </div>
            </header>
        </>
    );
}

export default Header;