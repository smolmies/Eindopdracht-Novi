import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Register.scss';

function Register() {
    const [ loading, toggleLoading ] = useState(false);
    const [ error, setError ] = useState('');
    const [ registerSuccess, setRegisterSuccess ] = useState(false);
    const { register, handleSubmit, errors } = useForm();
    const history = useHistory();

    async function sendRegisterData(data) {
        toggleLoading(true);
        setError('');
        try{
            const result = await axios.post('http://localhost:8080/api/auth/register', {
                email: data.email,
                phoneNumber: data.phoneNumber,
                username: data.username,
                password: data.password,
                });

            setRegisterSuccess(true);
        } catch (e) {
            if(e.message.includes('400')){
                setError('Er bestaat al een account met deze gebruikersnaam!');
            }
            else {
                setError('Er is iets misgegaan bij het verzenden. Probeer het opnieuw');
            }
        }
        toggleLoading(false);
    }

    useEffect(() => {
        if(registerSuccess === true){
            history.push('/login');
        }
    },[registerSuccess]);


    function togglePassword() {
        let p = document.getElementById("password");
        if(p.type === "password"){
            p.type = "text";
        }
        else{
            p.type = "password";
        };
    }

    return (
        <>

            {error && <p className="error-message">{error}</p>}
            <form id="sign-form" onSubmit={handleSubmit(sendRegisterData)}>
                <fieldset>
                    <legend>Maak hier een nieuw account aan</legend>

                    <label htmlFor="email">Email:
                        <input name="email" id="email" type="text" ref={register({required: true})}/>
                    </label>
                    <label htmlFor="phoneNumber">Telefoonnummer:
                        <input name="phoneNumber" id="phoneNumber" type="text" ref={register({required: true, pattern: /^((\+|00(\s|\s?\-\s?)?)31(\s|\s?\-\s?)?(\(0\)[\-\s]?)?|0)[1-9]((\s|\s?\-\s?)?[0-9])((\s|\s?-\s?)?[0-9])((\s|\s?-\s?)?[0-9])\s?[0-9]\s?[0-9]\s?[0-9]\s?[0-9]\s?[0-9]$/})}/>
                    </label>
                    <label htmlFor="username">Gebruikersnaam:
                        <input name="username" id="username" type="text" ref={register({required: true})} />
                        {errors.username && <p className="error-message">Gebruikersnaam is verplicht</p>}
                     </label>

                    <label htmlFor="password" title="Wachtwoord moet minimaal 6 karakters lang zijn en moet minimaal 1 hoofdletter en 1 speciaal teken bevatten.">Wachtwoord:
                        <input name="password" id="password" type="password" ref={register({required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[#$^+=!*()@%&]).{6,40}$/})}
                        />
                    </label>
                        {errors.password &&
                        <p className="error-message">Wachtwoord moet minimaal 6 karakters lang zijn en moet minimaal 1 hoofdletter en 1 speciaal teken bevatten.</p>
                        }
                        <input type="checkbox" onClick={togglePassword}/>Maak wachtwoord zichtbaar
                </fieldset>
                <button type="submit" className="submit-button" disabled={loading} >
                    {loading ? 'Laden...' : 'Maak een account aan'}
                </button>
            </form>
            <div id="signup-message">
                <h2>Een account aanmaken</h2>
                <p>Wij willen het je makkelijker maken om een verblijf voor je huisdier te boeken!
                    Als het verblijf jou en je huisdier is bevallen, dan wil je natuurlijk nog eens Witje bij ons laten logeren.
                    <br />
                    Indien je een account bij ons hebt worden je boekingen opgeslagen en kun je ze hergebruiken zodat je nog sneller een boeking kan maken!
                    Wij vullen het aanvraagformulier alvast voor je in met je vorige boeking, zo hoef je misschien alleen de datum nog te veranderen en klaar is kees.
                </p>
            </div>
        </>
    );
}


export default Register;