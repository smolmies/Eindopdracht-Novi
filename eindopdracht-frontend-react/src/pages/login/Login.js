import React from 'react';
import { useForm } from "react-hook-form";
import './Login.scss';
import axios from "axios";

function Login() {
    const { register, handleSubmit, errors } = useForm();

    async function sendLoginData(formData) {
        try{
            const result = await axios.post('http://localhost:8080/login', formData);
            console.log(result);

        } catch (e) {
            console.log(e)
        }
    }

    function onSucces(formData) {
        sendLoginData(formData);
        console.log(formData);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSucces)}>
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


                </fieldset>
                <button type="submit" className="submit-button" onClick={console.log("je bent ingelogd")}>
                    Log in
                </button>
            </form>
        </>
    );
}

export default Login;