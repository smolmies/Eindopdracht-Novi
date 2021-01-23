import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import {AuthContext, useAuthState} from '../../components/context/AuthContext';
import fullCatLogo from '../../components/styles/aan-de-cuwaart-logo-transparent.png';
import './Login.scss';

function Login() {
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');
    const { handleSubmit, register, errors } = useForm();
    const history = useHistory();
    const { login } = useContext(AuthContext);
    const { isAuthenticated } = useAuthState();

    useEffect(() => {
        console.log(isAuthenticated);
        if(isAuthenticated === true){
            history.push('/appointment');
        }
    },[isAuthenticated]);

    async function sendLoginData(data) {
        toggleLoading(true);
        setError('');
        try{
            const result = await axios.post('https://polar-lake-14365.herokuapp.com/api/auth/signin',
                {
                    username: data.username,
                    password: data.password,
                });
            // console.log(result);
            login(result.data);

        } catch (e) {
            console.log(e)
            setError('Inloggen is mislukt. Probeer opnieuw!');
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
                    {loading ? 'Laden...' : 'Log in'}
                </button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </>
    );
}

export default Login;