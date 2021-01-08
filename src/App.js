import React from "react";
import Layout from "./Containers/Layout/Layout";
import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder";
import { BrowserRouter, Route } from "react-router-dom";
import Orders from "./Containers/Orders/Orders";
import Checkout from "./Containers/Checkout/Checkout";
// import ContactData from "./Containers/Checkout/ContactData/ContactData";

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Layout>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
