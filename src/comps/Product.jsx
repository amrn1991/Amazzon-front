import React from "react";
import { Link } from 'react-router-dom';
import Ratings from "./Ratings"


const Product = ({product})=> {
  return (
    <div className="product">
      <Link to={`/products/${product._id}`}>
        <img className="product-image" src={product.image} alt={product.name} />
      </Link>
      <div className="product-name">
        <Link to={`/products/${product._id}`}>{product.name}</Link>
      </div>
      <div className="product-brand">{product.brand}</div>
      <Ratings rating={product.rating} numReviews={product.numReviews} />
      <div className="product-price">${product.price}</div>
    </div>
  );
}

export default Product;