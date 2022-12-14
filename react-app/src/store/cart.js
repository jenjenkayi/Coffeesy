// TYPES
const ADD_CART = 'products/ADD_CART'
const LOAD_CART = 'products/LOAD_CART'
const EDIT_CART = 'products/EDIT_CART'
const DELETE_CART_ITEM = 'products/DELETE_CART_ITEM'
const DELETE_CART = 'products/DELETE_CART'

// ACTION CREATORS
export const addCart = (cartItems) => ({
    type: ADD_CART,
    payload: cartItems
})

export const getCart = (cartItems) => ({
    type: LOAD_CART,
    payload: cartItems
})


export const editCart = (cartItemsId, quantity) => ({
    type: EDIT_CART,
    payload: cartItemsId,
    quantity
})

export const deleteCartItem = (cartItemsId) => ({
    type: DELETE_CART_ITEM,
    payload: cartItemsId
})

export const deleteCart = () => ({
    type: DELETE_CART,
})


// THUNKS
export const addCartThunk = (data) => async (dispatch) => {
  const response = await fetch('/api/products/', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });

  if (response.ok) {
    const cartItem = await response.json() 
    dispatch(addCart(cartItem))
    return cartItem
    }
}

export const getCartThunk = () => async (dispatch) => {
  const response = await fetch('/api/products/')

  if (response.ok) {
    const cartItems = await response.json()
    dispatch(getCart(cartItems))
    return cartItems
  }
}

export const editCartThunk = (cartItemId, data) => async (dispatch) => {
  const response = await fetch(`/api/products/${cartItemId}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });

  if(response.ok){
    const cartItem = await response.json()
    dispatch(editCart(cartItem))
    return cartItem
  }
}

export const deleteCartItemThunk = (cartItemId) => async (dispatch) => {
  const response = await fetch(`/api/products/${cartItemId}`, {
    method: 'DELETE'
  });

  if(response.ok){
    dispatch(deleteCartItem(cartItemId))
  } 
}

export const deleteCartThunk = () => async (dispatch) => {
  const response = await fetch(`/api/products/}`, {
    method: 'DELETE'
  });

  if(response.ok){
    dispatch(deleteCart())
  } 
}

// reducers
export const cartReducer = (state = {}, action) => {
  switch(action.type){
    case ADD_CART: 
     const newState = { ...state};
      newState[action.payload.id] = action.payload;
      return newState;
    case LOAD_CART: {
      const newState = {...state};
      action.payload.CartItems.forEach(cartItem => {
        newState[cartItem.id] = cartItem
      })
      return newState
    }
    case EDIT_CART: {
      const newState = {...state}
      newState[action.payload.id] = action.payload
      return newState
    }
    case DELETE_CART_ITEM:{
      const newState = {...state}
      delete newState[action.payload]
      return newState
    }
    case DELETE_CART:{
      return {}
    }
    default:
      return state
  }
}