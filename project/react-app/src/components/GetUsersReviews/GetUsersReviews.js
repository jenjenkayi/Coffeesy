import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import "./GetUsersReviews.css";
import { deleteReviewThunk, getUsersReviewsThunk,  } from '../../store/review';
import { getAllProductsThunk } from '../../store/product';

const GetUsersReviews = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const userId = user?.id
  const reviews = useSelector(state => state.review.allReviews);
  const reviewsArr = Object.values(reviews);
  
  const products = useSelector(state => state.product.allProducts);
  const productsArr = Object.values(products);
  const prodcutInReviews = reviewsArr.filter(ele => ele.product_id === productsArr.id)

  console.log("reviewsArr", prodcutInReviews)

useEffect(() => {
    dispatch(getUsersReviewsThunk(userId))
  }, [dispatch, userId]);

useEffect(() => {
    dispatch(getAllProductsThunk())
  }, [dispatch]);

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
      <div className="reviews-title">{user.firstName}'s Reviews</div>
    {reviewsArr && (
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
                            history.push(`/reviews/${review.id}/edit`)
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
    }
  </>
)
}

export default GetUsersReviews;