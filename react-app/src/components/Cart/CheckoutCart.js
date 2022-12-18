import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import "./CartItems.css";
import {getCartItemsThunk, deleteCartItemThunk, deleteCartThunk} from '../../store/cart';
import {getAllProductsThunk} from '../../store/product';
import EditItem from "./EditItem";
import CheckoutCart from './CheckoutCart';

const CheckOutCart = ({sum}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const items = useSelector(state => state.cart);
  const itemsArr = Object.values(items);

  const itemsTotal = sum
  const salesTax = sum * 0.0895
  const subTotal = itemsTotal + salesTax

  const deleteCartHandler = () => {
    dispatch(deleteCartThunk())
    history.push("/cart");
  };

return (  
    <>
        <div className="payment-container">
          <div>Item(s) total {itemsTotal}</div>
          <div>Sales Tax {salesTax}</div>
          <div>Subtotal {subTotal}</div>
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
    </>
  )
}

export default CheckOutCart;
