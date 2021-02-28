import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './Booking.scss';

function Booking() {
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [available, setAvailable] = useState('');
    const { register, handleSubmit, errors } = useForm();

    async function checkIfDateAvailable() {
        toggleLoading(true);
        setError('');
        setAvailable('');
        let startDate = document.getElementById('startDate').value;
        let endDate = document.getElementById('endDate').value;

        try{
            const result = await axios.post('http://localhost:8080/api/booking/checkDate',
            {startDate, endDate}
            );
            setAvailable("Beschikbaar voor boeking!");
        } catch(e){
            setError("Deze datums zijn niet beschikbaar voor een boeking");
        }
        toggleLoading(false);
    }

    async function sendBookingData(data) {
        toggleLoading(true);
        setError('');
        try{
            const token = localStorage.getItem('token');
            const result = await axios.post('http://localhost:8080/api/booking/create', {
                startDate: data.startDate,
                endDate: data.endDate,
                amountPets: data.amountPets,
                petName: data.petName,
                specialNeeds: data.specialNeeds,
                extraInfo: data.extraInfo
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            setSuccess(true);
        } catch (e) {
            setError(e);
        }
        toggleLoading(false);
    }

    return (
            <form id="booking-form" onSubmit={handleSubmit(sendBookingData)}>
                {error && <p className="error-message">{error}</p>}
                <div id="date-picker">
                    <fieldset>
                        <legend>Gewenste dagen voor het verblijf</legend>
                        <label htmlFor="startDate">* Startdatum:
                            <input type="date" id="startDate" name="startDate" ref={register({required: true})} />
                            {errors.startDate && <p className="error-message">Startdatum is verplicht</p>}
                        </label>
                        <label htmlFor="endDate">* Einddatum:
                            <input type="date" id="endDate" name="endDate" ref={register({required: true})} />
                            {errors.endDate && <p className="error-message">Einddatum is verplicht</p>}
                        </label>
                        {available && <p className="success-message">{available}</p>}
                        <button className="check-date" type="button" onClick={checkIfDateAvailable}>Check datum(s) voor beschikbaarheid</button>
                    </fieldset>
                </div>
                    <label htmlFor="amountPets">* Aantal huisdieren (max. aantal 5):
                        <input type="number" id="amountPets" name="amountPets" min="1" max="5" ref={register({required: true})}/>
                    </label>
                    <label htmlFor="petName">* Naam huisdier:
                        <input name="petName" id="petName" type="text" size="35" ref={register}/>
                    </label>
                    <label htmlFor="specialNeeds"> Speciale behoeftes:
                        <br />
                        <textarea name="specialNeeds" id="specialNeeds" rows="5" cols="40" placeholder="Bijv. Poes moet iedere dag met natvlees haar medicijnen innemen." ref={register}/>
                    </label>
                    <label htmlFor="extraInfo"> Andere bijzonderheden:
                        <br />
                        <textarea name="extraInfo" id="extraInfo" rows="5" cols="40" placeholder="Bijv. Poes is erg schuw, dus graag veel rust en ruimte geven." ref={register}/>
                    </label>
                        <legend>Velden met een * zijn verplicht om in te vullen!</legend>
                {success && <p className="success-message">Je boeking is goed aangekomen bij ons en<br /> wij nemen z.s.m. contact met je op om de prijs en betaling te regelen!</p>}
                    <button type="submit" className="submit-button" disabled={loading} >
                        {loading ? 'Laden...' : 'Maak mijn boeking!'}
                    </button>
            </form>
    );
}

export default Booking;