import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {getAllProductsThunk} from '../../store/product';
import "./Category.css";


const EquipmentCategory = () => {
  const dispatch = useDispatch();

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