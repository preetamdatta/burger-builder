import axios from "axios";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    userId
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiryDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = (expiryTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expiryTime * 1000);
  };
};

export const auth = (email, password, isSignup, history) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAjxt5F-w_CIBlbsuCEgQZNu69ToknGHBc";
    if (!isSignup)
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAjxt5F-w_CIBlbsuCEgQZNu69ToknGHBc";
    axios
      .post(url, authData)
      .then((response) => {
        console.log(response);
        const expiryDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expiryDate", expiryDate);
        localStorage.setItem("userId", response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
        history.replace("/");
      })
      .catch((error) => {
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const authCheckStatus = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expiryDate = new Date(localStorage.getItem("expiryDate"));
      if (expiryDate <= new Date()) {
        dispatch(logout);
      } else {
        const user = localStorage.getItem("userId");
        dispatch(authSuccess(token, user));
        dispatch(
          checkAuthTimeout((expiryDate.getTime() - new Date().getTime()) / 1000)
        );
      }
    }
  };
};
