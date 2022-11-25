import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import {getAllProductsThunk} from '../../store/product';
import "./Category.css";


const EquipmentCategory = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const products = useSelector(state => state.product.allProducts);
  const productsArr = Object.values(products);
  
  const equipmentProducts = productsArr.filter(product => product.category === "Equipment")

  useEffect(() => {
    dispatch(getAllProductsThunk())
  }, [dispatch]);

  if (Object.keys(equipmentProducts).length === 0) {
    return null;
  }


return (
    <div className="products_container">
        {equipmentProducts && equipmentProducts.map(product => {
          return (
            <>
            <NavLink key={product.id} to={`/products/${product.id}`}>
            <div>
            <img
                className="stories-image"
                src={product.image}
                alt=""
                />
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
}

export default EquipmentCategory;