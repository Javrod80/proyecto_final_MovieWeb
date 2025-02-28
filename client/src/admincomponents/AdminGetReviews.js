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
        <div className="container mt-5">
            <h1 className="text-primary text-center mb-4">Admin Dashboard</h1>
            <h2 className="text-success text-center">Reviews Collections</h2>
            {isLoading && <p className="text-warning text-center">Loading...</p>}
            {error && <p className="text-danger text-center">Error: {error}</p>}
            {reviews.length > 0 ? (
                <div className="row justify-content-center">
                    {reviews.map((reviewGroup) => (
                        <div key={reviewGroup._id.movieId} className="card mb-3 shadow-lg" style={{ maxWidth: '500px' }}>
                            <div className="card-body text-center">
                                <h5 className="card-title text-dark">Movie ID: {reviewGroup._id.movieId}</h5>
                                <p className="card-text text-muted">Total Reviews: <span className="text-primary">{reviewGroup.count}</span></p>
                                {reviewGroup.reviews.map((review, index) => (
                                    <div key={index} className="card mb-3 shadow-sm" style={{ maxWidth: '450px', margin: 'auto' }}>
                                        <div className="card-body">
                                            <p className="card-text"><span className="text-info">User ID:</span> {review.userId}</p>
                                            <p className="card-text"><span className="text-warning">Rating:</span> {review.rating}</p>
                                            <p className="card-text text-muted">Review: {review.review}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-secondary text-center">No reviews found.</p>
            )}
        </div>
    );
};

export default AdminGetReviews;