import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signoutHandle } from "../redux/usersReducer";
import { emptyCart } from "../redux/cartReducer";

const Header = () => {
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };

  const dispatch = useDispatch();
  const handleSignout = () => {
    dispatch(signoutHandle());
    dispatch(emptyCart());
  };

  const { usersInfo } = useSelector((state) => state.usersList);
  const { cart } = useSelector((state) => state.cartList);
  return (
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
        <Link to="/cart">
          Cart
          {cart.length > 0 ? (
            <span className="badge">{cart.length}</span>
          ) : null}
        </Link>
        {usersInfo ? (
          <div className="dropdown">
            <Link to="/">
              {usersInfo.name} <i>&#9660;</i>
            </Link>
            <div className="dropdown-content">
              <Link to="#signout" onClick={handleSignout}>
                Sign out
              </Link>
            </div>
          </div>
        ) : (
          <Link to="/signin">Sign In</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
