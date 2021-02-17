import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';

import Home from './pages/home/Home.js';
import AboutUs from './pages/aboutUs/AboutUs.js';
import Booking from './pages/booking/Booking.js';
import Contact from './pages/contact/Contact.js';
import Profile from './pages/profile/Profile.js';
import Login from './pages/login/Login.js';
import NavBar from './components/navBar/NavBar.js';
import Register from './pages/register/Register.js';
import {useAuthState} from './components/context/AuthContext.js';


function App() {
    const {isAuthenticated} = useAuthState();
  return (
      <BrowserRouter >
              <NavBar />
              <Switch>
                  <Route exact path="/">
                      <Home />
                  </Route>
                  <Route path="/about-us">
                      <AboutUs />
                  </Route>
                  <Route path="/booking">
                      {isAuthenticated ? (<Booking />) : (<Redirect to="/login" />)}
                  </Route>
                  <Route path="/contact">
                      <Contact />
                  </Route>
                  <Route path="/login">
                      <Login />
                  </Route>
                  <Route path="/register">
                      <Register />
                  </Route>
                  <Route path="/profile">
                      {isAuthenticated ? (<Profile />) : (<Redirect to="/login" />)}
                  </Route>
              </Switch>
      </BrowserRouter>
  );
}

export default App;
