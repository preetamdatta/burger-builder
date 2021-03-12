import React from 'react';
import classes from './Burger.module.css';
import Ingredient from './BurgerIngredients/BurgerIngredient';

const burger = (props) => {
    let transformedIngredients = [];
    for(const ingredient in props.ingredients)
        for(let i = 0; i < props.ingredients[ingredient]; i++)
            transformedIngredients.push(<Ingredient key={ingredient + i} type={ingredient}/>);

    if(transformedIngredients.length === 0)
        transformedIngredients = <p>Please start adding ingredients!</p>

    return (
        <div className={classes.Burger}>
            <Ingredient type="bread-top"/>
            {transformedIngredients}
            <Ingredient type="bread-bottom"/>
            
        </div>
    )
}

export default burger;