import React from 'react';
import './App.scss';
import { EntryComponent } from './components/entryComponent/entryComponent.js';
import { Route, BrowserRouter as Router,HashRouter } from 'react-router-dom';
import { HomeComponent } from "./components/homeComponent/homeComponent.js";
import SignUpComponent from './components/signUpComponent/signUpComponent';

export default class App extends React.Component{
    render (){
        return (
            <HashRouter>
                <Route exact path="/" component={EntryComponent} />
                <Route path="/home" component={HomeComponent} />
                <Route path="/new-user" component={SignUpComponent} />
            </HashRouter>)
    }
};
