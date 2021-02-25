import React from "react";
import { connect } from "react-redux";
import * as actions from "./Store/actions/index";
import Layout from "./Containers/Layout/Layout";
import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder";
import {
  BrowserRouter,
  Route,
  withRouter,
  Redirect,
  Switch
} from "react-router-dom";
import Orders from "./Containers/Orders/Orders";
import Checkout from "./Containers/Checkout/Checkout";
import Auth from "./Containers/Auth/Auth";
import Logout from "./Containers/Auth/Logout/Logout";
// import ContactData from "./Containers/Checkout/ContactData/ContactData";

class App extends React.Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.idToken != null
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckStatus())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
