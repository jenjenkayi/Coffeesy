import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import "./GetOneProduct.css";
import {deleteProductThunk, getOneProductThunk} from '../../store/product';
import { deleteReviewThunk } from '../../store/review';
import GetProductReviews from '../GetProductReviews/GetProductReviews'

const GetOneProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {productId} = useParams();

  const user = useSelector((state) => state.session.user);
  const product = useSelector(state => state.product.singleProduct);
  const productArr = Object.values(product);

  const reviews = useSelector(state => state.review.allReviews);
  const userReviews = Object.values(reviews).filter(review => review.user_id === user.id)

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
              <div>
                 <img
                    className="product-image"
                    src={product.image}
                    alt=""
                    />
              </div>
              <div className="product-info">
                <div className="shop-name">Coffeezy Store</div>
                <div className="product-rating-info">
                    <span className="product-avgRating">{product.avgRating}</span> <span className="products-reviewCount">({product.reviewCount})</span>
                </div>
                <div className="product-name">{product.name}</div>
                <div className="product-price">${product.price}</div>
                <div className="product-quantity">Only {product.quantity} left!</div>
                <div className="product-info2">
                  <i className="fa-solid fa-cart-shopping"></i>
                    <span>Other people want this. Over 20 people have this in their carts right now.</span>
                  <i className="fa-solid fa-gifts"></i>
                    <span>Order soon to get by Nov 30-Dec 6.</span>
                  <i className="fa-solid fa-star"></i>
                    <span>Star Seller. This seller consistently earned 5-star reviews, shipped on time, and replied quickly to any messages they received.</span>
                  <i className="fa-solid fa-truck"></i>
                    <span>Hooray! This item ships free to the US</span>
                </div>
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
            <div>
                <GetProductReviews />
            </div>
            {!userReviews.length && user && <NavLink to={`/products/${productId}/new-review`}>
            <button 
              type="submit"
              className="one_spot_create_review_button"
              >Create a Review
            </button>
            </NavLink>}
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