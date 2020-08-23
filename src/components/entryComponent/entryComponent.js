import React from 'react';
import mainEntryBanner from './../assets/svg/entry-banner.svg';
import './entryComponent.scss'
import {NameSubmitComponent} from './../nameSubmitComponent/nameSubmitComponent.js'
import { Button } from '@material-ui/core'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

class EntryComponent extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(){
        super();
    }
    render(){
        return <div className="main-section">
               <div className="left-section">   
                <div className="logo">
                 <h1>#LOGO</h1>
                </div>
                  <NameSubmitComponent />
                  <div className="sign-up-button">
                <NavLink
                    to={{
                        pathname:'/new-user',
                        hash:"signup",
                        search:'?source=home-page'
                    }}
                >
                    <Button variant="contained" >
                        Sign Up - Its Free         
                    </Button>
                </NavLink> 
                </div>
               </div> 
               <div className="right-section">
                    <h1>Set your goal and just plan it</h1>
                    <img src={mainEntryBanner} alt="To do list" />
               </div>                
        </div>
    }
}

export {EntryComponent};
