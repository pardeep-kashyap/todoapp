import React from 'react';
import './App.scss';
import EntryComponent from './components/entryComponent/entryComponent.js';
import { Route, BrowserRouter as Router, HashRouter } from 'react-router-dom';
import HomeComponent from './components/homeComponent/homeComponent.js';
import ActivityComponent from './components/activityComponent/activityComponent.js';
import SignUpComponent from './components/signUpComponent/signUpComponent';

export default function App() {
    return (
        <HashRouter>
            <Route exact path="/" component={EntryComponent} />
            <Route path="/home" component={HomeComponent} />
            <Route path="/activity" component={ActivityComponent} />
            <Route path="/new-user" component={SignUpComponent} />
        </HashRouter>
    );
}
