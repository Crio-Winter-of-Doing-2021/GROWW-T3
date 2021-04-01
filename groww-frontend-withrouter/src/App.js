//Packages
import React from 'react';
import {Switch, Route} from 'react-router-dom';

//Styling
import './App.css';

//My Defined Components
import LandingPage from '../src/Screens/Landing/LandingPage';
import Dashboard from "./Components/HOC/Dashboard/Dashboard";

function App() {
  return (
    <div>

      <Switch>

        <Route path = '/' component = {LandingPage} exact/>
        <Route path = "/dashboard" component = {Dashboard}/>

      </Switch>


    </div>
  );
}

export default App;
