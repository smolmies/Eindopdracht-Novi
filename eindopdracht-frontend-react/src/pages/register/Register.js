import React from 'react';
import './Register.scss';
import {useForm} from "react-hook-form";
import axios from "axios";


function Register() {
    const { register, handleSubmit, errors } = useForm();

    async function sendRegisterData(formData) {
        try{
            const result = await axios.post('http://localhost:8080/register', formData);
            console.log(result);

        } catch (e) {
            console.log(e)
        }
    }

    function onSuccess(formData) {
        sendRegisterData(formData);
        console.log(formData);
    }

    return (
        <>
            <form id="register-form" onSubmit={handleSubmit(onSuccess)}>
                <fieldset>
                    <div className="input-field">
                        <label htmlFor="username">Gebruikersnaam: </label>

                        <input name="username" id="username" type="text" ref={register({register: true})} />
                        {errors.username && <p className="error-message">Gebruikersnaam is verplicht</p>}
                    </div>

                    <div className="input-field">
                        <label htmlFor="password">Wachtwoord: </label>
                        <input name="password" id="password" type="text" ref={register({required: true, pattern: /^[\w!@#$%^&*()_=+?-]{6,25}$/})}
                        />
                        {errors.password && <p className="error-message">Wachtwoord moet tussen 6 en 25 karakters zijn en mag letters, cijfers en speciale tekens bevatten.</p>}
                    </div>
                    <div className="input-field">
                        <label htmlFor="repeatPassword">Herhaal wachtwoord: </label>
                        <input name="repeatPassword" id="repeatPassword" type="text" ref={register({required: true, pattern: /^[\w!@#$%^&*()_=+?-]{6,25}$/})}
                        />
                        {errors.repeatPassword && <p className="error-message">Wachtwoord moet tussen 6 en 25 karakters zijn en mag letters, cijfers en speciale tekens bevatten.</p>}
                    </div>

                </fieldset>
                <button type="submit" className="submit-button" onClick={console.log("je bent geregistreerd")}>
                    Log in
                </button>
            </form>
        </>
    );
}

export default Register;