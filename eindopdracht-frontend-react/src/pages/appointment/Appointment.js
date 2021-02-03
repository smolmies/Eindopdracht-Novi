import React, { useState } from 'react';
import './Appointment.scss';
import {useForm} from "react-hook-form";
import axios from "axios";

function Appointment(props) {
    const { register, handleSubmit, errors } = useForm();
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');

const endPointLink = '';
    async function sendBookingData(data) {
        toggleLoading(true);
        setError('');
        try{
            const result = await axios.post(endPointLink, {
                ownerName: data.ownerName,
                phoneNumber: data.phoneNumber,
                email: data.email,
                startDate: data.startDate,
                endDate: data.endDate,
                amountPets: data.amountPets,
                petName: data.petName,
                petSpecialNeeds: data.petSpecialNeeds,
                petExtra: data.petExtra
            });
            console.log(result);
        } catch (e) {}

        toggleLoading(false);
    }
    return (
        <>
            <form id="booking-form" onSubmit={handleSubmit(sendBookingData)}>

                    <legend>Velden met een * zijn verplicht om in te vullen!</legend>
                    <label htmlFor="ownerName">* Naam:
                        <input name="ownerName" id="ownerName" type="text" size="40" ref={register({register: true})} />
                        {errors.ownerName && <p className="error-message">Naam is verplicht</p>}
                    </label>
                    <label htmlFor="phoneNumber">Telefoonnummer:
                        <input name="phoneNumber" id="phoneNumber" type="text" size="40" ref={register}/>
                    </label>
                    <label htmlFor="email">* Email:
                        <input name="email" id="email" type="email"  size="40" ref={register({required: true})}/>
                        {errors.email && <p className="error-message">Email is verplicht</p>}
                    </label>
                    <label htmlFor="amountPets">* Aantal huisdieren (max. aantal 5):
                        <input type="number" id="amountPets" name="amountPets" min="1" max="5" />
                    </label>
                    <label htmlFor="petName">Naam huisdier:
                        <input name="petName" id="petName" type="text" size="40" ref={register}/>
                    </label>
                    <label htmlFor="petSpecialNeeds"> Speciale behoeftes:
                        <input type="radio" id="no" name="specialCheck" value="no"/><label>Nee</label>
                        <input type="radio" id="yes" name="specialCheck" value="yes"/><label>Ja, namelijk:</label>
                        <br />
                        <textarea name="petSpecialNeeds" id="petSpecialNeeds" rows="6" cols="50" placeholder="Bijv. Poes moet iedere dag met natvlees haar medicijnen innemen" ref={register}/>
                    </label>
                    <label htmlFor="petExtra"> Andere bijzonderheden:
                        <br />
                        <textarea name="petExtra" id="petExtra" rows="6" cols="50" placeholder="Bijv. Poes is erg schuw, dus veel verstop plekken maken haar blijer" ref={register}/>
                    </label>

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

                    <button type="submit" className="submit-button" disabled={loading} >
                        {loading ? 'Laden...' : 'Boek mijn afspraak!'}
                    </button>
            </form>
        </>
    );
}

export default Appointment;