import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../redux/ordersReducer";
import CheckoutSteps from "../comps/CheckoutSteps";
import LoadingBox from "../comps/LaodingBox";
import AlertBox from "./../comps/AlertBox";

const OrderPage = ({ history }) => {
  const { cart, shipping, payment } = useSelector((state) => state.cartList);

  if (!shipping.address) {
    history.push("/shipping");
  } else if (!payment) {
    history.push("/payment");
  }

  const { loading, success, error, order } = useSelector(
    (state) => state.orderList
  );

  const itemsPrice = cart.reduce((a, c) => a + c.qty * c.price, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart,
        shipping,
        payment,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    );
  };

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
  }, [success, order, history]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

      <div className="order">
        <div className="order-info">
          <div>
            <h3>Shipping</h3>
            <div>
              <strong>Name: </strong>
              {shipping.fullName} <br />
              <strong>Address: </strong>
              {shipping.address},{shipping.city},{shipping.postalCode},
              {shipping.country}
            </div>
          </div>
          <div>
            <h3>Payment</h3>
            <div>{payment}</div>
          </div>
          <div>
            <ul className="order-list-container">
              <li>
                <h3>Shopping Cart</h3>
                <div className="price">price</div>
              </li>
              {cart.length === 0 ? (
                <AlertBox variant="info">Cart is empty</AlertBox>
              ) : (
                cart.map((item) => (
                  <li key={item.product}>
                    <div className="cart-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="cart-name">
                      <div>
                        <Link to={`/products/${item.product}`}>
                          {item.name}
                        </Link>
                      </div>
                      <div>Qty: {item.qty}</div>
                    </div>
                    <div className="cart-price">${item.price}</div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        <div className="order-actions">
          <ul>
            <li>
              <button
                onClick={placeOrderHandler}
                className="button primary full-width"
              >
                Place Order
              </button>
            </li>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items</div>
              <div>${itemsPrice}</div>
            </li>
            <li>
              <div>Shipping</div>
              <div>${shippingPrice}</div>
            </li>
            <li>
              <div>Tax</div>
              <div>${taxPrice}</div>
            </li>
            <li>
              <div>Order Total</div>
              <div>${totalPrice}</div>
            </li>
            <li>
              {loading && <LoadingBox />}
              {error && <AlertBox>{error}</AlertBox>}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
