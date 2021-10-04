import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../redux/productsReducer";
import Product from "../comps/Product";
import LoadingBox from "../comps/LaodingBox";
import AlertBox from "../comps/AlertBox";

const HomePage = () => {
  const { products, loading, error } = useSelector(
    (state) => state.productsList
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <AlertBox>{error}</AlertBox>
  ) : (
    <div>
      <ul className="products">
        {products.map((product) => (
          <li key={product._id}>
            <Product product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
