import React from "react";
import Order from "../../Components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../Hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../Components/UI/Spinner/Spinner";
import * as actions from "../../Store/actions/index";
import { connect } from "react-redux";

class Orders extends React.Component {
  componentDidMount() {
    this.props.onFetchOrder(this.props.token, this.props.userId);
  }
  render() {
    let orders;
    if (this.props.orders.length === 0 && !this.props.loading)
      orders = (
        <p style={{ textAlign: "center", fontWeight: "bold" }}>
          No order in history
        </p>
      );
    else if (this.props.loading) orders = <Spinner />;
    else {
      orders = (
        <div>
          {this.props.orders.map((order) => (
            <Order
              key={order.id}
              ingerdients={order.ingredients}
              price={+order.price}
              quantity={order.orderData.quantity}
              orderTime={order.orderTime}
            />
          ))}
        </div>
      );
    }

    return <div>{orders}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.idToken,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrder: (token, userId) => dispatch(actions.fetchOrder(token, userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
