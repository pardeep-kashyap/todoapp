/* eslint-disable react/style-prop-object */
import React from "react";
import classes from "./homeComponent.scss";
import SideBarComponent from "../sideBarComponent/sideBarComponent";
import { ContentSectionComponent } from "../contentSectionComponent/contentSectionComponent";
import { useState } from 'react';

export default function HomeComponent() {
  let [activateMenu] = useState("today");

  const menuChanged = (newMenu) => {
    activateMenu = newMenu
  };

  return (
    <div className={classes.homeComponent}>
      <SideBarComponent
        activateMenu={activateMenu}
        menuChangeHandler={() => menuChanged}
      />
      <ContentSectionComponent activateMenu={activateMenu} />
    </div>
  );
}