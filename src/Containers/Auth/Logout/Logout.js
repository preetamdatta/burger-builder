import React from "react";
import * as actions from "../../../Store/actions/index";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Logout extends React.Component {
  componentDidMount() {
    this.props.onLogout();
  }

  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout())
  };
};

export default connect(null, mapDispatchToProps)(Logout);