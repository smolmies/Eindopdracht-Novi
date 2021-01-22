import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import './Login.scss';
import axios from "axios";
import fullCatLogo from "../../components/styles/aan-de-cuwaart-logo-transparent.png";

function Login() {
    const [loading, toggleLoading] = useState(false);
    const { register, handleSubmit, errors } = useForm();

    async function sendLoginData(formData) {
        toggleLoading(true);
        try{
            const result = await axios.post('http://localhost:8080/login', formData);
            console.log(result);

        } catch (e) {
            console.log(e)
        }
        toggleLoading(false);
    }

    function togglePassword() {
        let p = document.getElementById("password");
        if(p.type === "password"){p.type = "text";}
        else{p.type = "password";}
    }

    return (
        <>
            <img id="colored-logo" src={fullCatLogo} alt="Logo van het pension"/>
            <form id="sign-form" onSubmit={handleSubmit(sendLoginData)}>
                <fieldset>
                    <legend>Log hier in</legend>

                        <label htmlFor="username">Gebruikersnaam:
                        <input name="username" id="username" type="text" ref={register({required: true})}
                        />
                        {errors.username && <p className="error-message">Gebruikersnaam is verplicht</p>}
                        </label>

                        <label htmlFor="password">Wachtwoord:
                        <input name="password" id="password" type="password" ref={register(
                            {required: true, pattern: /^[\w!@#$%^&*()_=+?-]{6,25}$/})}
                        />
                            <input type="checkbox" onClick={togglePassword}/>Maak wachtwoord zichtbaar
                        {errors.password && <p className="error-message">Wachtwoord moet tussen 6 en 25 karakters zijn en mag letters, cijfers en speciale tekens bevatten.</p>}
                        </label>

                </fieldset>
                <button type="submit" className="submit-button" disabled={loading}>
                    {loading ? 'Loading...' : 'Log in'}
                </button>
            </form>
        </>
    );
}

export default Login;