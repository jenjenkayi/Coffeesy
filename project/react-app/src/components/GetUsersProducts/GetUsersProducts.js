import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import "./GetUsersProducts.css";
import { getUsersProductsThunk } from '../../store/product';

const GetUsersProducts = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const userId = user.id
  const products = useSelector(state => state.product.allProducts);
  const productsArr = Object.values(products);
  
  console.log("productsArr-------", productsArr)
  
  useEffect(() => {
    dispatch(getUsersProductsThunk(userId))
  }, [dispatch, userId]);

  if (Object.keys(productsArr).length === 0) {
    return null;
  }


return (
    productsArr && (
        <div className="products-container">
            {productsArr.map((product) => {
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
                    </>
                )
            })}
        </div>
    )
 )
}

export default GetUsersProducts;
