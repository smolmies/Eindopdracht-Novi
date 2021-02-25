import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './Booking.scss';

function Booking() {
    const { register, handleSubmit, errors } = useForm();
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);


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
            console.log(result);
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
                        <label htmlFor="startDate">Startdatum:
                            <input type="date" id="startDate" name="startDate" ref={register({required: true})} />
                            {errors.startDate && <p className="error-message">Startdatum is verplicht</p>}
                        </label>
                        <label htmlFor="endDate">Einddatum:
                            <input type="date" id="endDate" name="endDate" ref={register({required: true})} />
                            {errors.endDate && <p className="error-message">Einddatum is verplicht</p>}
                        </label>
                    </fieldset>
                </div>
                    <label htmlFor="amountPets">* Aantal huisdieren (max. aantal 5):
                        <input type="number" id="amountPets" name="amountPets" min="1" max="5" ref={register({required: true})}/>
                    </label>
                    <label htmlFor="petName">Naam huisdier:
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

                    <div id="price">
                        <legend>Velden met een * zijn verplicht om in te vullen!</legend>
                        <h2>De berekende prijs voor het verblijf:</h2>

                            {success && <p className="success-message">Je boeking is goed aangekomen bij ons en<br /> wij nemen z.s.m. contact met je op om betaling te regelen!</p>}
                    </div>

                    <button type="submit" className="submit-button" disabled={loading} >
                        {loading ? 'Laden...' : 'Maak mijn boeking!'}
                    </button>
            </form>

    );
}

export default Booking;