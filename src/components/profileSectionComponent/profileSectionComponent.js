/* eslint-disable react/style-prop-object */
import React from 'react';
import classes from './profileSectionComponent.scss';
import avatar from './../assets/images/avatar.png';

class ProfileSectionComponent extends React.Component{
       // eslint-disable-next-line no-useless-constructor
    constructor(){
        super();
        console.log(window.userInformation);
        this.state ={
            userInformation:window.userInformation?window.userInformation:{}
        }
    }

    render(){
        return (
                 <header className={classes.avatar}>
                    <img src={avatar} alt={this.state.userInformation.name}/>
                        <h2>{this.state.userInformation.name}</h2>
                </header>
        )
    }
}

export { ProfileSectionComponent }