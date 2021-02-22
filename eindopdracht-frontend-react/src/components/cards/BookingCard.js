import React from 'react';
import Pawprint from './pawprint.svg';
import './Card.scss';

function BookingCard({bookingId, petName, startDate, endDate, specialNeeds, extraInfo}) {
    return (
        <article className="booking-card">
            <h2 className="booking-name">
                <img src={Pawprint} alt="Pawprint" />  Boeking nummer {bookingId}
            </h2>
            <h4 className="booking-details">Naam dier: {petName}</h4>
            <p className="booking-details">Startdatum: {startDate}</p>
            <p className="booking-details">Einddatum: {endDate}</p>
            <p className="booking-details">Speciaal: {specialNeeds}</p>
            <p className="booking-details">Extra: {extraInfo}</p>
        </article>
    );
}

export default BookingCard;