/* eslint-disable react/style-prop-object */
import React from 'react';
import './homeComponent.scss'
import  SideBarComponent  from '../sideBarComponent/sideBarComponent';
import { ProfileSectionComponent } from '../profileSectionComponent/profileSectionComponent';
import { ContentSectionComponent } from './../contentSectionComponent/contentSectionComponent';
class HomeComponent extends React.Component{
    
    constructor(){
        super();
        this.state={
            activateMenu:'today'
        }
        this.menuChanged=this.menuChanged.bind(this)
    }

    menuChanged(newMenu){
        this.setState({
            activateMenu:newMenu
        })
    }

    render(){
        let style={
            'display':'flex',
            'flexDirection': 'row'
        }
        return ( 
            <div style={style} >
            <nav>
              <ProfileSectionComponent />
              <SideBarComponent activateMenu={this.state.activateMenu} menuChangeHandler={this.menuChanged}  />
            </nav>
               <ContentSectionComponent activateMenu={this.state.activateMenu} />                
            </div>

        )
    }
}

export { HomeComponent }