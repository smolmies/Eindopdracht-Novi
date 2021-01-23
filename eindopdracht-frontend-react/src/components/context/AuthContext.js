import React, { createContext, useContext, useState, useEffect } from 'react';
// import {useHistory} from "react-router-dom";

const AuthContext = createContext({});

function AuthContextProvider({ children }) {

     // const history = useHistory();

    const [authState, setAuthState] = useState({
        status: 'pending',
        error: null,
        user: null,
    });

    useEffect(() => {

        setTimeout(() => {
        // er is geen token, dus we beginnen met een schone lei!
            setAuthState({
                ...authState,
                status: 'done',
            })
        },1000)
    }, []);


    function login(data) {
        localStorage.setItem('token', data.accessToken);
        setAuthState({
            ...authState,
            user: {
                username: data.username,
                email: data.email,
                roles: data.roles,
            }
        })
    }

    function logout() {
    localStorage.clear();
    setAuthState({
        ...authState,
        user: null,
    });
    // history.push('/appointment')
    }

    const providerData = {
        ...authState,
        login,
        logout,
    };

    return(
        <AuthContext.Provider value={providerData}>
            { authState.status === 'done' && children }
            { authState.status === 'pending' && <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

    function useAuthState() {
        const authState = useContext(AuthContext);
        const isDone = authState.status === 'done';
        const isAuthenticated = authState.user !== null && isDone;

        return{
            ...authState,
            isAuthenticated: isAuthenticated,
        }
    }

export {
    AuthContext,
    AuthContextProvider,
    useAuthState,
}