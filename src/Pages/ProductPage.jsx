import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../redux/productReducer";

const ProductPage = ({ match }) => {
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.productDetail);
  const { product, loading, error } = productDetail;
  useEffect(() => {
    dispatch(getSingleProduct(match.params.id));
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
          <img src={product.image} alt={product.name} />
        </div>
        <div className="details-info">
          <ul>
            <li>
              <h4>{product.name}</h4>
            </li>
            <li>
              {product.rating} Stars ({product.numReviews} Reviews)
            </li>
            <li>
              <em>${product.price}</em>
            </li>
            <li>{product.description}</li>
          </ul>
        </div>
        <div className="details-action">
          <ul>
            <li>Price: ${product.price}</li>
            <li>Status: {product.status}</li>
            <li>
              Qty:{" "}
              <select>
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>
                <option value="">4</option>
              </select>
            </li>
            <li>
              <button className="button primary">Add to Cart</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
