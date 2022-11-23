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
                    <div>{review.review}</div>
                    <div>{review.avgRating}</div>
                    <div>{review.reviewCount}</div>
                    <div>{review.stars}</div>
                    </>
                )
            })}
        </div>
    )
 )

}

export default GetProductReviews;
