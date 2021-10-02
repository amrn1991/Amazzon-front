import React from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";

const Ratings = ({ rating, numReviews }) => {
  return (
    <div className="product-rating">
      <span>
        {rating >= 1 ? <FaStar /> : rating >= 0.5 ? <FaStarHalf /> : ""}
      </span>
      <span>
        {rating >= 2 ? <FaStar /> : rating >= 1.5 ? <FaStarHalf /> : ""}
      </span>
      <span>
        {rating >= 3 ? <FaStar /> : rating >= 2.5 ? <FaStarHalf /> : ""}
      </span>
      <span>
        {rating >= 4 ? <FaStar /> : rating >= 3.5 ? <FaStarHalf /> : ""}
      </span>
      <span>
        {rating >= 5 ? <FaStar /> : rating >= 4.5 ? <FaStarHalf /> : ""}
      </span>
      <span>{`${numReviews} reviews`}</span>
    </div>
  );
};

export default Ratings;
