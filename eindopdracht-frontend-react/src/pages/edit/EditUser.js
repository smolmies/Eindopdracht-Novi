import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext, useAuthState } from '../../components/context/AuthContext';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function EditUser(){
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');
    const [checkedTerms, toggleCheckedTerms] = useState(false);
    const { register, handleSubmit, errors } = useForm();
    const { user } = useAuthState();
    const { logout } = useContext(AuthContext);
    const history = useHistory();

    async function sendUpdateData(data){
        toggleLoading(true);
        setError('');
        try{
            const token = localStorage.getItem('token');
            const result = await axios.patch('http://localhost:8080/api/user/update', {
                email: data.email,
                phoneNumber: data.phoneNumber,
                password: data.password,
                repeatedPassword: data.repeatedPassword,
            },{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });

            history.push('/profile');
        } catch (e) {
            setError("Account kan niet gewijzigd worden met deze gegevens.")
        }
        toggleLoading(false);
    }

    async function deleteMyAccount(){
        toggleLoading(true);
        setError('');
        try{
            const token = localStorage.getItem('token');
            const userToDelete = user.username;
            const result = await axios.delete('http://localhost:8080/api/user/delete', {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }, data: userToDelete
            });

            logout();
            history.push('/');
        } catch (e) {
            setError("Je account kan niet verwijderd worden. Check of je nog boekingen ingepland hebt " +
                "in de toekomst en annuleer die eerst voordat je je account verwijderd!");
        }
        toggleLoading(false);
    }

    return(
        <>
            <form id="sign-form" onSubmit={handleSubmit(sendUpdateData)}>
                <fieldset>
                    <legend>Vul hier je nieuwe gegevens in!</legend>
                    {error && <p className="error-message">{error}</p>}
                    <label htmlFor="email">Email:
                        <input name="email" id="email" type="text" ref={register({required: true})}/>
                    </label>
                    <label htmlFor="phoneNumber">Telefoonnummer:
                        <input name="phoneNumber" id="phoneNumber" type="text" ref={register({required: true})}/>
                    </label>
                    <label htmlFor="password" title="Wachtwoord moet minimaal 6 karakters lang zijn en moet minimaal 1 hoofdletter en 1 speciaal teken bevatten.">Wachtwoord:
                        <input name="password" id="password" type="password" ref={register({required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[#$^+=!*()@%&]).{6,40}$/})}
                        />
                    </label>
                    {errors.password &&
                    <p className="error-message">Wachtwoord moet minimaal 6 karakters lang zijn en moet minimaal 1 hoofdletter en 1 speciaal teken bevatten.</p>
                    }
                    <label htmlFor="repeatedPassword" title="Wachtwoord moet minimaal 6 karakters lang zijn en moet minimaal 1 hoofdletter en 1 speciaal teken bevatten.">Herhaal wachtwoord:
                        <input name="repeatedPassword" id="repeatedPassword" type="password" ref={register({required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[#$^+=!*()@%&]).{6,40}$/})}
                        />
                    </label>
                    {errors.repeatedPassword &&
                    <p className="error-message">Wachtwoord moet minimaal 6 karakters lang zijn en moet minimaal 1 hoofdletter en 1 speciaal teken bevatten.</p>
                    }

                </fieldset>
                <button type="submit" className="submit-button" disabled={loading} >
                    {loading ? 'Laden...' : 'Wijzig mijn gegevens'}
                </button>
                <label>
                <input
                    type="checkbox" name="delete-check" id="delete-check" checked={checkedTerms} onChange={() => toggleCheckedTerms(!checkedTerms)}/>
                    Weet je zeker dat je jouw account wilt verwijderen?
                </label>
                <button className="crud-button" type="button" disabled={!checkedTerms} onClick={() => {deleteMyAccount()}}>VERWIJDER MIJN ACCOUNT</button>
            </form>

        </>
    )
}
export default EditUser;