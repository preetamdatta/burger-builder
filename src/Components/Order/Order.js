import React from "react";
import classes from "./Order.module.css";

const order = (props) => {
  return (
    <div className={classes.Order}>
      <p>Ingredients: </p>
      <ul>
        <li>Bacon : {props.ingerdients.bacon}</li>
        <li>Cheese : {props.ingerdients.cheese}</li>
        <li>Meat : {props.ingerdients.meat}</li>
        <li>Salad : {props.ingerdients.salad}</li>
      </ul>
      <p>
        Price: <strong>USD {props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
