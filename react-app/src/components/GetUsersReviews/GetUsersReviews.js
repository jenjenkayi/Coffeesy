import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import "./GetUsersReviews.css";
import { deleteReviewThunk, getUsersReviewsThunk,  } from '../../store/review';

const GetUsersReviews = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const userId = user?.id
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
  history.push("/reviews/current");
  };

  return (
    <>
      <div className="background"></div>
      <div className="user-reviews-title">{user.firstName}'s Reviews</div>
    {reviewsArr && (
        <div className="user-reviews-container">
            {reviewsArr.map(review => {
                return (
                  <>
                    <div className="user-reviews-wrapper">
                      <div className="user-reviews-left-container">
                        <NavLink key={review.product.id} to={`/products/${review.product.id}`}>
                          <img
                            className="user-product-image"
                            src={review.product.image}
                              alt=""
                          />
                        </NavLink>   
                      </div>
                      <div className="user-reviews-right-container">
                        <NavLink key={review.product.id} to={`/products/${review.product.id}`}>
                          <div className="user-product-name">{review.product.name}</div> 
                        </NavLink>
                        <div className="user-reviews-info">
                          <div className="user-reviews-info-title">Your Review:</div>
                          <div>{review.stars}</div>
                          <div>{review.review}</div>
                        </div>
                      <div className="user-reviews-buttons">
                          {user && user.id === review.user_id && (
                            <button
                              className="user-edit-reviews-button"
                              onClick={() => history.push(`/reviews/${review.id}/edit`)}>
                              Edit Review
                            </button>
                          )}
                          {user && user.id === review.user_id && (
                            <button
                              className="user-delete-reviews-button"
                              onClick={() => deleteReviewHandler(review.id)}>
                              Delete Review
                            </button>
                          )}
                      </div>
                    </div>
                  </div>
                </>
                )
            })}
        </div>
      )
    }
  </>
)
}

export default GetUsersReviews;