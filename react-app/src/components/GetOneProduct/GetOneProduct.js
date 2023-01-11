import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import "./GetOneProduct.css";
import {deleteProductThunk, getOneProductThunk} from '../../store/product';
import { deleteReviewThunk } from '../../store/review';
import GetProductReviews from '../GetProductReviews/GetProductReviews'
// import CreateReviewModal from "../CreateReview";
// import EditReviewModal from "../EditReview";
import {getAllReviewsThunk} from '../../store/review'
import { addCartItemThunk } from "../../store/cart";

const GetOneProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {productId} = useParams();

  const user = useSelector((state) => state.session.user);
  const product = useSelector(state => state.product.singleProduct);
  const productArr = Object.values(product);

  const reviews = useSelector(state => state.review.allReviews);
  const reviewsArr = Object.values(reviews);
  const userReviews = Object.values(reviews).filter(review => review.user_id === user?.id)

  const [isLoaded, setIsLoaded] = useState(false)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    dispatch(getOneProductThunk(productId))
    dispatch(getAllReviewsThunk(productId))
    .then(() => setIsLoaded(true))
  }, [dispatch, productId, reviewsArr.length]);

  if (Object.keys(productArr).length === 0) {
    return null;
  }

  const addItem = async () => {
    
    dispatch(addCartItemThunk(productId, quantity))
      .then(() => {
        history.push('/cart')
    })
}

  const quantities = []
  for (let i = 1; i <= product.quantity; i++) {
    quantities.push(i)
  }

   const deleteProductHandler = (productId) => {
    dispatch(deleteProductThunk(productId))
    history.push("/");
  };

  const deleteReviewHandler = (reviewId) => {
  dispatch(deleteReviewThunk(reviewId));
  history.push(`/products/${productId}`);
  };

return ( 
      <>
        {isLoaded && (
          <div className="product-container">
            <div className="product-info-container">
              <img
                className="product-image"
                src={product.image}
                alt=""
                onError={e => {
                  e.currentTarget.src = "https://nckenya.com/wp-content/themes/consultix/images/no-image-found-360x260.png"
                  e.onerror=null;
                  }}
              />
              <div className="product-info">
                <div className="shop-name">{product.user.firstName}'s Shop</div>
                <div className="product-rating-info">
                  {product.avgRating % 1 ? 
                      <div>{[...Array(Math.floor(product.avgRating))].map(star => <i className="fa-solid fa-star fa-xs"></i>)}
                        <i className="fa-solid fa-star-half fa-xs"></i>
                          <span className="products-reviewCount"> ({product.reviewCount})</span>
                      </div>
                      :
                      <div>{[...Array(product.avgRating)].map(star => <i className="fa-solid fa-star fa-xs"></i>)}
                        <span className="products-reviewCount"> ({product.reviewCount})</span>
                      </div>
                  }
                  {/* <div>{!product.avgRating}
                    <i className="fa-regular fa-star"></i>
                  </div> */}
                </div>
                <div className="product-name">{product.name}</div>
                <div className="product-price">${product.price.toFixed(2)}</div>
              {user && user.id !== product.user_id && (
                <select 
                  className="product-quantity-field"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  >
                  {quantities.map(quantity => (<option key={quantity} value={quantity}>{quantity}</option>))}
                </select>)}
                {!user && <button className="cart-button1">Please sign in to add item to cart</button>} 
                
                {user && user.id !== product.user_id && (
                  <button className="cart-button" onClick={() => addItem()}>
                  Add to cart | Only {product.quantity} available
                </button>)}

                <div className="product-info2">
                  <i className="fa-solid fa-cart-plus fa-lg"></i>
                    Over 20 people have this in their carts.
                    <br></br>
                  <i className="fa-solid fa-gifts fa-lg" ></i>
                    Order soon to get by Nov 30-Dec 6.
                    <br></br>
                  <i className="fa-solid fa-star fa-lg"></i>
                    Star Seller. 
                    <br></br>
                  <i className="fa-solid fa-truck fa-lg"></i>
                    Hooray! This item ships free to the US
                </div>
                <span className="description">Description</span>
                <div className="product-description">{product.description}</div>      
              </div>
            </div>
        
          <div className="product-buttons">
                      {user && user.id === product.user_id && (
                        <button
                          className="edit-product-button"
                          onClick={() =>
                            history.push(`/products/${product.id}/edit`)
                          }
                        >
                          Edit Listing
                        </button>
                      )}
                      {user && user.id === product.user_id && (
                        <button
                          className="delete-product-button"
                          onClick={() => deleteProductHandler(product.id)}
                          >
                          Delete Listing
                        </button>
                      )}
                  </div>
          </div>)}
                <div className="review-header">
                  {reviewsArr && <div className="product-numReviews">{reviewsArr.length} reviews</div>}
                  {product.avgRating % 1 ? 
                    <div>{[...Array(Math.floor(product.avgRating))].map(star => <i className="fa-solid fa-star"></i>)}
                      <i className="fa-solid fa-star-half"></i>
                    </div>
                    :
                    <div>{[...Array(product.avgRating)].map(star => <i className="fa-solid fa-star"></i>)}</div>
                  }
                </div>
            <div>
                <GetProductReviews />
            </div> 

                {/* {!userReviews.length && user && product.user_id !== user.id &&
                  <CreateReviewModal />} */}
                  {user?.id !== product.user_id && !userReviews.length && user && 
                    <NavLink to={`/products/${productId}/new-review`}>
                    <button 
                      type="submit"
                      className="create-review-button"
                      >Create a Review
                    </button>
                    </NavLink>}
                  {userReviews.map(review => {
                    return (
                      <>
                      {/* {user && user.id === review.user_id &&
                      <EditReviewModal />} */}
                        {user && user.id === review.user_id && <NavLink to={`/reviews/${review.id}/edit`}>
                          <button
                            className="edit-review-button"
                          >
                            Edit Review
                          </button>
                        </NavLink>}
                  
                        {user && user.id === review.user_id && (
                          <button
                            className="delete-review-button"
                            onClick={() => deleteReviewHandler(review.id)}
                          >
                            Delete Review
                          </button>
                        )}
                      </>
                    )
                })}
    </>
  )
}

export default GetOneProduct;