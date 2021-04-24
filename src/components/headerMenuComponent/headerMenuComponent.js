import React from 'react';
import { Icon, Avatar } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import classes from './headerMenuComponent.scss';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions  from './../../store/actions/index-action';


  class HeaderMenuComponent extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
        const loginData= JSON.parse(localStorage.getItem('user'));
        this.state={
            anchorEl:null,
            setAnchorEl:null,
            open: false,
            picture:loginData.picture,
            name:`${loginData.firstName} ${loginData.lastName} `
        }
        
    }

    handleClick = (event) => {
        this.state.anchorEl
        ? this.setState({ anchorEl: null })
        : this.setState({ anchorEl: event.currentTarget });
    };
  
  
    handleClose = (name) => {
        const {history } = this.props
        this.setState({ anchorEl: null });
        this.props.logout(history);

    };

    toggleMenu=()=>{
        this.props.onToggleMenu()
    }
    
    render(){
        return (
            <div className={classes.headerComponent}>
            <p className="material-icons" onClick={()=>this.toggleMenu()}>
                list
            </p>
            <div className={classes.tittleSection}>
                <Icon>event</Icon><h1 style={{'textTransform': 'capitalize'}}>{this.props.activateMenu}</h1>
                <Menu
                    id="header-component-menu"
                    anchorEl={this.state.anchorEl}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                    }}
                    open={Boolean(this.state.anchorEl)}
                >
                    <MenuItem  onClick={()=>this.handleClose('logout')}> Logout</MenuItem>
                </Menu>
            </div>
            <div className={classes.actionSection}  onClick={this.handleClick}>
                  <Avatar alt= {this.state.name} src={this.state.picture}  />
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
    onToggleMenu: () => dispatch(actions.toggleSideMenu()),
    logout:(history)=>dispatch(actions.logout(history))
}
};
  
  export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps)(HeaderMenuComponent))
  
