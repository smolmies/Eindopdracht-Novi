import React, { useState, useEffect } from 'react';
import '../booking/Booking.scss';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useHistory } from "react-router-dom";

function EditBooking(){
    const history = useHistory();
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');
    const [personalBookings, setPersonalBookings] = useState([]);
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

    async function sendBookingUpdate(data){
        toggleLoading(true);
        setError('');
        try{
            const token = localStorage.getItem('token');
            const result = await axios.patch('http://localhost:8080/api/booking/update', {
                bookingId: data.bookingId,
                startDate: data.startDate,
                endDate: data.endDate,
                amountPets: data.amountPets,
                petName: data.petName,
                specialNeeds: data.specialNeeds,
                extraInfo: data.extraInfo
            },{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(result);
            history.push('/profile');
        } catch (e) {
            console.log(e)
        }
        toggleLoading(false);
    }

    function Options({ options }){
        return(
          options.map(option =>
              <option key={option.bookingId} name={option.bookingId} value={option.bookingId}>
                  {option.bookingId}
              </option>)
        );
    }
    {/*{personalBookings.length > 0*/}
    {/*&& personalBookings?.map((data, index) => {*/}
    {/*    return (<option key={index} value={data.bookingId}>{data.bookingId}</option>);*/}
    {/*        */}
    {/*    })}*/}

    return (

        <form id="booking-form" onSubmit={handleSubmit(sendBookingUpdate)}>
            {error && <p className="error-message">{error}</p>}

            <label htmlFor="bookingId">Welke boeking wil je wijzigen:</label>
                <select id="bookingId" name="bookingId">
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

            </div>

            <button type="submit" className="submit-button" disabled={loading} >
                {loading ? 'Laden...' : 'Boek mijn afspraak!'}
            </button>
        </form>

    );

}

export default EditBooking;