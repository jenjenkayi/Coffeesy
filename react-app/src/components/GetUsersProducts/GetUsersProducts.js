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

  const deleteProductHandler = (productId) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      dispatch(deleteProductThunk(productId));
    }
    history.push("/");
  };

return (
  <>
    <div className="background"></div>
    <div className="user-products-title">{user.firstName}'s Shop</div>
    {!userProducts.length && <div className="user-no-product">There is no listing yet.</div>}
    {userProducts && (
        <div className="user-product-container">
            {userProducts.map(product => {
                return (
                  <>
                  <div className="user-product-wrapper">
                    <NavLink key={product.id} to={`/products/${product.id}`}>
                      <div className="user-product-wrapper2">
                        <img
                          className="user-product-image"
                          src={product.image}
                          alt=""
                          onError={e => {
                          e.currentTarget.src = "https://nckenya.com/wp-content/themes/consultix/images/no-image-found-360x260.png"
                          e.onerror=null;
                        }}
                        />
                        <div className="user-product-info">
                          <div className="user-product-name">{product.name}</div>
                          <div className="user-product-rating-info">
                            <span className="user-product-avgRating">{product.avgRating}</span> <span className="products-reviewCount">({product.reviewCount})</span>
                          </div>
                        <div className="user-product-price">${product.price}</div>
                        <div className="user-product-description">{product.description}</div>
                        </div>
                      </div>
                    </NavLink>
                    
                    <div className="user-product-buttons">
                      {user && user.id === product.user_id && (
                        <button
                        className="edit-user-product-button"
                        onClick={() => history.push(`/products/${product.id}/edit`)}>
                          Edit Listing
                        </button>
                      )}
                      {user && user.id === product.user_id && (
                        <button
                        className="delete-user-product-button"
                        onClick={() => deleteProductHandler(product.id)}>
                          Delete Listing
                        </button>
                      )}
                      </div>
                    </div>
                  </>
                )
            })}
        </div>
      )}
  </>
 )
}

export default GetUsersProducts;
