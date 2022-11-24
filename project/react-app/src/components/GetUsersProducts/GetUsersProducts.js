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
        <div className="products-container">
            {userProducts.map(product => {
                return (
                    <>
                    {/* <div>{product.image} */}
                    <NavLink key={product.id} to={`/products/${product.id}`}>
                    <div>
                    <img className="products-image" src="https://cdn.pixabay.com/photo/2017/06/02/11/49/still-life-2366084__340.jpg" alt="default"/>
                    </div>
                    <div>{product.name}</div>
                    <div>{product.avgRating}</div>
                    <div>{product.reviewCount}</div>
                    <div>${product.price}</div>
                    </NavLink>
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
                    </>
                )
            })}
        </div>
    )
 )
}

export default GetUsersProducts;
