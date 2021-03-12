import React from "react";
import classes from "./NavigationItem.module.css";
import { NavLink } from "react-router-dom";

const navigationItem = props => (
  <li className={classes.NavigationItem} onClick={props.close}>
    <NavLink
      activeClassName={classes.active}
      to={props.link}
      exact={props.exact}
    >
      {props.children}
    </NavLink>
  </li>
);

export default navigationItem;
