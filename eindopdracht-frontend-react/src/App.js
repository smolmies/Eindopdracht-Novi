import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import './App.scss';

import Home from './pages/home/Home.js';
import AboutUs from './pages/aboutUs/AboutUs.js';
import Appointment from './pages/appointment/Appointment.js';
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
                  <Route path="/appointment">
                      <Appointment />
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
