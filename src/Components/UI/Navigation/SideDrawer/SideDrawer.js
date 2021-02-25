import React from "react";
import Logo from "../../../Logo/logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../Backdrop/Backdrop";
import classes from "./SideDrawer.module.css";

const sideDrawer = (props) => {
  let cssClasses = classes.SideDrawer;

  if (props.show) {
    cssClasses += " " + classes.Open;
  } else {
    cssClasses += " " + classes.Close;
  }
  return (
    <React.Fragment>
      <Backdrop show={props.show} clicked={props.close}></Backdrop>
      <div className={cssClasses}>
        <Logo height="11%" />
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </React.Fragment>
  );
};

export default sideDrawer;
