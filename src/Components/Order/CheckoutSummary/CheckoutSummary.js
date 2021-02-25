import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.module.css";

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Hope this tests well!</h1>
      <div style={{ width: "100%", margin: "auto", height: "65vh" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.canceled}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.continued}>
        Continue
      </Button>
    </div>
  );
};

export default checkoutSummary;
