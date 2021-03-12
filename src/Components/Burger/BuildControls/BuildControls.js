import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { Label: "Salad", type: "salad" },
  { Label: "Bacon", type: "bacon" },
  { Label: "Meat", type: "meat" },
  { Label: "Cheese", type: "cheese" }
];

const buildControls = (props) => {
  let totalIngredient = 0;

  for (const ingredient in props.ingredientsCount)
    totalIngredient += props.ingredientsCount[ingredient];

  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>${props.price.toFixed(2)}</strong>
      </p>

      {controls.map((ctrl) => (
        <BuildControl
          key={ctrl.Label}
          label={ctrl.Label}
          add={props.add.bind(this, ctrl.type)}
          remove={props.remove.bind(this, ctrl.type)}
          disabled={props.ingredientsCount[ctrl.type] === 0}
        />
      ))}

      <button
        className={classes.OrderButton}
        disabled={!totalIngredient}
        onClick={props.clicked}
      >
        {props.isAuth ? "Order Now" : "Signin to order"}
      </button>
    </div>
  );
};

export default buildControls;
