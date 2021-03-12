import React from "react";
import CheckoutSummary from "../../Components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Scroll from "react-scroll";

var scroll = Scroll.animateScroll;

class Checkout extends React.Component {
  purchaseContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
    scroll.scrollToBottom();
  };

  purchaseCanceleddHandler = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ings}
          continued={this.purchaseContinuedHandler}
          canceled={this.purchaseCanceleddHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients
  };
};

export default connect(mapStateToProps)(withRouter(Checkout));
