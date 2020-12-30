import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import './App.css';
import Header from "./components/header/Header.js";
import Home from "./pages/home/Home.js";
import AboutUs from "./pages/aboutUs/AboutUs.js";
import Appointment from "./pages/appointment/Appointment.js";
import Contact from "./pages/contact/Contact.js";


function App() {
  return (
      <Router>
              <Header />
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
              </Switch>
      </Router>
  );
}

export default App;
