import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext, useAuthState } from "../../components/context/AuthContext";
import { useHistory } from "react-router-dom";
import axios from 'axios';

function Edit(){
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');
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
            console.log(result);
            history.push('/profile');
        } catch (e) {
            console.log(e)
        }
        toggleLoading(false);
    }

    async function deleteMyAccount(data){
        toggleLoading(true);
        setError('');
        try{
            const token = localStorage.getItem('token');
            const userToDelete = data;
            const result = await axios.delete('http://localhost:8080/api/user/delete', {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }, data: userToDelete
                }

            );
            console.log(result);
            logout();
            history.push('/');
        } catch (e) {
            console.log(e)
        }
        toggleLoading(false);
    }

    useEffect(() => {

        let p = document.getElementById("password").value;
        let rp = document.getElementById("repeatedPassword").value;

        if(p !== rp){
            setError("Wachtwoorden zijn niet gelijk!")
        }
    },[])


    return(
        <>
            <form id="sign-form" onSubmit={handleSubmit(sendUpdateData)}>
                <fieldset>
                    <legend>Pas hier je gegevens aan!</legend>
                    {error && <p className="error-message">{error}</p>}
                    <label htmlFor="email">Email:
                        <input name="email" id="email" type="text" ref={register({required: true})}/>
                    </label>
                    <label htmlFor="phoneNumber">Telefoonnummer:
                        <input name="phoneNumber" id="phoneNumber" type="text" ref={register}/>
                    </label>
                    <label htmlFor="password">Wachtwoord:
                        <input name="password" id="password" type="password" ref={register({required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[#$^+=!*()@%&]).{6,40}$/})}
                        />
                    </label>
                    {errors.password &&
                    <p className="error-message">Wachtwoord moet minimaal 6 karakters lang zijn en moet minimaal 1 hoofdletter en 1 speciaal teken bevatten.</p>
                    }
                    <label htmlFor="repeatedPassword">Herhaal wachtwoord:
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
                <button className="crud-button" type="button" onClick={() => {deleteMyAccount("meep")}}>VERWIJDER MIJN ACCOUNT</button>
            </form>

        </>
    )
}
export default Edit;