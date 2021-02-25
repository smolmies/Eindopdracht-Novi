import React, { useEffect, useState } from 'react';
import { useAuthState } from '../../components/context/AuthContext';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import UserCard from '../../components/cards/UserCard';
import BookingCard from '../../components/cards/BookingCard';
import './Profile.scss';

function Profile() {
    const { user } = useAuthState();
    const history = useHistory();
    const [error, setError] = useState('');
    const [personalData, setPersonalData] = useState([]);
    const [personalBookings, setPersonalBookings] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [bookingsData, setBookingsData] = useState([]);

    useEffect(() => {
        async function getPersonalData() {
            setError('');
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/api/user', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
                setPersonalData(response.data);
            } catch (e) {
                setError('Er is iets misgegaan bij het ophalen van de data')
            }
        }

        getPersonalData();
    }, []);

    async function getPersonalBookings() {
        setError('');
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/api/booking', {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            setPersonalBookings(response.data);
        } catch (e) {
            setError('Er zijn geen boekingen gevonden')
        }
    }

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
            {personalData &&
            <>
                <UserCard
                    name={personalData.username}
                    email={personalData.email}
                    phoneNumber={personalData.phoneNumber}
                    userId={personalData.userId}
                />
                <button className="crud-button" type="button" onClick={() => {history.push('/edit/user')}}>
                    Update je gegevens
                </button>
                <button className="crud-button" type="button" onClick={() => getPersonalBookings()}>
                    Haal mijn boekingen op!
                </button>
            </>
            }
            {error && <p className="error-message">{error}</p>}

            <div className="bookings-container">
                {personalBookings &&
                    personalBookings?.map((data, index) => {
                        return (
                            <>
                                <BookingCard key={index}
                                 bookingId={data.bookingId}
                                 petName = {data.petName}
                                 startDate={new Date(data.startDate).toLocaleDateString()}
                                 endDate={new Date(data.endDate).toLocaleDateString()}
                                 specialNeeds={data.specialNeeds}
                                 extraInfo={data.extraInfo}
                                />
                                <button className="crud-button" type="button" onClick={() => history.push('/edit/booking')}>Wijzig of verwijder boeking</button>

                            </>
                    )})
                }
            </div>

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
                    <div className="bookings-container">
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
                    </div>
                </>
            }
        </div>
    );
}

export default Profile;