import React from "react";
import Order from "../../Components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../Hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../Components/UI/Spinner/Spinner";

class Orders extends React.Component {
  state = {
    orders: [],
    loading: true
  };
  componentDidMount() {
    const fetchedOrders = [];
    axios
      .get("/orders.json")
      .then((res) => {
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }
        this.setState({
          loading: false,
          orders: fetchedOrders
        });
      })
      .catch((err) => {
        this.setState({
          loading: false
        });
      });
  }
  render() {
    let orders = <Spinner />;
    if (!this.state.loading) {
      orders = (
        <div>
          {this.state.orders.map((order) => (
            <Order
              key={order.id}
              ingerdients={order.ingredients}
              price={+order.price}
            />
          ))}
        </div>
      );
    }
    return <div>{orders} </div>;
  }
}

export default withErrorHandler(Orders, axios);
