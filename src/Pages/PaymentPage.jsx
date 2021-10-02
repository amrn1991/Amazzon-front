import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePayment } from "../redux/cartReducer";
import CheckoutSteps from "../comps/CheckoutSteps";

const PaymentPage = ({ history }) => {
  const {shipping} = useSelector(state => state.cartList)
  if(!shipping.address){
    history.push('/shipping')
  }
  const [paymentMethod, setPaymentMethod] = useState("stripe");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePayment(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <ul className="form-container">
            <li>
              <h2>Payment</h2>
            </li>
            <li>
              <div>
                <input
                  type="radio"
                  id="paypal"
                  name="paymentMethod"
                  value="paypal"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="paypal">Paypal</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="stripe"
                  name="paymentMethod"
                  value="stripe"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="stripe">Stripe</label>
              </div>
            </li>

            <li>
              <button type="submit" className="button primary">
                Continue
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
