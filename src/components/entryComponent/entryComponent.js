import React from 'react';
import mainEntryBanner from './../assets/svg/entry-banner.svg';
import './entryComponent.scss'
import {NameSubmitComponent} from './../nameSubmitComponent/nameSubmitComponent.js'

class EntryComponent extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(){
        super();
    }
    render(){
        return <div className="main-section">
               <div className="left-section">
                  <NameSubmitComponent />
               </div> 
               <div className="right-section">
                    <img src={mainEntryBanner} alt="To do list" />
               </div>                
        </div>
    }
}

export {EntryComponent};
