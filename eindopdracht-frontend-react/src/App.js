import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import './App.scss';

import Home from "./pages/home/Home.js";
import AboutUs from "./pages/aboutUs/AboutUs.js";
import Appointment from "./pages/appointment/Appointment.js";
import Contact from "./pages/contact/Contact.js";
import Login from "./pages/login/Login";
import NavBar from "./components/navBar/NavBar";


function App() {
  return (
      <Router>
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
              </Switch>
      </Router>
  );
}

export default App;
