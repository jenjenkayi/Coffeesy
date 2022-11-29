import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import "./GetProductReviews.css";
import {getAllReviewsThunk} from '../../store/review'

const GetProductReviews = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {productId} = useParams();

  const reviews = useSelector(state => state.review.allReviews);
  const reviewsArr = Object.values(reviews);
  
  useEffect(() => {
    dispatch(getAllReviewsThunk(productId))
  }, [dispatch, productId]);

  if (Object.keys(reviewsArr).length === 0) {
    return null;
  }

return (
    reviewsArr && (
        <div className="reviews-container">
            {reviewsArr.map((review) => {
                return (
                    <>
                    <div className="reviews-stars">{review.stars}</div>
                    <div className="reviews-review">{review.review}</div>
                    <div className="reviews-user">Review by: {review.user?.firstName} {review.user?.firstName}  {review.created_at.slice(8, 11)} {review.created_at.slice(5, 7)}, {review.created_at.slice(12, 16)}</div>
                    </>
                )
            })}
        </div>
    )
 )

}

export default GetProductReviews;
