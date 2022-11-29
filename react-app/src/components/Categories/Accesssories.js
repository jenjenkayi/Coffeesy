import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import {getAllProductsThunk} from '../../store/product';
import "./Category.css";


const AccessoriesCategory = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const products = useSelector(state => state.product.allProducts);
  const productsArr = Object.values(products);
  
  const accessoriesProducts = productsArr.filter(product => product.category === "Accessories")
  
  useEffect(() => {
    dispatch(getAllProductsThunk())
  }, [dispatch]);

  if (Object.keys(accessoriesProducts).length === 0) {
    return null;
  }


return (
    <div className="products-container">
        {accessoriesProducts && accessoriesProducts.map(product => {
          return (
            <>
            <NavLink key={product.id} to={`/products/${product.id}`}>
            <div>
            <img
                className="products-image"
                src={product.image}
                alt=""
                />
            </div>
            <div className="products-info">
              <div className="products-name">{product.name}</div>
                <div className="products-rating-info">
                  <span className="products-avgRating">{product.avgRating}</span> <span className="products-reviewCount">({product.reviewCount})</span>
                </div>
                <div className="products-price">${product.price}</div>
              </div>
            </NavLink>
            </>
            
          )
        })}
    </div>
 )
}

export default AccessoriesCategory;