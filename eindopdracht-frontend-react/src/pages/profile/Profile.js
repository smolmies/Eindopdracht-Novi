import React, { useEffect, useState } from 'react';
import { useAuthState } from '../../components/context/AuthContext';
import axios from 'axios';
import './Profile.scss';

function Profile() {
    const { user } = useAuthState();
    const [error, setError] = useState('');
    const [protectedData, setProtectedData] = useState('');

    useEffect(() => {
        async function getProtectedData() {
            setError('');
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/api/user', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
                console.log(response.data);
                setProtectedData(response.data);
            } catch(e) {
                setError('Er is iets misgegaan bij het ophalen van de data')
            }
        }

        getProtectedData();
    }, []);
    return (
        <div id="profile-body">
            <h1>Profielpagina</h1>
            <h2>Gegevens</h2>
            {user &&
            <>
                <p><strong>Gebruikersnaam: </strong>{user.username}</p>
                <p><strong>Email: </strong>{user.email}</p>
            </>
            }
            <h2>Afgeschermde content voor ingelogde gebruikers</h2>
            {protectedData && <p>{protectedData}</p>}
            {error && <p className="message-error">{error}</p>}
        </div>
    );
}

export default Profile;