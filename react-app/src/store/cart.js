// TYPES
const ADD_CART_ITEM = 'products/ADD_CART_ITEM'
const LOAD_CART = 'products/LOAD_CART'
const EDIT_CART = 'products/EDIT_CART'
const DELETE_CART_ITEM = 'products/DELETE_CART_ITEM'
const DELETE_CART = 'products/DELETE_CART'

// ACTION CREATORS
export const addCartItem = (cartItems) => ({
    type: ADD_CART_ITEM,
    payload: cartItems
})

export const getCartItems = (cartItems) => ({
    type: LOAD_CART,
    payload: cartItems
})


export const editCartItem = (cartItemId, quantity) => ({
    type: EDIT_CART,
    cartItemId,
    quantity
})

export const deleteCartItem = (cartItemId) => ({
    type: DELETE_CART_ITEM,
    payload: cartItemId
})

export const deleteCart = () => ({
    type: DELETE_CART,
})


// THUNKS
export const addCartItemThunk = (productId, quantity) => async (dispatch) => {
  const response = await fetch(`/api/products/${productId}/cart`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({"quantity": quantity})
  });

  if (response.ok) {
    const cartItem = await response.json() 
    dispatch(addCartItem(cartItem))
    return cartItem
    }
}

export const getCartItemsThunk = () => async (dispatch) => {
  const response = await fetch('/api/cartItems/current')

  if (response.ok) {
    const cartItems = await response.json()
    dispatch(getCartItems(cartItems))
    return cartItems
  }
}

export const editCartItemThunk = (quantity, cartItemId) => async (dispatch) => {
  const response = await fetch(`/api/cartItems/${cartItemId}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({"quantity": quantity})
  });

  if(response.ok){
    const cartItem = await response.json()
    dispatch(editCartItem(cartItemId, quantity))
    return cartItem
  }
}

export const deleteCartItemThunk = (cartItemId) => async (dispatch) => {
  const response = await fetch(`/api/cartItems/${cartItemId}`, {
    method: 'DELETE'
  });

  if(response.ok){
    dispatch(deleteCartItem(cartItemId))
  } 
}

export const deleteCartThunk = () => async (dispatch) => {
  const response = await fetch('/api/cartItems/current', {
    method: 'DELETE'
  });

  if(response.ok){
    dispatch(deleteCart())
  } 
}

// reducers
export const cartReducer = (state = {}, action) => {
  switch(action.type){
    case ADD_CART_ITEM: 
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
      newState[action.cartItemId].quantity = action.quantity
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
