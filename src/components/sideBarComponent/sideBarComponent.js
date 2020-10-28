import React from "react";
import classes from "./sideBarComponent.scss";
import Icon from "@material-ui/core/Icon";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as action_index  from './../../store/actions/action_index';

function sideBarComponent(props) {
  function handleClick(name) {
    props.menuChangeHandler(name); // pass any argument to the callback
  }

  function toggleMenu(){
    props.onToggleMenu()
  }

  let listItem = MenuList.map((menu) => (
    <li onClick={() => handleClick(menu.route)} key={menu.id}>
      <NavLink
        to={{
          pathname: menu.route,
        }}
        className={
          props.location.pathname === menu.route ? classes.selected : ""
        }
        exact
      >
        <Icon>{menu.icon} </Icon> {menu.name}
      </NavLink>
    </li>
  ));

  return (
    <nav  className={`${classes.mobile} ${
      props.sideMenu.opened ? classes.open : classes.close
    } `}>
      <div
        className={classes.sideBar}
      > 
        <div className={classes.logo}>
          <h1>#LOGO</h1>
          <span class="material-icons" onClick={()=>toggleMenu()}>
          close
        </span>
        </div>
        <ul className={classes.mainMenu}>{listItem}</ul>
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => {
  return {
    sideMenu: state.sideMenu,
  };
};
const mapDispatchToProps = dispatch => {
  return {
      onToggleMenu: () => dispatch(action_index.toggleSideMenu()),
  }
  };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(sideBarComponent));

const MenuList = [
  { id: 1, name: "Home", route: "/home", icon: "home" },
  { id: 3, name: "Notes", route: "important", icon: "sticky_note_2" },
  { id: 4, name: "All", route: "all" },
];
