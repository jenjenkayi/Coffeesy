import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  NavLink } from "react-router-dom";
import {getAllProductsThunk} from '../../store/product';
import "./Category.css";


const WholeBeansCategory = () => {
  const dispatch = useDispatch();

  const products = useSelector(state => state.product.allProducts);
  const productsArr = Object.values(products);
  
  const wholeBeanProducts = productsArr.filter(product => product.category === "Whole Beans")

  useEffect(() => {
    dispatch(getAllProductsThunk())
  }, [dispatch]);

  if (Object.keys(wholeBeanProducts).length === 0) {
    return null;
  }


return (
  <>
    <div className="background"></div>
    <div className="category-title">
      <div className="title1">Whole Beans</div>
      <div className="title2">Find something you love</div>
    </div>
    <div className="products-container">
        {wholeBeanProducts && wholeBeanProducts.map(product => {
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
  </>
 )
}

export default WholeBeansCategory;