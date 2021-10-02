import "./App.css";
import Header from "./comps/Header";
import {
  HomePage,
  CartPage,
  ProductPage,
  ProductsPage,
  OrderPage,
  RegisterPage,
  PaymentPage,
  SigninPage,
  ShippingPage,
  OrderDetailsPage
} from "./pages";
import { Switch, Route } from "react-router-dom";

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
            <Route exact path="/order/:id" component={OrderDetailsPage} />
            <Route exact path="/" component={HomePage} />
          </Switch>
        </div>
      </main>
      <footer className="footer">All Rights Reserved &copy;</footer>
    </div>
  );
}

export default App;
