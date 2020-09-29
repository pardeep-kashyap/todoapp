/* eslint-disable react/style-prop-object */
import React from 'react';
import './homeComponent.scss'
import  SideBarComponent  from '../sideBarComponent/sideBarComponent';
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
            'flexDirection': 'row',
            'height':'100%'
        }
        return ( 
            <div style={style}>
              <SideBarComponent activateMenu={this.state.activateMenu} menuChangeHandler={this.menuChanged}  />
               <ContentSectionComponent activateMenu={this.state.activateMenu} />                
            </div>

        )
    }
}

export { HomeComponent }