import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './Register.scss';

const endPointUpLink = 'https://polar-lake-14365.herokuapp.com/api/auth/signup';

function Register() {
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');
    const [ registerSuccess, setRegisterSuccess ] = useState(false);
    const { register, handleSubmit, errors } = useForm();

    async function sendRegisterData(data) {
        toggleLoading(true);
        setError('');
        try{
            const result = await axios.post(endPointUpLink, {
                username: data.username,
                password: data.password,
                email: data.email,
                });
            console.log(result);
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

    function togglePassword() {
        let p = document.getElementById("password");
        let rp = document.getElementById("repeatPassword");
        if(p.type === "password" && rp.type === "password"){
            p.type = "text";
            rp.type = "text";
        }
        else{
            p.type = "password";
            rp.type = "password";
        };}

    return (
        <>
            <div id="signup-message">
                <h2>Een account aanmaken</h2>
                <p>Wij willen het je makkelijker maken om een verblijf voor je huisdier te boeken!
                    Als het verblijf jou en je huisdier is bevallen, dan wil je natuurlijk nog eens Witje bij ons laten logeren.
                    <br />
                    Indien je een account bij ons hebt worden je boekingen opgeslagen en kun je ze hergebruiken zodat je nog sneller een boeking kan maken!
                    Wij vullen het aanvraagformulier alvast voor je in met je vorige boeking, zo hoef je misschien alleen de datum nog te veranderen en klaar is kees.
                </p>
            </div>
            {registerSuccess === true && <p className="success-message">Yeey het is gelukt! Je kunt nu <Link to='/login'>hier </Link>inloggen</p>}
            {error && <p className="error-message">{error}</p>}
            <form id="sign-form" onSubmit={handleSubmit(sendRegisterData)}>
                <fieldset>
                    <legend>Maak hier een nieuw account aan</legend>

                    <label htmlFor="email">Email:
                        <input name="email" id="email" type="text" ref={register({required: true})}/>
                    </label>

                    <label htmlFor="username">Gebruikersnaam:
                        <input name="username" id="username" type="text" ref={register({register: true})} />
                        {errors.username && <p className="error-message">Gebruikersnaam is verplicht</p>}
                     </label>

                    <label htmlFor="password">Wachtwoord:
                        <input name="password" id="password" type="password" ref={register({required: true, pattern: /^[\w!@#$%^&*()_=+?-]{6,25}$/})}
                        />
                    </label>
                        {errors.password && <p className="error-message">Wachtwoord moet tussen 6 en 25 karakters zijn en mag letters, cijfers en speciale tekens bevatten.</p>}
                    <label htmlFor="repeatPassword">Herhaal Wachtwoord:
                        <input name="repeatPassword" id="repeatPassword" type="password" ref={register({required: true, pattern: /^[\w!@#$%^&*()_=+?-]{6,25}$/})}
                        />
                        <input type="checkbox" onClick={togglePassword}/>Maak wachtwoord zichtbaar
                    </label>

                </fieldset>
                <button type="submit" className="submit-button" disabled={loading} >
                    {loading ? 'Laden...' : 'Maak een account aan'}
                </button>
            </form>

        </>
    );
}

export default Register;