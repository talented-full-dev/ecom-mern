import React from "react";
import ReactStars from "react-rating-stars-component";

export const showAverage = (p) => {
  if (p && p.ratings) {
    let ratingsArray = p && p.ratings;
    let length = ratingsArray.length;
    let total = ratingsArray.map((r) => r.star).reduce((p, n) => p + n, 0);
    let highest = length * 5;
    let result = (total * 5) / highest;

    return (
      <div className="d-flex justify-content-center align-items-center">
        <span>
          <ReactStars
            count={5}
            size={30}
            edit={false}
            isHalf={true}
            value={result}
            activeColor="#ffd700"
          />
        </span>
        <p className="pt-3 ml-3">({p.ratings.length})</p>
      </div>
    );
  }
};
