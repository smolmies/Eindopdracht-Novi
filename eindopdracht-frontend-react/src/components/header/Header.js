import React from 'react';

import headerImage from './lilly-banner-2.jpg';
import './Header.css';

function Header() {
    return (
        <>
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