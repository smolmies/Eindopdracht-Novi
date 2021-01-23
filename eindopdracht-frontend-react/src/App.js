import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
} from 'react-router-dom';
import './App.scss';

import Home from './pages/home/Home.js';
import AboutUs from './pages/aboutUs/AboutUs.js';
import Appointment from './pages/appointment/Appointment.js';
import Contact from './pages/contact/Contact.js';
import Login from './pages/login/Login';
import NavBar from './components/navBar/NavBar';
import Register from './pages/register/Register';
import {useAuthState} from './components/context/AuthContext';


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
                      {/*{isAuthenticated ? (<Appointment />) : (<Redirect to="/login" />)}*/}
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
              </Switch>
      </BrowserRouter>
  );
}

export default App;
