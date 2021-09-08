import React from "react";
import data from "./../data";

const ProductPage = ({ match }) => {
  const product = data.products.find((pro) => pro._id === match.params.id);
  return (
    <div>
      <h3>{product.name}</h3>
    </div>
  );
};

export default ProductPage;
