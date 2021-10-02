import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../redux/productReducer";
import Ratings from "../comps/Ratings";
import AlertBox from "../comps/AlertBox";
import LoadingBox from "../comps/LaodingBox";

const ProductPage = ({ match, history }) => {
  const { product, loading, error } = useSelector(
    (state) => state.productDetail
  );
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const { name, image, price, numReviews, description, rating, countInStock } =
    product;

  const addToCart = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  useEffect(() => {
    dispatch(getSingleProduct(match.params.id));
  }, [dispatch, match.params.id]);

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <AlertBox>{error}</AlertBox>
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
              <Ratings rating={rating} numReviews={numReviews} />
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
            <li>Status: {countInStock > 0 ? "in stock" : "unavailable"}</li>
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
