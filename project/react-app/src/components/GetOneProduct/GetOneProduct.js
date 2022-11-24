import React, { useEffect } from "react";
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
              <div>{product.image}</div>
              <div>
              <img className="product-image" src="https://cdn.pixabay.com/photo/2017/06/02/11/49/still-life-2366084__340.jpg" alt="default"/>
              </div>
              <div>{product.avgRating}</div>
              <div>{product.reviewCount}</div>
              <div>{product.name}</div>
              <div>${product.price}</div>
              <div>{product.quantity}</div>
              <div>{product.description}</div>
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