import React from "react";
import { useReviews } from "../providers/ReviewsProvider";



const Reviews = () => {
  
  const { reviews, addReview } = useReviews();

    return (
        <div>
            <h2>Reseñas</h2>
            {reviews.map((review) => (
                <div key={review._id}>
                    <p>{review.review}</p>
                </div>
            ))}

            <h2>Agregar Reseña</h2>
            <form onSubmit={addReview}>
                <label>Reseña:</label>
                <input type="text" name="review" />
                <button type="submit">Agregar</button>
            </form>



        </div>
    );
};

export default Reviews;