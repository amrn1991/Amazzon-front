import "./App.css";
import HomePage from "./Pages/HomePage";
import ProductPage from "./Pages/ProductPage";
import CartPage from "./Pages/CartPage";
import { Switch, Route, Link } from "react-router-dom";

function App() {
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };

  return (
    <div className="grid-container">
      <header className="header">
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="close-btn" onClick={closeMenu}>
            x
          </button>
          <ul>
            <li>
              <Link to="/products/pants">Pants</Link>
            </li>
            <li>
              <Link to="/products/shirts">Shirts</Link>
            </li>
          </ul>
        </aside>
        <div className="brand">
          <button onClick={openMenu}>&#8801;</button>
          <Link to="/">Amazzon</Link>
        </div>
        <div className="header-links">
          <Link to="/cart.html">Cart</Link>
          <Link to="/signin.html">Sign In</Link>
        </div>
      </header>
      <main className="main">
        <div className="content">
          <Switch>
            <Route exact path="/products/:id" component={ProductPage} />
            <Route exact path="/cart/:id?" component={CartPage} />
            <Route exact path="/" component={HomePage} />
          </Switch>
        </div>
      </main>
      <footer className="footer">All Rights Reserved &copy;</footer>
    </div>
  );
}

export default App;
