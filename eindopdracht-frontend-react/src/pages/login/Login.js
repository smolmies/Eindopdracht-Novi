import React from 'react';
import { useForm } from "react-hook-form";
import './Login.css';

function Login() {
    const { register, handleSubmit, errors } = useForm();
    const onSucces = (formData) => {console.log(formData)};

    return (
        <>
            <form onSubmit={handleSubmit(onSucces)}>
                <fieldset>
                    <div>
                        <label htmlFor="userName">Gebruikersnaam: </label>

                        <input name="userName" id="userName" type="text" ref={register({register: true})} />
                        {errors.firstName && <p>Gebruikersnaam is verplicht</p>}
                    </div>

                    <div>
                        <label htmlFor="password">Wachtwoord: </label>
                        <input name="password" id="password" type="text" ref={register({required: true, pattern: /^[\w!@#$%^&*()_=+?-]{6,25}$/})}
                        />
                        {errors.password && <p>Wachtwoord moet tussen 6 en 25 karakters zijn en mag letters, cijfers en speciale tekens bevatten.</p>}
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