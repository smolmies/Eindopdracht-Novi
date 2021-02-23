import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext, useAuthState } from '../../components/context/AuthContext';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function EditUser(){
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');
    const { register, handleSubmit, errors } = useForm();
    const { user } = useAuthState();
    const { logout } = useContext(AuthContext);
    const history = useHistory();

    async function sendUpdateData(data){
        toggleLoading(true);
        setError('');

        let p = document.getElementById("password").value;
        let rp = document.getElementById("repeatedPassword").value;
        if(p !== rp){
            setError("Wachtwoorden zijn niet gelijk!")
        }
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
            console.log(result);
            history.push('/profile');
        } catch (e) {
            console.log(e)
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
            console.log(result);
            logout();
            history.push('/');
        } catch (e) {
            console.log(e)
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
                        <input name="phoneNumber" id="phoneNumber" type="text" ref={register({required: true, pattern: /^((\+|00(\s|\s?\-\s?)?)31(\s|\s?\-\s?)?(\(0\)[\-\s]?)?|0)[1-9]((\s|\s?\-\s?)?[0-9])((\s|\s?-\s?)?[0-9])((\s|\s?-\s?)?[0-9])\s?[0-9]\s?[0-9]\s?[0-9]\s?[0-9]\s?[0-9]$/})}/>
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
                <button className="crud-button" type="button" onClick={() => {deleteMyAccount()}}>VERWIJDER MIJN ACCOUNT</button>
            </form>

        </>
    )
}
export default EditUser;