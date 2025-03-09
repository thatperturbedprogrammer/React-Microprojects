import { Star } from "lucide-react";
import { useState } from "react";
import "./StarRating.css";

export default function StarRating({ totalStars = 5 }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  function handleClick(value) {
    setRating(value);
  }

  const starsArray = [...Array(totalStars)];

  return (
    <>
      <div className="star-rating-container">
        {starsArray.map((_, index) => {
          const starValue = index + 1;
          return (
            <Star
              key={index}
              className={`star ${
                starValue <= (hover || rating) ? "star-filled" : "star-empty"
              }`}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(0)}
              onClick={() => handleClick(starValue)}
            />
          );
        })}
      </div>
    </>
  );
}
