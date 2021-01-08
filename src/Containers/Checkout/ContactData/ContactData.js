import React from "react";
import Button from "../../../Components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../Components/UI/Spinner/Spinner";

class ContactData extends React.Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };

  orderHandler = (event) => {
    event.preventDefault();
    console.log(this.props);
    this.setState({ loading: true });

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice
    };
    axios
      .post("/orders.json", order)
      .then((res) => {
        this.setState({ loading: false });
        console.log("submitted", res);
        this.props.history.push("/");
      })
      .catch(this.setState({ loading: false }));
    // console.log(this.state.loading);
  };
  render() {
    let form = (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Enter your name"
        ></input>
        <input
          className={classes.Input}
          type="email"
          name="email"
          placeholder="Enter your email"
        ></input>
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Enter your street address"
        ></input>
        <input
          className={classes.Input}
          type="text"
          name="postal"
          placeholder="Enter your postal code"
        ></input>
        <Button btnType="Success" clicked={this.orderHandler}>
          Order
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
