import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import "./GetUsersProducts.css";
import { getAllProductsThunk, deleteProductThunk } from '../../store/product';

const GetUsersProducts = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const products = useSelector(state => state.product.allProducts);
  const productsArr = Object.values(products);
  const userProducts = productsArr.filter((product) => product.user_id === user.id);

  useEffect(() => {
    dispatch(getAllProductsThunk())
  }, [dispatch]);

  if (Object.keys(userProducts).length === 0) {
    return null;
  }

  const deleteProductHandler = (productId) => {
  dispatch(deleteProductThunk(productId));
  history.push("/");
  };

return (
    userProducts && (
        <div className="user-product-container">
          <div className="user-products-title">{user.firstName}'s Shop</div>
            {userProducts.map(product => {
                return (
                    <>
                  <div className="user-product-wrapper">
                  <NavLink key={product.id} to={`/products/${product.id}`}>
                    <div className="user-product-image">
                      <img
                        id="user-product-image"
                        src={product.image}
                        alt=""
                      />
                    </div>
                    <div className="user-product-info">
                      <div className="user-product-name">{product.name}</div>
                      <div className="user-product-rating-info">
                        <span className="user-product-avgRating">{product.avgRating}</span> <span className="products-reviewCount">({product.reviewCount})</span>
                      </div>
                      <div className="user-product-price">${product.price}</div>
                      <div className="user-product-description">{product.description}</div>
                    </div>
                    </NavLink>
                  </div>
                    <div className="user-product-buttons">
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
                  </>
                )
            })}
        </div>
    )
 )
}

export default GetUsersProducts;
