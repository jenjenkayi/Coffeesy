import { csrfFetch } from './csrf';

// TYPES
const CREATE_REVIEW = 'reviews/CREATE_REVIEW'
const LOAD_ALL_REVIEWS = 'reviews/LOAD_ALL_REVIEWS'
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
export const createReviewThunk = (productId, data) => async (dispatch) => {
  const response = await csrfFetch(`/api/products/${productId}/review`, {
    method: 'post',
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

export const getUsersReviewsThunk = (userId) => async (dispatch) => {
  const response = await csrfFetch('/api/reviews/current')
  
  if (response.ok) {
    const reviews = await response.json()
    dispatch(getUserReviews(reviews))
    return reviews
  }
}

export const updateReviewThunk = (review, reviewId) => async (dispatch) => {
   const response = await csrfFetch(`/api/reviews/${reviewId}`, {
     method: 'PUT',
     headers: {
       'Content-Type': 'application/json'
      },
      body: JSON.stringify(review)
    });
    
    if(response.ok){
      const data = await response.json()
      dispatch(updateReview(data))
      return data;
  }
}

export const getOneReviewThunk = (spotId, reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews/${reviewId}`)

  if(response.ok){
    const data = await response.json()
    dispatch(getOneReview(data))
    return response;
  }
}

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE',
  });

  if(response.ok){
    // const review = await response.json()
    dispatch(deleteReview(reviewId))
    // return review
  } 
}

// reducers
const initialState = {spotReviews:{}, userReviews:{}}
export default function reviewsReducer(state=initialState, action){
  switch(action.type) {
    case CREATE_REVIEW: {
      // const newState = { ...state, spotReviews:{...state.spotReviews}}
      // console.log("newState", newState)
      // newState.spotReviews[action.payload.id] = action.payload
      // return newState
      const newState = {...state}
        newState[action.payload.id] = action.payload
        return newState;
  }
    case LOAD_ALL_REVIEWS: {
      const newState = { ...state, spotReviews:{...state.spotReviews}}
        action.payload.forEach(review => {
        newState.spotReviews = review
      });
     return newState
    }
    case LOAD_USERS_REVIEWS: {
      const newState = { ...state, userReviews:{...state.userReviews}}
        action.payload.Reviews.forEach(review => {
        newState.userReviews[review.id] = review
      });
      console.log('thunk', newState)
      return newState;
    }
    case EDIT_REVIEW: {
      const newState = {...state, userReviews:{...state.userReviews}}
      newState.userReviews[action.payload.id] = action.payload
      return newState
    }
    case DELETE_REVIEW: {
      const newState = { ...state, spotReviews:{...state.spotReviews}, userReviews:{...state.userReviews}}
      delete newState.spotReviews[action.payload]
      delete newState.userReviews[action.payload]
      return newState
    }
    default:
      return state
  }
}