import React from "react";
import Button from "../../../Components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import Input from "../../../Components/UI/Input/Input";
import { connect } from "react-redux";
import withErrorHandler from "../../../Hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../Store/actions/index";
import Modal from "../../../Components/UI/Modal/Modal";

class ContactData extends React.Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter your name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Enter your email"
        },
        value: "",
        validation: {
          required: true,
          validateEmail: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter your street address"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      postalCode: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Enter your postal code"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
          maxLength: 6
        },
        valid: false,
        touched: false
      },
      quantity: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Enter the number of order"
        },
        value: "",
        validation: {
          required: true,
          minLength: 1
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          option: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: "fastest",
        validation: {},
        valid: true
      }
    },
    isFormValid: false
  };

  checkValidity = (value, rule) => {
    let isValid = true;

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (rule) {
      if (rule.required) isValid = value.trim() !== "" && isValid;

      if (rule.minLength) isValid = value.length >= rule.minLength && isValid;

      if (rule.maxLength) isValid = value.length <= rule.maxLength && isValid;

      if (rule.validateEmail) isValid = re.test(String(value).toLowerCase());
    }

    return isValid;
  };

  orderHandler = (event) => {
    event.preventDefault();

    const formData = {};

    for (let formIdentifier in this.state.orderForm) {
      formData[formIdentifier] = this.state.orderForm[formIdentifier].value;
    }

    const today = new Date();

    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    const time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId,
      orderTime: date + " " + time
    };

    this.props.onOrderHandler(order, this.props.history, this.props.token);
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };

    let updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };

    updatedFormElement.value = event.target.value;

    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );

    updatedFormElement.touched = true;

    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let ingCount = 0;

    for (let ing in this.props.ings) {
      ingCount += this.props.ings[ing];
    }

    let isFormValid = ingCount;
    for (let field in updatedOrderForm) {
      isFormValid = updatedOrderForm[field].valid && isFormValid;
    }

    this.setState({
      orderForm: updatedOrderForm,
      isFormValid
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        formElement: this.state.orderForm[key]
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((element) => {
          return (
            <Input
              key={element.id}
              type={element.formElement.elementType}
              config={element.formElement.elementConfig}
              value={element.formElement.value}
              invalid={!element.formElement.valid}
              validation={element.formElement.validation}
              touched={element.formElement.touched}
              changed={(event) => this.inputChangedHandler(event, element.id)}
            />
          );
        })}

        <Button btnType="Success" disabled={!this.state.isFormValid}>
          Order
        </Button>
      </form>
    );
    if (this.props.loading) {
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

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.idToken,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderHandler: (order, history, token) =>
      dispatch(actions.purchaseBurger(order, history, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
