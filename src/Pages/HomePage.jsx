import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "./../redux/productsReducer";

const HomePage = () => {
  const productsList = useSelector((state) => state.productsList);
  const { products, loading, error } = productsList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      <ul className="products">
        {products.map((product) => (
          <li key={product._id}>
            <div className="product">
              <Link to={`/products/${product._id}`}>
                <img
                  className="product-image"
                  src={product.image}
                  alt={product.name}
                />
              </Link>
              <div className="product-name">
                <Link to={`/products/${product._id}`}>{product.name}</Link>
              </div>
              <div className="product-brand">{product.brand}</div>
              <div className="product-price">${product.price}</div>
              <div className="product-rating">
                stars ({product.numReviews} Reviews)
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
