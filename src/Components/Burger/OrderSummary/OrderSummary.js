import React from 'react'
import Button from "../../UI/Button/Button";

const orderSummary = props => {
    const ingredientsList = Object.keys(props.ingredients).map(igKey =>  <li key={igKey}>
            <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
        </li>)
    return (
        <React.Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsList}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <Button btnType='Success' clicked={props.continued}>Continue</Button>
            <Button btnType='Danger' clicked={props.canceled}>Cancel</Button>
        </React.Fragment>
    )
}

export default orderSummary