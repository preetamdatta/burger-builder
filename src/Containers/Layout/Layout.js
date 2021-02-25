import React from "react";
import { connect } from "react-redux";
import classes from "./Layout.module.css";
import Toolbar from "../../Components/UI/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../Components/UI/Navigation/SideDrawer/SideDrawer";

class Layout extends React.Component {
  state = {
    sideDrawerOpen: false
  };
  sideDrawerCloseHandler = () => {
    this.setState({
      sideDrawerOpen: false
    });
  };

  sideDrawerOpeneHandler = () => {
    this.setState({
      sideDrawerOpen: true
    });
  };
  render() {
    return (
      <React.Fragment>
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          close={this.sideDrawerCloseHandler}
          show={this.state.sideDrawerOpen}
        />
        <Toolbar
          isAuth={this.props.isAuthenticated}
          menuClicked={this.sideDrawerOpeneHandler}
        />
        <main className={classes.Container}>{this.props.children}</main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.idToken != null
  };
};

export default connect(mapStateToProps)(Layout);
