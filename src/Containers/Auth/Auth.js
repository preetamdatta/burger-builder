import React from "react";
import { connect } from "react-redux";
import Input from "../../Components/UI/Input/Input";
import Button from "../../Components/UI/Button/Button";
import classes from "./Auth.module.css";
import * as actions from "../../Store/actions/index";
import Spinner from "../../Components/UI/Spinner/Spinner";
import { checkValidity } from "../../Shared/checkValidity";

class Auth extends React.Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email address"
        },
        value: "",
        validation: {
          required: true,
          validateEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignup: false
  };

  inputChangedHandler = (event, controlName) => {
    const updatedControl = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      }
    };
    this.setState({ controls: updatedControl });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
    // if (!this.props.error) this.props.history.replace("/");
  };

  switchAuthMode = () => {
    this.setState(state => {
      return {
        isSignup: !state.isSignup
      };
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        formElement: this.state.controls[key]
      });
    }

    let form = (
      <form onSubmit={this.submitHandler}>
        {formElementsArray.map(element => {
          return (
            <Input
              key={element.id}
              type={element.formElement.elementType}
              config={element.formElement.elementConfig}
              value={element.formElement.value}
              invalid={!element.formElement.valid}
              validation={element.formElement.validation}
              touched={element.formElement.touched}
              changed={event => this.inputChangedHandler(event, element.id)}
            />
          );
        })}
        <Button btnType="Success">Submit</Button>
      </form>
    );

    if (this.props.loading) form = <Spinner />;

    let error = null;

    if (this.props.error)
      error = (
        <p style={{ color: "Red" }}>
          {this.props.error.message.replace("_", " ")}
        </p>
      );

    return (
      <div className={classes.Auth}>
        <h2>{this.state.isSignup ? "Signup" : "Signin"}</h2>
        {error}
        {form}
        <Button clicked={this.switchAuthMode} btnType="Danger">
          Switch to {this.state.isSignup ? "signin" : "signup"}
        </Button>
      </div>
    );
  }
}

const mapPropsToState = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup, history) =>
      dispatch(actions.auth(email, password, isSignup, history))
  };
};

export default connect(
  mapPropsToState,
  mapDispatchToProps
)(Auth);
