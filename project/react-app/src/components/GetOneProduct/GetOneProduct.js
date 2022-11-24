import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import "./GetOneProduct.css";
import {deleteProductThunk, getOneProductThunk} from '../../store/product';
import GetProductReviews from '../GetProductReviews/GetProductReviews'

const GetOneProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {productId} = useParams();

  const user = useSelector((state) => state.session.user);
  const product = useSelector(state => state.product.singleProduct);
  const productArr = Object.values(product);

  const reviews = useSelector(state => state.review.allReviews);
  const userReview = Object.values(reviews).filter(review => review.user_id === user.id)

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
                            history.push(`/story/${product.id}/edit`)
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
            {!userReview.length && user && <NavLink to={`/products/${productId}/new-review`}>
            <button 
              type="submit"
              className="one_spot_create_review_button"
              >Create a Review
            </button>
            </NavLink>}
        </>
    )
}


export default GetOneProduct;