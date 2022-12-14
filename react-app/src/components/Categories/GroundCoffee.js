import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  NavLink } from "react-router-dom";
import {getAllProductsThunk} from '../../store/product';
import "./Category.css";


const GroundCoffeeCategory = () => {
  const dispatch = useDispatch();

  const products = useSelector(state => state.product.allProducts);
  const productsArr = Object.values(products);
  
  const groundCoffeeProducts = productsArr.filter(product => product.category === "Ground Coffee")

  useEffect(() => {
    dispatch(getAllProductsThunk())
  }, [dispatch]);

  if (Object.keys(groundCoffeeProducts).length === 0) {
    return null;
  }


return (
  <>
    <div className="background"></div>
    <div className="category-title">
      <div className="title1">Ground Coffee</div>
      <div className="title2">Find something you love</div>
    </div>
    <div className="products-container">
        {groundCoffeeProducts && groundCoffeeProducts.map(product => {
          return (
            <>
            <NavLink key={product.id} to={`/products/${product.id}`}>
            <div>
            <img
                className="products-image"
                src={product.image}
                alt=""
                onError={e => {
                          e.currentTarget.src = "https://nckenya.com/wp-content/themes/consultix/images/no-image-found-360x260.png"
                          e.onerror=null;
                        }}
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

export default GroundCoffeeCategory;