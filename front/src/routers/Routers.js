import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { LoginScreen } from '../auth/LoginScreen';
import { CalendarScreen } from '../components/Calendar/CalendarScreen';


export const Routers = () => {
    return (
        <Router>
    

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
         <Route exact path="/login" component={LoginScreen} />
         <Route exact path="/" component={CalendarScreen} />
         
        </Switch>
     
    </Router>
    )
}
