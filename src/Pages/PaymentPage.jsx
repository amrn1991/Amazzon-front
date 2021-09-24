import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { savePayment } from "../redux/cartReducer";
import CheckoutSteps from "./../comps/CheckoutSteps";

const PaymentPage = ({ history }) => {
  const [paymentMethod, setPaymentMethod] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePayment({ paymentMethod }));
    history.push("placeorder");
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
                  id="paymentMethod"
                  name="paymentMethod"
                  value="paypal"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="paymentMethod">Paypal</label>
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
