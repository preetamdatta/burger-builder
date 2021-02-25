import React from "react";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";
import classes from "./BurgerBuilder.module.css";
import axios from "../../axios-orders";
import withErrorHandler from "../../Hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../Components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import * as actionTypes from "../../Store/actions";

class BurgerBuilder extends React.Component {
  state = {
    totalPrice: 4,
    purchasing: false,
    loading: false
  };

  purchaseHandler = () => {
    if (this.props.isAuthenticated) this.setState({ purchasing: true });
    else this.props.history.push("/auth");
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // alert("Continue with your order!");

    this.props.history.push("/checkout");
  };

  render() {
    let orderSummary = (
      <OrderSummary
        ingredients={this.props.ing}
        price={this.props.price}
        canceled={this.purchaseCancelHandler}
        continued={this.purchaseContinueHandler}
      />
    );
    if (this.state.loading) orderSummary = <Spinner />;
    return (
      <React.Fragment>
        <Modal
          show={this.state.purchasing}
          clicked={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        <div className={classes.BurgerBuilder}>
          <Burger ingredients={this.props.ing} />

          <BuildControls
            add={this.props.onIngredientsAdded}
            remove={this.props.onIngredientsRemoved}
            ingredientsCount={this.props.ing}
            isAuth={this.props.isAuthenticated}
            price={this.props.price}
            clicked={this.purchaseHandler}
          />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ing: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    isAuthenticated: state.auth.idToken != null
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientsAdded: (ingName) =>
      dispatch(actionTypes.addIngredient(ingName)),
    onIngredientsRemoved: (ingName) =>
      dispatch(actionTypes.removeIngredient(ingName))
  };
};

// export default BurgerBuilder;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
