import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import "./CartItems.css";
import {getCartItemsThunk, deleteCartItemThunk} from '../../store/cart';
import {getAllProductsThunk} from '../../store/product';
import EditItem from "./EditItem";
import CheckoutCart from './CheckoutCart';

const GetCartItems = ({item}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const items = useSelector(state => state.cart);
  const itemsArr = Object.values(items);
  const [sum, setSum] = useState(item?.quantity * item?.product?.price)

  useEffect(() => {
    let total = 0;
    if (itemsArr) {
      for (let i=0; i < itemsArr.length; i++) {
        total += itemsArr[i]?.quantity * itemsArr[i]?.product?.price
        setSum(total)
      }
    }
  }, [itemsArr])

  useEffect(() => {
    dispatch(getCartItemsThunk())
    dispatch(getAllProductsThunk())
  }, [dispatch]);

  const deleteItemHandler = (cartItemId) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      dispatch(deleteCartItemThunk(cartItemId))
    }
    dispatch(getCartItemsThunk())
    history.push("/cart");
  };

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
  <>
    <div className="cart-title">{itemsArr.length} Item(s) in your cart</div>
      <div className="cart-container">
        <div className="items-wrapper">
          {itemsArr && itemsArr.map((item) => {
            return (
              <>
              <div className="items-container">
                    <NavLink key={item?.product?.id} to={`/products/${item?.product?.id}`}>
                      <img
                        className="items-image"
                        src={item?.product?.image}
                        alt=""
                        onError={e => {
                          e.currentTarget.src = "https://nckenya.com/wp-content/themes/consultix/images/no-image-found-360x260.png"
                          e.onerror=null;
                        }}
                        />  
                    </NavLink>
                    <div className="items-info-container">            
                      <NavLink key={item?.product?.id} to={`/products/${item?.product?.id}`}>    
                        <div>{item?.product?.name}</div>
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
                        <EditItem item={item} sum={sum} />
                    </div>
              </>
            )
          })}
        </div>
        <CheckoutCart sum={sum} />
      </div>
    </>
  )
}

export default GetCartItems;
