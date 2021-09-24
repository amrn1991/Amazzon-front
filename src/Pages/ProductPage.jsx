import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../redux/productReducer";

const ProductPage = ({ match, history }) => {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetail
  );
  const { name, image, price, numReviews, description, rating, countInStock } =
    product;
  const [qty, setQty] = useState(1);

  const addToCart = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  useEffect(() => {
    dispatch(getSingleProduct(match.params.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      <div className="back-btn">
        <Link to="/">Back to products</Link>
      </div>
      <div className="details">
        <div className="details-image">
          <img src={image} alt={name} />
        </div>
        <div className="details-info">
          <ul>
            <li>
              <h4>{name}</h4>
            </li>
            <li>
              {rating} Stars ({numReviews} Reviews)
            </li>
            <li>
              <em>${price}</em>
            </li>
            <li>{description}</li>
          </ul>
        </div>
        <div className="details-action">
          <ul>
            <li>Price: ${price}</li>
            <li>Status: {countInStock>0 ? "in stock" : "unavailable"}</li>
            <li>
              Qty:{" "}
              <select value={qty} onChange={(e) => setQty(e.target.value)}>
                {[...Array(countInStock).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </select>
            </li>
            <li>
              {countInStock > 0 && (
                <button className="button primary" onClick={addToCart}>
                  Add to Cart
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
