import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import "./CartItems.css";
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
      <div className="cart-container">
        <div className="cart-title">{itemsArr.length} Item(s) in your cart</div>
        {itemsArr && itemsArr.map((item) => {
          return (
            <>
            <div className="items-container">
                <div className="items-image-container">           
                  <NavLink key={item.product.id} to={`/products/${item.product.id}`}>
                    <img
                      className="items-image"
                      src={item.product.image}
                      alt=""
                      onError={e => {
                        e.currentTarget.src = "https://nckenya.com/wp-content/themes/consultix/images/no-image-found-360x260.png"
                        e.onerror=null;
                        }}
                    />  
                  </NavLink>
                </div>
                  <div className="items-info-container">            
                    <NavLink key={item.product.id} to={`/products/${item.product.id}`}>    
                      <div>{item.product.name}</div>
                      <div>{item.quantity}</div>
                      <div>${item.product.price}</div>
                    </NavLink>
                  </div>
                <div className="payment-container">
                    <div>${item.product.price}</div>
                </div>
            </div>
            </>
          )
        })}
      </div>
    )
}

export default GetCartItems;
