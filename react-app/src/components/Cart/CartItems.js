import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import "./Cart.css";
import {getCartItemsThunk} from '../../store/cart';
import {getAllProductsThunk} from '../../store/product';

const GetCartItems = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const items = useSelector(state => state.cart);
  const itemsArr = Object.values(items);
  
  useEffect(() => {
    dispatch(getCartItemsThunk())
    dispatch(getAllProductsThunk())
  }, [dispatch, itemsArr.length]);

  if (Object.keys(itemsArr).length === 0) {
    return (
      <>
        <div className="empty-cart-container">
          <div className="empty-cart1">Your cart is empty.</div>
          <NavLink to={'/'}>
            <div className="empty-cart2">Discover something unique to fill it up</div>
          </NavLink>
        </div>
      </>
    )
  }

return (  
      <div className="products-container">
        {itemsArr && itemsArr.map((item) => {
          return (
            <>
              <NavLink key={item.product.id} to={`/products/${item.product.id}`}>
                <img
                  className="cart-image"
                  src={item.product.image}
                  alt=""
                  onError={e => {
                    e.currentTarget.src = "https://nckenya.com/wp-content/themes/consultix/images/no-image-found-360x260.png"
                    e.onerror=null;
                    }}
                />                  
                <div>{item.product.name}</div>
                <div>${item.product.price}</div>
                <div>{item.quantity}</div>
              </NavLink>
            </>
          )
        })}
      </div>
    )
}

export default GetCartItems;
