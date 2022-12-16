import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import "./CartItems.css";
import {getCartItemsThunk, deleteCartItemThunk, deleteCartThunk} from '../../store/cart';
import {getAllProductsThunk} from '../../store/product';
import EditItem from "./EditItem";

const GetCartItems = ({item}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {cartItemId} = useParams();

  const user = useSelector((state) => state.session.user);
  const items = useSelector(state => state.cart);
  const itemsArr = Object.values(items);

  function totalPrice() {
    let total = [];
    if (items) {
      for (let i = 0; i < items.length; i++) {
        let sum = item.quantity * item.product.price
        total.push(sum)
      }
    }
    console.log(items)
    return total;
  }


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


  const deleteItemHandler = (cartItemId) => {
    dispatch(deleteCartItemThunk(cartItemId))
    dispatch(getCartItemsThunk())
    history.push("/cart");
  };

  const deleteCartHandler = () => {
    dispatch(deleteCartThunk())
    history.push("/cart");
  };

return (  
  <>
    <div className="cart-title">{itemsArr.length} Item(s) in your cart</div>
      <div className="cart-container">
        <div className="items-wrapper">
          {itemsArr && itemsArr.map((item) => {
            return (
              <>
              <div className="items-container">
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
                    <div className="items-info-container">            
                      <NavLink key={item.product.id} to={`/products/${item.product.id}`}>    
                        <div>{item.product.name}</div>
                      </NavLink>
                      {user && user.id === item.user_id && (
                        <button
                          className="cart-remove-button"
                          onClick={() => deleteItemHandler(item.id)}
                          >
                          Remove
                        </button>
                      )}
                    </div>
                        <EditItem item={item} />
                    </div>
              </>
            )
          })}
        </div>
        <div className="payment-container">
          <div>Item(s) total</div>
          <div>{totalPrice()}</div>
          <div>Sales Tax</div>
          <div className="payment-shipping">
            <span>Shipping</span>
            <span>FREE</span>
          </div>
          <button className="payment-button" 
          onClick={() => deleteCartHandler()}
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </>
  )
}

export default GetCartItems;
