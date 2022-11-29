import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import "./GetOneProduct.css";
import {deleteProductThunk, getOneProductThunk} from '../../store/product';
import { deleteReviewThunk } from '../../store/review';
import GetProductReviews from '../GetProductReviews/GetProductReviews'
import CreateReviewModal from "../CreateReview";

const GetOneProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {productId} = useParams();

  const user = useSelector((state) => state.session.user);
  const product = useSelector(state => state.product.singleProduct);
  const productArr = Object.values(product);

  const reviews = useSelector(state => state.review.allReviews);
  const userReviews = Object.values(reviews).filter(review => review.user_id === user?.id)

  useEffect(() => {
    dispatch(getOneProductThunk(productId))
  }, [dispatch, productId]);

  if (Object.keys(productArr).length === 0) {
    return null;
  }

  const deleteProductHandler = (productId) => {
    dispatch(deleteProductThunk(productId));
    history.push("/");
  };

  const deleteReviewHandler = (reviewId) => {
  dispatch(deleteReviewThunk(reviewId));
  history.push(`/products/${productId}`);
  };

return ( 
        <>
          <div className="product-container">
            <div className="product-info-container">
              <img
                className="product-image"
                  src={product.image}
                alt=""
              />
              <div className="product-info">
                <div className="shop-name">{user?.firstName}'s Shop</div>
                <div className="product-rating-info">
                  <span className="product-avgRating">{product.avgRating}</span> <span className="products-reviewCount">({product.reviewCount})</span>
                </div>
                <div className="product-name">{product.name}</div>
                <div className="product-price">${product.price}</div>
                <div className="product-quantity">Only {product.quantity} left!</div>
                <div className="product-info2">
                  <i className="fa-solid fa-cart-shopping fa-lg"></i>
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
          </div>
                <div className="review-header">
                  <div>{product.reviewCount} reviews {product.avgRating}</div>
                </div>
            <div>
                <GetProductReviews />
            </div>
            {/* {!userReviews.length && user && <NavLink to={`/products/${productId}/new-review`}> */}
            {!userReviews.length && user && 
            // <button 
            //   type="submit"
            //   className="create-review-button"
            //   >Create a Review
            // </button>
            // </NavLink>}
            <CreateReviewModal reviews={reviews}/>}
            {userReviews.map(review => {
                return (
                  <>
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