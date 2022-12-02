// import { fetch } from './csrf';

// TYPES
const CREATE_PRODUCT = 'products/CREATE_PRODUCT'
const LOAD_ALL_PRODUCTS = 'products/LOAD_ALL_PRODUCTS'
const LOAD_ONE_PRODUCT = 'products/LOAD_ONE_PRODUCT'
const LOAD_USERS_PRODUCTS = 'products/LOAD_USERS_PRODUCTS'
const EDIT_PRODUCT = 'products/EDIT_PRODUCT'
const DELETE_PRODUCT = 'products/DELETE_PRODUCT'
const LOAD_SEARCH_PRODUCTS = 'products/LOAD_SEARCH_PRODUCTS'

// ACTION CREATORS
export const createProduct = (product) => ({
    type: CREATE_PRODUCT,
    payload: product
})

export const getAllProducts = (products) => ({
    type: LOAD_ALL_PRODUCTS,
    payload: products
})

export const getOneProduct = (product) => ({
    type: LOAD_ONE_PRODUCT,
    payload: product
})

export const getUsersProducts = (products) => ({
    type: LOAD_USERS_PRODUCTS,
    payload: products
})

export const editProduct = (product) => ({
    type: EDIT_PRODUCT,
    payload: product
})

export const deleteProduct = (productId) => ({
    type: DELETE_PRODUCT,
    payload: productId
})

export const getSearchProduct = (products) => ({
    type: LOAD_SEARCH_PRODUCTS,
    payload: products
})


// THUNKS
export const createProductThunk = (data) => async (dispatch) => {
  const response = await fetch('/api/products/', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });

  if (response.ok) {
    const product = await response.json() 
    dispatch(createProduct(product))
    return product
    }
}

export const getAllProductsThunk = () => async (dispatch) => {
  const response = await fetch('/api/products/')

  if (response.ok) {
    const products = await response.json()
    dispatch(getAllProducts(products))
    return products
  }
}

export const getOneProductThunk = (productId) => async (dispatch) => {
  const response = await fetch(`/api/products/${productId}`)

  if(response.ok){
    const product = await response.json()
    dispatch(getOneProduct(product))
    return product
  }
}

export const getUsersProductsThunk = (userId) => async (dispatch) => {
  const response = await fetch(`api/users/${userId}/products`);

  if(response.ok){
    const products = await response.json()
    dispatch(getUsersProducts(products))
    return products
  } 
}

export const editProductThunk = (productId, data) => async (dispatch) => {
  const response = await fetch(`/api/products/${productId}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });

  if(response.ok){
    const product = await response.json()
    dispatch(editProduct(product))
    return product
  }
}

export const deleteProductThunk = (productId) => async (dispatch) => {
  const response = await fetch(`/api/products/${productId}`, {
    method: 'DELETE'
  });

  if(response.ok){
    dispatch(deleteProduct(productId))
  } 
}

export const getSearchProductsThunk = (keyword) => async (dispatch) => {
  const response = await fetch(`/api/products/search/${keyword}`)

  if (response.ok) {
    const products = await response.json()
    dispatch(getSearchProduct(products))
    return products
  }
}

// reducers
let initialState = {allProducts:{}, singleProduct:{}, searchProducts:{}};
export const productReducer = (state = initialState, action) => {
  switch(action.type){
    case CREATE_PRODUCT: 
     const newState = { ...state, singleProduct: {}};
      newState.singleProduct = action.payload;
      return newState;
    case LOAD_ALL_PRODUCTS: {
      const newState = {...state, allProducts: {}};
      action.payload.Products.forEach(product => {
        newState.allProducts[product.id] = product
      })
      return newState
    }
    case LOAD_ONE_PRODUCT: {
      const newState = {...state, singleProduct: action.payload}
    //   newState.singleProduct = action.payload
      return { ...newState }
    }
    case LOAD_USERS_PRODUCTS: {
      const newState = {...state, allProducts: {}}
      action.payload.Products.forEach(product => {
        newState.allProducts[product.id] = product
      })      
      return newState
    }
    case EDIT_PRODUCT: {
      const newState = {...state, singleProduct: {}}
      newState.singleProduct = action.payload
      return newState
    }
    case DELETE_PRODUCT:{
      const newState = {...state, singleProduct:{...state.singleProduct}, allProducts:{...state.allProducts}}
      delete newState.singleProduct[action.payload]
      delete newState.allProducts[action.payload]
      return newState
    }
      case LOAD_SEARCH_PRODUCTS: {
      const newState = {...state, searchProducts: {}};
      action.payload.Products.forEach(product => {
        newState.searchProducts[product.id] = product
      })
      return newState
    }
    default:
      return state
  }
}