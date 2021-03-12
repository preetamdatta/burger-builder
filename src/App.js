import React from "react";
import { connect } from "react-redux";
import * as actions from "./Store/actions/index";
import Layout from "./Containers/Layout/Layout";
import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder";
import { Route, withRouter, Redirect, Switch } from "react-router-dom";
// import Orders from "./Containers/Orders/Orders";
// import Checkout from "./Containers/Checkout/Checkout";
// import Auth from "./Containers/Auth/Auth";
import Logout from "./Containers/Auth/Logout/Logout";
import Spinner from "./Components/UI/Spinner/Spinner";

const Orders = React.lazy(() => import("./Containers/Orders/Orders"));
const Checkout = React.lazy(() => import("./Containers/Checkout/Checkout"));
const Auth = React.lazy(() => import("./Containers/Auth/Auth"));

class App extends React.Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = (
      <Switch>
        <Route
          path="/auth"
          render={() => (
            <React.Suspense fallback={<Spinner />}>
              <Auth />
            </React.Suspense>
          )}
        />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route
            path="/checkout"
            render={() => (
              <React.Suspense fallback={<Spinner />}>
                <Checkout />
              </React.Suspense>
            )}
          />

          <Route
            path="/orders"
            render={() => (
              <React.Suspense fallback={<Spinner />}>
                <Orders />
              </React.Suspense>
            )}
          />

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

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.idToken != null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckStatus())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
