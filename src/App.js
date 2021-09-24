import "./App.css";
import Header from './comps/Header';
import HomePage from "./Pages/HomePage";
import ProductPage from "./Pages/ProductPage";
import ProductsPage from "./Pages/ProductsPage";
import CartPage from "./Pages/CartPage";
import SigninPage from "./Pages/SigninPage";
import RegisterPage from './Pages/RegisterPage';
import ShippingPage from './Pages/ShippingPage';
import PaymentPage from './Pages/PaymentPage';
import { Switch, Route } from "react-router-dom";
import OrderPage from './Pages/OrderPage';

function App() {
  return (
    <div className="grid-container">
      <Header />
      <main className="main">
        <div className="content">
          <Switch>
            <Route exact path="/signin" component={SigninPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/products" component={ProductsPage} />
            <Route exact path="/products/:id" component={ProductPage} />
            <Route exact path="/cart/:id?" component={CartPage} />
            <Route exact path="/shipping" component={ShippingPage} />
            <Route exact path="/payment" component={PaymentPage} />
            <Route exact path="/placeorder" component={OrderPage} />
            <Route exact path="/" component={HomePage} />
          </Switch>
        </div>
      </main>
      <footer className="footer">All Rights Reserved &copy;</footer>
    </div>
  );
}

export default App;
