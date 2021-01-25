import React from "react";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";
import classes from "./BurgerBuilder.module.css";
import axios from "../../axios-orders";
import withErrorHandler from "../../Hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../Components/UI/Spinner/Spinner";

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3
};

class BurgerBuilder extends React.Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasing: false,
    loading: false
  };
  addIngredientsHandler = (type) => {
    this.setState((oldState) => {
      const newIngredients = {
        ...oldState.ingredients,
        [type]: oldState.ingredients[type] + 1
      };

      const newPrice = oldState.totalPrice + INGREDIENT_PRICES[type];

      return {
        ingredients: newIngredients,
        totalPrice: newPrice
      };
    });
  };

  removeIngredientsHandler = (type) => {
    this.setState((oldState) => {
      if (oldState.ingredients[type] <= 0) return;

      const newIngredients = {
        ...oldState.ingredients,
        [type]: oldState.ingredients[type] - 1
      };

      const newPrice = oldState.totalPrice - INGREDIENT_PRICES[type];

      return {
        ingredients: newIngredients,
        totalPrice: newPrice
      };
    });
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // alert("Continue with your order!");

    this.props.history.push({
      pathname: "/checkout",
      search: `?salad=${this.state.ingredients.salad}&bacon=${this.state.ingredients.bacon}&cheese=${this.state.ingredients.cheese}&meat=${this.state.ingredients.meat}&price=${this.state.totalPrice}`
    });
  };

  render() {
    let orderSummary = (
      <OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
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
          <Burger ingredients={this.state.ingredients} />

          <BuildControls
            add={this.addIngredientsHandler}
            remove={this.removeIngredientsHandler}
            ingredientsCount={this.state.ingredients}
            price={this.state.totalPrice}
            clicked={this.purchaseHandler}
          />
        </div>
      </React.Fragment>
    );
  }
}

// export default BurgerBuilder;
export default withErrorHandler(BurgerBuilder, axios);
