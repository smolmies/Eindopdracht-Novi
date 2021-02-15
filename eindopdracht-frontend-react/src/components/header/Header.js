import React from 'react';
import differentHeaderImage from './cat-header.jpg';
import './Header.scss';

function Header() {
    return (
        <>
            <div className="image-container">
                <img src={differentHeaderImage} alt="Header cozy cat" className="header-image" />
                <h1>Kattenpension
                    <br />
                    'Aan de Cuwaart'
                </h1>
            </div>
        </>
    );
}

export default Header;