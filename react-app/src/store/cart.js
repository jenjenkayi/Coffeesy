// TYPES
const ADD_CART = 'products/ADD_CART'
const LOAD_CART = 'products/LOAD_CART'
const EDIT_CART = 'products/EDIT_CART'
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


export const editCart = (cartItemsId) => ({
    type: EDIT_CART,
    payload: cartItemsId
})

export const deleteCart = (cartItemsId) => ({
    type: DELETE_CART,
    payload: cartItemsId
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
    const products = await response.json()
    dispatch(getCart(products))
    return products
  }
}

export const editCartThunk = (cartItemId, data) => async (dispatch) => {
  const response = await fetch(`/api/products/${cartItemId}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });

  if(response.ok){
    const product = await response.json()
    dispatch(editCart(product))
    return product
  }
}

export const deleteCartThunk = (cartItemId) => async (dispatch) => {
  const response = await fetch(`/api/products/${cartItemId}`, {
    method: 'DELETE'
  });

  if(response.ok){
    dispatch(deleteCart(cartItemId))
  } 
}

// reducers
export const cartReducer = (state = {}, action) => {
  switch(action.type){
    case ADD_CART: 
     const newState = { ...state};
      newState.singleProduct = action.payload;
      return newState;
    case LOAD_CART: {
      const newState = {...state};
      action.payload.Products.forEach(product => {
        newState.allProducts[product.id] = product
      })
      return newState
    }
    case EDIT_CART: {
      const newState = {...state}
      newState.singleProduct = action.payload
      return newState
    }
    case DELETE_CART:{
      const newState = {...state}
      delete newState.singleProduct[action.payload]
      return newState
    }
    default:
      return state
  }
}