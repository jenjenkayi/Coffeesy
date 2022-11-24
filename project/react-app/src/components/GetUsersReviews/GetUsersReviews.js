import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import "./GetUsersProducts.css";
import { getUsersReviewsThunk, deleteReviewThunk } from '../../store/review';

const GetUsersReviews = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const userId = user.id
  const reviews = useSelector(state => state.product.allProducts);
  const reviewsArr = Object.values(reviews);
  const userReviews = reviewsArr.filter((product) => product.user_id === user.id);

  useEffect(() => {
    dispatch(getUsersReviewsThunk(userId))
  }, [dispatch, userId]);


  if (Object.keys(userReviews).length === 0) {
    return null;
  }

  const deleteReviewHandler = (reviewId) => {
  dispatch(deleteReviewThunk(reviewId));
  history.push("/");
  };

  return (
    <h1>Users' Reviews</h1>
  )
}

export default GetUsersReviews;