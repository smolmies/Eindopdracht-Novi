import React from 'react';
import { useForm } from "react-hook-form";
import './Login.css';

function Login(props) {
    const { register, handleSubmit, errors} = useForm();
    return (
        <>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <div>
                        <label htmlFor="userName">Gebruikersnaam: </label>

                        <input name="userName" id="userName" type="text" ref={register({register: true})} />
                        {errors.firstName && <p>Gebruikersnaam is verplicht</p>}
                    </div>

                    <div>
                        <label htmlFor="password">Wachtwoord: </label>
                        <input name="password" id="password" type="text" ref={register({required: true, pattern: /^[a-zA-Z]{6}$/})}
                        />
                        {errors.password && <p>Wachtwoord klopt niet</p>}
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