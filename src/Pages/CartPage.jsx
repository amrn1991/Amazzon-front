import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addCartItem, itemRemoved } from "../redux/cartReducer";

const CartPage = ({ match, location, history }) => {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cartList);

  useEffect(() => {
    if (productId) {
      dispatch(addCartItem(productId, qty));
    }
  }, []);

  const removeFromCart = (productId) => {
    dispatch(itemRemoved(productId));
  };

  const handleCheckout = () => {
    history.push("/signin?redirect=shipping");
  };

  return (
    <div className="cart">
      <div className="cart-list">
        <ul className="cart-list-container">
          <li>
            <h3>Shopping Cart</h3>
            <div className="price">price</div>
          </li>
          {cart.length === 0 ? (
            <div>Cart is empty</div>
          ) : (
            cart.map((item) => (
              <li key={item.product}>
                <div className="cart-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-name">
                  <div>
                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>
                    Qty:{" "}
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addCartItem(item.product, e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((num) => (
                        <option key={num + 1} value={num + 1}>
                          {num + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => removeFromCart(item.product)}
                      className="button"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="cart-price">${item.price}</div>
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="cart-actions">
        <h3>
          Subtotal ({cart.reduce((a, c) => Number(a + c.qty), 0)} items) : ${" "}
          {cart.reduce((a, c) => a + c.price * c.qty, 0)}
        </h3>
        <button
          className="button primary full-width"
          disabled={cart.length === 0}
          onClick={() => handleCheckout()}
        >
          Proceed to checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
