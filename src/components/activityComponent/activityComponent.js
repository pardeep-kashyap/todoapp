/* eslint-disable react/style-prop-object */
import React from 'react';
import classes from './activityComponent.scss';
import SideBarComponent from '../sideBarComponent/sideBarComponent';
import ActivityDashboardComponent from '../activityDashboardComponent/activityDashboardComponent';
import HeaderMenuComponent from './../headerMenuComponent/headerMenuComponent';
import { useState } from 'react';

export default function ActivityComponent() {
    let [activateMenu] = useState('today');

    const menuChanged = (newMenu) => {
        activateMenu = newMenu;
    };

    return (
        <div className={classes.activityComponent}>
            <SideBarComponent
                activateMenu={activateMenu}
                menuChangeHandler={() => menuChanged}
            />
            <div style={{ width: '100%' }}>
                <HeaderMenuComponent activateMenu={activateMenu} />
                <ActivityDashboardComponent activateMenu={activateMenu} />
            </div>
        </div>
    );
}
