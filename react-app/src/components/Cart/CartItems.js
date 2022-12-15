import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import "./Cart.css";
import {getCartItemsThunk} from '../../store/cart';
import {getAllProductsThunk} from '../../store/product';
import AddItem from "./EditItem";

const GetCartItems = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const cartItems = useSelector(state => state.cart);
  const cartItemsArr = Object.values(cartItems);
  console.log('cartItems------', cartItems)
  
  useEffect(() => {
    dispatch(getCartItemsThunk())
    dispatch(getAllProductsThunk())
  }, [dispatch, cartItemsArr.length]);

  if (Object.keys(cartItemsArr).length === 0) {
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
        {cartItemsArr && cartItemsArr.map((cartItem) => {
          return (
            <>
            <NavLink key={cartItem.product.id} to={`/products/${cartItem.product.id}`}>
            <div>
            <img
                className="products-image"
                src={cartItem.product.image}
                alt=""
                onError={e => {
                  e.currentTarget.src = "https://nckenya.com/wp-content/themes/consultix/images/no-image-found-360x260.png"
                  e.onerror=null;
                }}
              />
            </div>
            <div className="products-name">{cartItem.quantity}</div>
            <div className="products-price">${(cartItem.product.price).toFixed(2)}</div>
            </NavLink>
            <AddItem cartItem={cartItem} />
            </>
          )
        })}
      </div>
    )
}

export default GetCartItems;
