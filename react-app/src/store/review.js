import { csrfFetch } from './csrf';

// TYPES
const CREATE_REVIEW = 'reviews/CREATE_REVIEW'
const LOAD_ALL_REVIEWS = 'reviews/LOAD_ALL_REVIEWS'
const LOAD_ONE_REVIEW = 'reviews/LOAD_ONE_REVIEW'
const LOAD_USERS_REVIEWS = 'reviews/LOAD_USERS_REVIEWS'
const DELETE_REVIEW = 'reviews/DELETE_REVIEW'
const EDIT_REVIEW = 'reviews/EDIT_REVIEW'

// ACTION CREATORS
export const createReview = (review) => ({
    type: CREATE_REVIEW,
    payload: review
})

export const getAllReviews = (reviews) => ({
    type: LOAD_ALL_REVIEWS,
    payload: reviews
})

export const getOneReview = (review) => ({
    type: LOAD_ONE_REVIEW,
    payload: review
})

export const getUsersReviews = (reviews) => ({
    type: LOAD_USERS_REVIEWS,
    payload: reviews
})

export const editReview = (review) => ({
    type: EDIT_REVIEW,
    payload: review
})

export const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    payload: reviewId
})

// THUNKS
export const createReviewThunk = (data) => async (dispatch) => {
  const response = await csrfFetch(`/api/products/${data.productId}/review`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });
  
  if (response.ok) {
    const review = await response.json()
    dispatch(createReview(review))
    return review
  }
}

export const getAllReviewsThunk = (productId) => async (dispatch) => {
  const response = await csrfFetch(`/api/products/${productId}/reviews`)
  
  if (response.ok) {
    const reviews = await response.json()
    dispatch(getAllReviews(reviews))
    return reviews
  }
}

export const getOneReviewThunk = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`)
  
  if (response.ok) {
    const review = await response.json()
    dispatch(getOneReview(review))
    return review
  }
}

export const getUsersReviewsThunk = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userId}/reviews`)
  
  if (response.ok) {
    const reviews = await response.json()
    dispatch(getUsersReviews(reviews))
    return reviews
  }
}

export const editReviewThunk = (data) => async (dispatch) => {
   const response = await csrfFetch(`/api/reviews/${data.reviewId}`, {
     method: 'PUT',
     headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    
    if (response.ok) {
      const review = await response.json()
      dispatch(editReview(review))
      return review;
  }
}

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    dispatch(deleteReview(reviewId))
  } 
}

// reducers
const initialState = {allReviews:{}, singleReview:{}};
export const reviewReducer = (state=initialState, action) => {
  switch(action.type) {
    case CREATE_REVIEW: {
      const newState = {...state, singleReview:{}}
        newState.singleReview = action.payload
        return newState;
    }
    case LOAD_ALL_REVIEWS: {
      const newState = { ...state, allReviews:{}}
        action.payload.Reviews.forEach(review => {
        newState.allReviews[review.id] = review
      });
     return newState
    }
    case LOAD_ONE_REVIEW: {
      const newState = {...state, singleReview: action.payload}
      return { ...newState }
    }
    case LOAD_USERS_REVIEWS: {
      const newState = { ...state, allReviews:{}}
        action.payload.Reviews.forEach(review => {
        newState.allReviews[review.id] = review
      });
      return newState;
    }
    case EDIT_REVIEW: {
      const newState = {...state, singleReview:{}}
      newState.singleReview = action.payload
      return newState
    }
    case DELETE_REVIEW: {
      const newState = { ...state, allReviews:{...state.allReviews}, singleReview:{...state.singleReview}}
      delete newState.allReviews[action.payload]
      delete newState.singleReview[action.payload]
      return newState
    }
    default:
      return state;
  }
}