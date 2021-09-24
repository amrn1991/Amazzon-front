import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const Header = () => {
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };

  const {usersInfo} = useSelector(state => state.usersList)

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
        <Link to="/cart">Cart</Link>
        {usersInfo ? (
          <Link to="/profile">{usersInfo.name}</Link>
        ) : (
          <Link to="/signin">Sign In</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
