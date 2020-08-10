import React from 'react';
import { Icon } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import './headerMenuComponent.scss';
import {
    Link
  } from "react-router-dom";
export default class HeaderMenuComponent extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
        this.state={
            anchorEl:null,
            setAnchorEl:null,
            open: false
        }
        
    }

    handleClick = (event) => {
        this.state.anchorEl
        ? this.setState({ anchorEl: null })
        : this.setState({ anchorEl: event.currentTarget });
    };
  
    handleClose = (name) => {
        this.setState({ anchorEl: null });
    };

    
    render(){
        return (
            <div className="header-component">
            <div className="tittle-section">
                <Icon>event</Icon><h1 style={{'textTransform': 'capitalize'}}>{this.props.activateMenu}</h1>
                <Menu
                    id="header-component-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem  onClick={()=>this.handleClose('logout')}> <Link to="/" style={{color: 'black',textDecoration: 'none'}}>Logout</Link></MenuItem>
                </Menu>
            </div>
            <div className="action-section">
                <Icon  style={{cursor:'pointer'}} onClick={this.handleClick}>more_vert</Icon>
            </div>
            </div>
        )
    } 
}