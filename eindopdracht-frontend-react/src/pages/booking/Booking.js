import React, { useState } from 'react';
import './Booking.scss';
import {useForm} from "react-hook-form";
import axios from "axios";

function Booking() {
    const { register, handleSubmit, errors } = useForm();
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(true);


    async function sendBookingData(data) {
        toggleLoading(true);
        setError('');
        try{
            const result = await axios.post('http://localhost:8080/api/booking/create', {
                ownerName: data.ownerName,
                email: data.email,
                startDate: data.startDate,
                endDate: data.endDate,
                amountPets: data.amountPets,
                petName: data.petName,
                specialNeeds: data.specialNeeds,
                extraInfo: data.extraInfo
            });
            console.log(result);
        } catch (e) {}

        toggleLoading(false);
    }
    return (
        <>
            <form id="booking-form" onSubmit={handleSubmit(sendBookingData)}>
                <div className="submit-succeeded">
                    {success && <p className="success-message">Je boeking is goed aangekomen bij ons en<br /> wij nemen z.s.m. contact met je op om betaling te regelen!</p>}
                </div>
                    <label htmlFor="ownerName">* Naam:
                        <input name="ownerName" id="ownerName" type="text" size="35" ref={register({required: true})} />
                        {errors.ownerName && <p className="error-message">Naam is verplicht</p>}
                    </label>
                    <label htmlFor="email">* Email:
                        <input name="email" id="email" type="email"  size="35" ref={register({required: true})}/>
                        {errors.email && <p className="error-message">Email is verplicht</p>}
                    </label>
                    <label htmlFor="amountPets">* Aantal huisdieren (max. aantal 5):
                        <input type="number" id="amountPets" name="amountPets" min="1" max="5" ref={register({required: true})}/>
                    </label>
                    <label htmlFor="petName">Naam huisdier:
                        <input name="petName" id="petName" type="text" size="35" ref={register}/>
                    </label>
                    <label htmlFor="specialNeeds"> Speciale behoeftes:
                        <br />
                        <textarea name="specialNeeds" id="specialNeeds" rows="6" cols="40" placeholder="Bijv. Poes moet iedere dag met natvlees haar medicijnen innemen." ref={register}/>
                    </label>
                    <label htmlFor="extraInfo"> Andere bijzonderheden:
                        <br />
                        <textarea name="extraInfo" id="extraInfo" rows="6" cols="40" placeholder="Bijv. Poes is erg schuw, dus graag veel rust en ruimte geven." ref={register}/>
                    </label>
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
                        <legend>Velden met een * zijn verplicht om in te vullen!</legend>
                        <div id="price-window">
                        <h2>De berekende prijs voor het verblijf:</h2>
                        {}
                        </div>

                    </div>

                    <button type="submit" className="submit-button" disabled={loading} >
                        {loading ? 'Laden...' : 'Boek mijn afspraak!'}
                    </button>
            </form>
        </>
    );
}

export default Booking;