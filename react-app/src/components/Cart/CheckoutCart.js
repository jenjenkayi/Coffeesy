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

  const itemsTotal = Number(sum).toFixed(2)
  const salesTax = Number(sum * 0.0725).toFixed(2)
  const subTotal = (Number(itemsTotal) + Number(salesTax)).toFixed(2)

  const deleteCartHandler = () => {
    dispatch(deleteCartThunk())
    history.push("/cart");
  };

return (  
    <>
        <div className="payment-container">
          <div className="payment-info">
            <div>Item(s) total</div>
            <div>${itemsTotal}</div>
          </div>
          <div className="payment-info-tax">
            <div>Sales Tax</div>
            <div>${salesTax}</div>
          </div>
          <div className="payment-info">
            <div>Shipping</div>
            <div>FREE</div>
          </div>
          <div className="payment-info-total">
            <div>Subtotal</div>
            <div>${subTotal}</div>
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
