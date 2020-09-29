import React from 'react';
import { Icon, Avatar } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import classes from './headerMenuComponent.scss';
import {
    Link
  } from "react-router-dom";
  import { connect } from 'react-redux';
  import * as actionTypes from '../../store/action';

  class HeaderMenuComponent extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
        const loginData= JSON.parse(localStorage.getItem('user'));
        this.state={
            anchorEl:null,
            setAnchorEl:null,
            open: false,
            name:`${loginData.firstName} ${loginData.lastName} `
        }
        
    }

    handleClick = (event) => {
        this.state.anchorEl
        ? this.setState({ anchorEl: null })
        : this.setState({ anchorEl: event.currentTarget });
    };
  
    componentDidUpdate(prevProps) {
        console.log("prevProps",prevProps);
        console.log("curtP",this.props);
    } 
    handleClose = (name) => {
        this.setState({ anchorEl: null });
        localStorage.removeItem("user");
    };

    toggleMenu=()=>{
        this.props.onToggleMenu()
    }
    
    render(){
        return (
            <div className={classes.headerComponent}>
            <p class="material-icons" onClick={()=>this.toggleMenu()}>
                list
            </p>
            <div className={classes.tittleSection}>
                <Icon>event</Icon><h1 style={{'textTransform': 'capitalize'}}>{this.props.activateMenu}</h1>
                <Menu
                    id="header-component-menu"
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                    }}
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem  onClick={()=>this.handleClose('logout')}> <Link to="/" style={{color: 'black',textDecoration: 'none'}}>Logout</Link></MenuItem>
                </Menu>
            </div>
            <div className={classes.actionSection}  onClick={this.handleClick}>
                  <Avatar alt= {this.state.name} src="/static/images/avatar/1.jpg"  />
                  <span>{this.state.name}</span>
            </div>
            </div>
        )
    } 
}

const mapStateToProps = (state) => {
    return {
      sideMenu: state.sideMenu,
    };
};

const mapDispatchToProps = dispatch => {
return {
    onToggleMenu: () => dispatch({type: actionTypes.TOGGLE_MENU}),
}
};
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps)(HeaderMenuComponent)
  
