import React from "react";
import ReactStars from "react-rating-stars-component";

const Rating = (props) => {
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  return (
    <ReactStars
      value={props.rating}
      count={5}
      onChange={ratingChanged}
      size={18}
      activeColor="#ffd700"
      halfIcon={<i className="fa fa-star-half-alt"></i>}
      fullIcon={<i className="fa fa-star"></i>}
    />
  );
};

export default Rating;
