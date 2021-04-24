import React from 'react';
import mainEntryBanner from './../../assets/svg/entry-banner.svg';
import classes from './entryComponent.scss';
import AuthComponent from './../authComponent/AuthComponent';
import { Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

export default function EntryComponent() {
    return (
        <div className={classes.mainSection}>
            <div className={classes.leftSection}>
                <div className={classes.logo}>
                    <h1>#LOGO</h1>
                </div>
                <AuthComponent />
                <div className={classes.signUpButton}>
                    <NavLink
                        to={{
                            pathname: '/new-user',
                            hash: 'signup',
                            search: '?source=home-page',
                        }}
                    >
                        <Button variant="contained">Sign Up - Its Free</Button>
                    </NavLink>
                </div>
            </div>
            <div className={classes.rightSection}>
                <p>Set your goal and just plan it</p>
                <img src={mainEntryBanner} alt="To do list" />
            </div>
        </div>
    );
}
