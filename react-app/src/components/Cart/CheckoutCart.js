import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./CartItems.css";
import {deleteCartThunk} from '../../store/cart';

const CheckOutCart = ({sum}) => {
  const dispatch = useDispatch();
  const history = useHistory();

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
