import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import "./GetAllProducts.css";
import {getAllProductsThunk} from '../../store/product';

const GetAllProducts = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const products = useSelector(state => state.product.allProducts);
  const productsArr = Object.values(products);

  useEffect(() => {
    dispatch(getAllProductsThunk())
  }, [dispatch]);

  if (Object.keys(productsArr).length === 0) {
    return null;
  }


return (
  <>
  <div className="background"></div>
  {user && 
    <h1>Welcome back, {user.firstName}!</h1>}
      <div className="category-container">
        <NavLink to='/accessories'>
          <img
            src="https://i.etsystatic.com/10385964/c/2484/1974/0/424/il/e0b9fe/2992396185/il_680x540.2992396185_82qj.jpg"
            alt=""
            className="category-img"
          />
        </NavLink>
        <div className="category-name">Accessories</div>
        <NavLink to='/wholebeans'>
          <img
            src="https://cdn.pixabay.com/photo/2016/03/30/21/59/coffee-beans-1291656__480.jpg"
            alt=""
            className="category-img"
          />
        </NavLink>
        <div className="category-name">Whole Beans</div>
        <NavLink to='/groundcoffee'>
          <img
            src="https://cdn.pixabay.com/photo/2017/01/25/05/40/coffee-2007143__480.jpg"
            alt=""
            className="category-img"
          />
        </NavLink>
        <div className="category-name">Ground Coffee</div>
        <NavLink to='/pods'>
          <img
            src="https://i.etsystatic.com/16336237/c/2353/1870/301/30/il/511af0/3363095094/il_680x540.3363095094_pms0.jpg"
            alt=""
            className="category-img"
          />
        </NavLink>
        <div className="category-name">Pods</div>
        <NavLink to='/drinkware'>
          <img
            src="https://cdn.pixabay.com/photo/2017/03/27/14/18/coffee-2179028__480.jpg"
            alt=""
            className="category-img"
          />
        </NavLink>
        <div className="category-name">Drinkware</div>
        <NavLink to='/equipment'>
          <img
            src="https://cdn.pixabay.com/photo/2017/03/12/21/31/coffee-grinder-2138170__480.jpg"
            alt=""
            className="category-img"
          />
        </NavLink>
        <div className="category-name">Equipment</div>
      </div>
  
        <div className="products-container">
            {productsArr && productsArr.map((product) => {
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
                    <div>{product.name}</div>
                    <div>{product.avgRating}</div>
                    <div>{product.reviewCount}</div>
                    <div>${product.price}</div>
                    </NavLink>
                    </>
                )
            })}
        </div>
      </>
    )
}

export default GetAllProducts;
