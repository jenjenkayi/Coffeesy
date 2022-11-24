import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import "./GetUsersReviews.css";
import { deleteReviewThunk, getUsersReviewsThunk } from '../../store/review';

const GetUsersReviews = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const userId = user.id
  const reviews = useSelector(state => state.review.allReviews);
  const reviewsArr = Object.values(reviews);

 useEffect(() => {
    dispatch(getUsersReviewsThunk(userId))
  }, [dispatch, userId]);

  if (Object.keys(reviewsArr).length === 0) {
    return null;
  }

  const deleteReviewHandler = (reviewId) => {
  dispatch(deleteReviewThunk(reviewId));
  history.push("/");
  };

  return (
    reviewsArr && (
        <div className="reviews-container">
            {reviewsArr.map(review => {
                return (
                    <>
                <div>{review.review}</div>
                <div>{review.stars}</div>
                <div className="review-buttons">
                      {user && user.id === review.user_id && (
                        <button
                          className="edit-review-button"
                          onClick={() =>
                            history.push(`/story/${review.id}/edit`)
                          }
                        >
                          Edit Review
                        </button>
                      )}
                      {user && user.id === review.user_id && (
                        <button
                          className="delete-review-button"
                          onClick={() => deleteReviewHandler(review.id)}
                        >
                          Delete Review
                        </button>
                      )}
                  </div>
            
                </>
                )
            })}
        </div>
    )
  )
}

export default GetUsersReviews;