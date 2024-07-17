import { useState } from "react";
import StarRating from "./Customer/StarRating";

function Test() {

    const [rating, setRating] = useState(0);
    const onRatingChange = (newRating) => {
        setRating(newRating);
    }
  

  return (
    <div>
      <StarRating rating={rating} onRatingChange={onRatingChange} />
    </div>
  );
}

export default Test;