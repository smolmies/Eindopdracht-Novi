import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import '../booking/Booking.scss';

function EditBooking(){
    const history = useHistory();
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');
    const [available, setAvailable] = useState('');
    const [checkedTerms, toggleCheckedTerms] = useState(false);
    const [personalBookings, setPersonalBookings] = useState([]);
    const [priceCalculated, setPriceCalculated] = useState('');
    const { register, handleSubmit, errors } = useForm();

    useEffect(() =>{
        async function getPersonalBookings() {
        setError('');
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/api/booking', {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            setPersonalBookings(response.data);

        } catch (e) {
            setError('Er is iets misgegaan bij het ophalen van de data')
        }
    }
    getPersonalBookings();
    },[])

    async function checkIfDateAvailable() {
        toggleLoading(true);
        setError('');

        let startDate = document.getElementById('startDate').value;
        let endDate = document.getElementById('endDate').value;
        console.log(startDate);
        try{ const result = await axios.post('http://localhost:8080/api/booking/checkDate',
            {startDate, endDate});
            setAvailable("Beschikbaar voor boeking!");
        } catch(e){
            setError("Deze datums zijn niet beschikbaar voor een boeking");
        }
        toggleLoading(false);
    }

    async function sendBookingUpdate(data){
        toggleLoading(true);
        setError('');
        try{
            const token = localStorage.getItem('token');
            const result = await axios.patch('http://localhost:8080/api/booking/update', {
                bookingId: data.bookingId,
                startDate: data.startDate,
                endDate: data.endDate,
                specialNeeds: data.specialNeeds,
                extraInfo: data.extraInfo
            },{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            history.push('/profile');
        } catch (e) {
            setError(e);
        }
        toggleLoading(false);
    }

    async function deletePersonalBooking(bookingId) {
        setError('');
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete('http://localhost:8080/api/booking/delete', {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }, data: bookingId
            });
            history.push("/profile");
        } catch (e) {
            setError('Er is iets misgegaan bij het bewerken van de data')
        }
    }

    function Options({ options }){
        return(
          options.map(option =>
              <option key={option.bookingId} name={option.bookingId} value={option.bookingId}>
                  Boeking nummer {option.bookingId} (voor {option.petName}) van {new Date(option.startDate).toLocaleDateString()} t/m {new Date(option.endDate).toLocaleDateString()}
              </option>)
        );
    }

    return (
        <>
            <form className="booking-form" onSubmit={handleSubmit(sendBookingUpdate)}>
                {error && <p className="error-message">{error}</p>}

                <label htmlFor="bookingId">Welke boeking wil je wijzigen:</label>
                    <select id="bookingId" name="bookingId" ref={register({required: true})}>
                        <Options options={personalBookings} />
                    </select>
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
                <label htmlFor="specialNeeds"> Speciale behoeftes:
                    <br />
                    <textarea name="specialNeeds" id="specialNeeds" rows="5" cols="40" placeholder="Bijv. Poes moet iedere dag met natvlees haar medicijnen innemen." ref={register}/>
                </label>
                <label htmlFor="extraInfo"> Andere bijzonderheden:
                    <br />
                    <textarea name="extraInfo" id="extraInfo" rows="5" cols="40" placeholder="Bijv. Poes is erg schuw, dus graag veel rust en ruimte geven." ref={register}/>
                </label>
                    <legend>Velden met een * zijn verplicht om in te vullen!</legend>
                <button type="submit" className="submit-button" disabled={loading} >
                    {loading ? 'Laden...' : 'Wijzig mijn boeking!'}
                </button>
                <br />
                <label htmlFor="delete-check">
                    <input
                        type="checkbox" name="delete-check" id="delete-check" checked={checkedTerms} onChange={() => toggleCheckedTerms(!checkedTerms)}/>
                    Ik wil deze boeking verwijderen!
                </label>
                <button className="crud-button" type="button" disabled={!checkedTerms} onClick={() => deletePersonalBooking(document.getElementById('bookingId').value)}>Verwijder deze boeking</button>
            </form>
        </>
    );

}

export default EditBooking;