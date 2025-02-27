import React, { useState, useEffect } from 'react';
import useFetch from '../hook/useFetch';


const AdminGetReviews = () => {
    const [reviews, setReviews] = useState([]);
    const { isLoading, error,  fetchData } = useFetch();

    useEffect(() => {
        const fetchReviews = async () => {
            const result = await fetchData('admin/get-all-reviews');
            if (result) {
                setReviews(result);
            }
        };
        fetchReviews();
    }, [fetchData]);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <h2>Reviews Collections</h2>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {reviews.length > 0 ? (
                reviews.map((reviewGroup) => (
                    <div key={reviewGroup._id.movieId} className="card mb-3" style={{ maxWidth: '500px', margin: 'auto', top: '40px' }}>
                        <div className="card-body">
                            <h5 className="card-title">Movie ID: {reviewGroup._id.movieId}</h5>
                            <p className="card-text">Total Reviews: {reviewGroup.count}</p>
                            {reviewGroup.reviews.map((review, index) => (
                                <div key={index} className="card mb-3" style={{ maxWidth: '500px', margin: 'auto', top: '20px' }}>
                                    <div className="card-body">
                                        <p className="card-text">User ID: {review.userId}</p>
                                        <p className="card-text">Rating: {review.rating}</p>
                                        <p className="card-text">Review: {review.review}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <p>No reviews found.</p>
            )}
        </div>
    );
};

export default AdminGetReviews;