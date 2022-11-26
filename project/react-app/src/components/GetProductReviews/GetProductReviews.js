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
          <div className="reviews-count">{reviewsArr.length} reviews</div>
            {reviewsArr.map((review) => {
                return (
                    <>
                    <div className="reviews-avgRating">{review.avgRating}</div>
                    <div className="reviews-stars">{review.stars}</div>
                    <div className="reviews-review">{review.review}</div>
                    <duv className="reviews-user">{review.user.firstName} {review.user.firstName}</duv>
                    <duv className="reviews-date">{review.created_at.slice(5, 17)}</duv>
                    </>
                )
            })}
        </div>
    )
 )

}

export default GetProductReviews;
