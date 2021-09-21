import "./App.css";
import HomePage from "./Pages/HomePage";
import ProductPage from "./Pages/ProductPage";
import CartPage from "./Pages/CartPage";
import SigninPage from "./Pages/SigninPage";
import RegisterPage from './Pages/RegisterPage';
import { Switch, Route, Link } from "react-router-dom";
import { useSelector } from 'react-redux';

function App() {
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };

  const {usersInfo} = useSelector(state => state.usersList)

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
          <Link to="/cart">Cart</Link>
          {
            usersInfo 
            ? <Link to="/profile">{usersInfo.name}</Link>
            : <Link to="/signin">Sign In</Link>
          }
        </div>
      </header>
      <main className="main">
        <div className="content">
          <Switch>
            <Route exact path="/signin" component={SigninPage} />
            <Route exact path="/register" component={RegisterPage} />
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
