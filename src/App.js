import React from 'react';
import './App.scss';
import { EntryComponent } from './components/entryComponent/entryComponent.js';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { HomeComponent } from "./components/homeComponent/homeComponent.js";
import SignUpComponent from './components/signUpComponent/signUpComponent';

const App=(
    <Router>
        <Route exact path="/" component={EntryComponent} />
        <Route path="/home" component={HomeComponent} />
        <Route path="/new-user" component={SignUpComponent} />
    </Router>);
    
export {App};
