import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../comps/LaodingBox";
import AlertBox from "./../comps/AlertBox";
import { orderDetails } from "./../redux/orderDetailsReducer";

const OrderDetailsPage = ({ match }) => {
  const dispatch = useDispatch();
  const {
    order: orderInfo,
    loading,
    error,
  } = useSelector((state) => state.orderDetails);
  const { shipping, orderItems, payment } = orderInfo;
  const orderId = match.params.id;

  useEffect(() => {
    dispatch(orderDetails(orderId));
  }, [dispatch, orderId]);

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <AlertBox>{error}</AlertBox>
  ) : (
    <div>
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
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
