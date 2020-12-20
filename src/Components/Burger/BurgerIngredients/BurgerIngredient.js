import classes from './BurgerIngredient.module.css';
import React from 'react';
import PropTypes from 'prop-types'

class BurgerIngradient extends React.Component {
    render() {
        let ingradient = null;

        switch(this.props.type) {
            case ('bread-bottom'):
                ingradient = <div className={classes.BreadBottom}></div>;
                break;
            case ('bread-top'):
                ingradient = (
                <div className={classes.BreadTop}>
                    <div className={classes.Seeds1}></div>
                    <div className={classes.Seeds2}></div>
                </div>
                );
                break;
            case ('meat'):
                ingradient = <div className={classes.Meat}></div>;
                break;
            case ('cheese'):
                ingradient = <div className={classes.Cheese}></div>;
                break;
            case ('salad'):
                ingradient = <div className={classes.Salad}></div>;
                break;
            case ('bacon'):
                ingradient = <div className={classes.Bacon}></div>;
                break;
            default:
                ingradient = null;
        }
        return ingradient;
    }
}

BurgerIngradient.propType = {
    type: PropTypes.string.isRequired
}

export default BurgerIngradient;