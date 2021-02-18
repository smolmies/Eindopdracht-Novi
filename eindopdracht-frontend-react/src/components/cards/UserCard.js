import React from 'react';
import Pawprint from './pawprint.svg';
import './UserCard.scss';

function UserCard({name, userId, email, phoneNumber}) {
    return (
            <article className="user-card">

                <h2 className="user-name">
                    <img src={Pawprint} alt="Pawprint" /> {name}
                </h2>
                <p className="user-details">ID: {userId}</p>
                <p className="user-details">Email: {email}</p>
                <p className="user-details">Telefoon: {phoneNumber}</p>
            </article>
    );
}

export default UserCard;