import React, { useEffect, useState } from 'react';
import { useAuthState } from '../../components/context/AuthContext';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './Profile.scss';
import UserCard from '../../components/cards/UserCard';
import BookingCard from '../../components/cards/BookingCard';

function Profile() {
    const { user } = useAuthState();
    const history = useHistory();
    const [error, setError] = useState('');
    const [protectedData, setProtectedData] = useState('');
    const [usersData, setUsersData] = useState([]);
    const [bookingsData, setBookingsData] = useState([]);

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

    async function getUsersAsAdmin() {
        setError('');
        try {
            const token = localStorage.getItem('token');
            const result = await axios.get('http://localhost:8080/api/admin/all/users', {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(result.data);
            setUsersData(result.data);
        } catch (e) {
            setError('Niet gelukt om data op te halen')
        }
    }

    async function getBookingsAsAdmin() {
        setError('');
        try {
            const token = localStorage.getItem('token');
            const result = await axios.get('http://localhost:8080/api/admin/all/bookings', {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(result.data);
            setBookingsData(result.data);
        } catch (e) {
            setError('Niet gelukt om data op te halen')
        }
    }

    return (
        <div id="profile-body">
            <h1>Profielpagina</h1>

            <h2 className="your-info">Jouw eigen gegevens</h2>
            {protectedData &&
            <>
                <UserCard
                    name={protectedData.username}
                    email={protectedData.email}
                    phoneNumber={protectedData.phoneNumber}
                    userId={protectedData.userId}
                />
                <button className="crud-button" type="button" onClick={() => {
                    history.push('/Edit')
                }}>Update je gegevens
                </button>
            </>
            }
            {error && <p className="error-message">{error}</p>}

            {user.roles.includes("ROLE_ADMIN") &&
                <>
                    <button className="crud-button" type="button" onClick={() => getUsersAsAdmin()}>Klik hier om alle gebruikers op te halen</button>
                    {usersData &&
                    usersData.map((data, index) => {
                        return (
                            <UserCard key={index}
                                      name={data.username}
                                      email={data.email}
                                      phoneNumber={data.phoneNumber}
                                      userId={index + 1}
                            />
                        );
                    })}
                    <button className="crud-button" type="button" onClick={() => getBookingsAsAdmin()}>Klik hier om alle boekingen op te halen</button>
                    {bookingsData &&
                    bookingsData.map((data, index) => {
                        return (
                            <BookingCard key={index}
                                      bookingId={data.bookingId}
                                      petName = {data.petName}
                                      startDate={new Date(data.startDate).toLocaleDateString()}
                                      endDate={new Date(data.endDate).toLocaleDateString()}
                                      specialNeeds={data.specialNeeds}
                                      extraInfo={data.extraInfo}
                            />
                        );
                    })}
                </>
            }
        </div>
    );
}

export default Profile;