import React, { useEffect } from "react";
import Product from "../comps/Product";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../redux/productsReducer";
import LoadingBox from "../comps/LaodingBox"
import AlertBox from "../comps/AlertBox"

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
