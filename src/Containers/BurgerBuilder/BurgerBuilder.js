import React from 'react';
import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls'
import Modal from '../../Components/UI/Modal/Modal'
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary'
import classes from './BurgerBuilder.module.css'
import axios from '../../axios-orders'
import withErrorHandler from '../../Hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}

class BurgerBuilder extends React.Component {
    state = {
        ingredients : {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasing: false
    }
    addIngredientsHandler = (type) => {
        this.setState((oldState) => {
            const newIngredients = {
                ...oldState.ingredients,
                [type] : oldState.ingredients[type] + 1
            }

            const newPrice = oldState.totalPrice + INGREDIENT_PRICES[type]

            return {
                ingredients : newIngredients,
                totalPrice : newPrice
            }
        })
    }

    removeIngredientsHandler = (type) => {
        this.setState((oldState) => {
            if(oldState.ingredients[type] <= 0) return;

            const newIngredients = {
                ...oldState.ingredients,
                [type] :  oldState.ingredients[type] - 1 
            }

            const newPrice = oldState.totalPrice - INGREDIENT_PRICES[type]
        
            return {
                ingredients : newIngredients,
                totalPrice : newPrice
            }
            
        })
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        // alert('Continue with your order!')
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice
        }
        axios.post('/orders.json', order)
            .then(res => console.log('Response is ' + res))
            .catch(err => console.log('Error is ' + err))
            .finally(this.setState({purchasing : false}))
    }

    render() {
        return(
            <React.Fragment>
                <Modal show={this.state.purchasing} clicked={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        canceled={this.purchaseCancelHandler}
                        continued={this.purchaseContinueHandler}
                    />
                </Modal>
                <div className={classes.BurgerBuilder}>
                    <Burger ingredients={this.state.ingredients} />

                    <BuildControls 
                        add={this.addIngredientsHandler} 
                        remove={this.removeIngredientsHandler} 
                        ingredientsCount={this.state.ingredients}
                        price={this.state.totalPrice}
                        clicked={this.purchaseHandler}/>
                </div>

            </React.Fragment>
        )
    }
}

export default BurgerBuilder;
// export default withErrorHandler(BurgerBuilder, axios);