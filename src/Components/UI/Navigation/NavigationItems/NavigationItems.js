import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";

const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" close={props.close} exact>
      Burger Builder
    </NavigationItem>
    {props.isAuthenticated ? (
      <NavigationItem link="/orders" close={props.close}>
        Order History
      </NavigationItem>
    ) : null}
    {props.isAuthenticated ? (
      <NavigationItem link="/logout" close={props.close}>
        Logout
      </NavigationItem>
    ) : (
      <NavigationItem link="/auth" close={props.close}>
        Login
      </NavigationItem>
    )}
  </ul>
);

export default navigationItems;
