import React, { useEffect, useState } from 'react';
import { useAuthState } from '../../components/context/AuthContext';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import './Profile.scss';
import UserCard from "../../components/cards/UserCard";

function Profile() {
    const { user } = useAuthState();
    const history = useHistory();
    const [error, setError] = useState('');
    const [protectedData, setProtectedData] = useState('');
    const [adminData, setAdminData] = useState([]);

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
                setProtectedData(response.data);
            } catch (e) {
                setError('Er is iets misgegaan bij het ophalen van de data')
            }
        }

        getProtectedData();
    }, []);

    async function getAdminData() {
        setError('');
        try {
            const token = localStorage.getItem('token');
            const result = await axios.get('http://localhost:8080/api/admin/all', {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(result.data);
            setAdminData(result.data);
        } catch (e) {
            setError('Niet gelukt om data op te halen')
        }
    }

    return (
        <div id="profile-body">
            <h1>Profielpagina</h1>

            <h2>Jouw eigen gegevens</h2>
            {protectedData &&
            <>
                <UserCard
                    name={protectedData.username}
                    email={protectedData.email}
                    phoneNumber={protectedData.phoneNumber}
                    userId={protectedData.userId}
                />
                <button type="button" onClick={() => {
                    history.push('/Edit')
                }}>Update je gegevens
                </button>
            </>
            }
            {error && <p className="error-message">{error}</p>}

            {user.roles.includes("ROLE_ADMIN") &&
            <>
                <button type="button" onClick={() => getAdminData()}>Klik hier om alle gebruikers op te halen</button>
                {adminData &&
                adminData.map((data, index) => {
                    return (
                        <UserCard key={index}
                                  name={data.username}
                                  email={data.email}
                                  phoneNumber={data.phoneNumber}
                                  userId={index + 1}
                        />
                    );
                })}
            </>}
        </div>
    );
}

export default Profile;