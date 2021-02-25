import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData
  };
};

export const purchaseBurgerFailed = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

export const purchaseBurger = (orderData, history, token) => {
  return (dispatch) => {
    axios
      .post(`/orders.json?auth=${token}`, orderData)
      .then((res) => {
        dispatch(purchaseBurgerSuccess(res.data, orderData));
        history.push("/");
      })
      .catch((error) => dispatch(purchaseBurgerFailed(error)));
  };
};

export const fetchOrderSuccess = (order) => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    order
  };
};

export const fetchOrderFailed = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error
  };
};

export const fetchOrderStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

export const fetchOrder = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchOrderStart());
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    const fetchedOrders = [];
    axios
      .get(`/orders.json${queryParams}`)
      .then((res) => {
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }
        dispatch(fetchOrderSuccess(fetchedOrders));
      })
      .catch((err) => {
        dispatch(fetchOrderFailed(err));
      });
  };
};
