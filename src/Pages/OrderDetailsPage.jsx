import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { orderDetails } from "./../redux/orderDetailsReducer";
import { PayPalButton } from "react-paypal-button-v2";
import LoadingBox from "../comps/LaodingBox";
import AlertBox from "./../comps/AlertBox";
import axios from "axios";
import { orderPayReset, payOrder } from "./../redux/orderPayReducer";

const OrderDetailsPage = ({ match }) => {
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();
  const {
    order: orderInfo,
    loading,
    error,
  } = useSelector((state) => state.orderDetails);
  const { shipping, orderItems, payment } = orderInfo;
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = useSelector((state) => state.orderPay);
  const orderId = match.params.id;

  useEffect(() => {
    const addPaypalScript = async () => {
      const { data } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!orderInfo || successPay || orderInfo._id !== orderId) {
      dispatch(orderPayReset());
      dispatch(orderDetails(orderId));
    } else {
      if (!orderInfo.isPaid) {
        if (!window.paypal) {
          addPaypalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, orderId, orderInfo, sdkReady]);

  const paymentSuccessHandler = (paymentResult) => {
    dispatch(payOrder(orderInfo, paymentResult));
  };

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <AlertBox>{error}</AlertBox>
  ) : (
    <div className="order-details">
      <h2>Order {orderInfo._id}</h2>
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
            {orderInfo.isDelivered ? (
              <AlertBox variant="success">
                Delivered at {orderInfo.deliveredAt}
              </AlertBox>
            ) : (
              <AlertBox>Not Delivered</AlertBox>
            )}
          </div>
          <div>
            <h3>Payment</h3>
            <div>{payment}</div>
            {orderInfo.isPaid ? (
              <AlertBox variant="success">Paid at {orderInfo.paidAt}</AlertBox>
            ) : (
              <AlertBox>Not Paid</AlertBox>
            )}
          </div>
          <div>
            <ul className="order-list-container">
              <li>
                <h3>Shopping Cart</h3>
                <div className="price">price</div>
              </li>
              {orderItems.length === 0 ? (
                <AlertBox variant="success">cart is empty</AlertBox>
              ) : (
                orderItems.map((item) => (
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
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items</div>
              <div>${orderInfo.itemsPrice}</div>
            </li>
            <li>
              <div>Shipping</div>
              <div>${orderInfo.shippingPrice}</div>
            </li>
            <li>
              <div>Tax</div>
              <div>${orderInfo.taxPrice}</div>
            </li>
            <li>
              <div>Order Total</div>
              <div>${orderInfo.totalPrice}</div>
            </li>
            {!orderInfo.isPaid && (
              <li>
                {!sdkReady ? (
                  <LoadingBox />
                ) : (
                  <div>
                    {loadingPay && <LoadingBox />}
                    {errorPay && <AlertBox>{errorPay}</AlertBox>}
                    <PayPalButton
                      amount={orderInfo.totalPrice}
                      onSuccess={paymentSuccessHandler}
                    ></PayPalButton>
                  </div>
                )}
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
