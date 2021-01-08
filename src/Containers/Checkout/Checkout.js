import React from "react";
import CheckoutSummary from "../../Components/Order/CheckoutSummary/CheckoutSummary";
import queryString from "query-string";
import ContactData from "./ContactData/ContactData";
import { Route } from "react-router-dom";

class Checkout extends React.Component {
  state = {
    ingredients: {}
  };
  purchaseContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  purchaseCanceleddHandler = () => {
    this.props.history.goBack();
  };

  componentDidMount() {
    const params = queryString.parse(this.props.location.search, {
      parseNumbers: true
    });

    this.setState({
      ingredients: {
        salad: params.salad,
        bacon: params.bacon,
        cheese: params.cheese,
        meat: params.meat
      },
      totalPrice: params.price
    });
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          continued={this.purchaseContinuedHandler}
          canceled={this.purchaseCanceleddHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
