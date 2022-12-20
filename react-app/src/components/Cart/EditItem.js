import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {editCartItemThunk} from '../../store/cart';
import "./CartItems.css";

const EditItem = ({item}) => {
  const dispatch = useDispatch();
 
  const [quantity, setQuantity] = useState(item?.quantity);
  const stock = item?.product?.quantity

  const quantities = []
  for (let i = 1; i <= stock; i++) {
    quantities.push(i)
  }
  
   const updateItem = (quantity) => {    
    setQuantity(quantity)
    dispatch(editCartItemThunk(quantity, item?.id))
  }

  return (
    <>
    <section>
      <form className="edit-item-container" >
        <select
            className='edit-item-input'
            type="number"
            value={quantity}
            onChange={(e)=> updateItem(e.target.value)}
          >
            {quantities.map(quantity => (<option key={quantity} value={quantity}>{quantity}</option>))}
        </select>
      </form>
    </section>
    <div className="items-price">${(quantity * item?.product?.price).toFixed(2)}
      {quantity > 1 && <span className='item-price'>(${(item?.product?.price)?.toFixed(2)} each)</span>}
    </div>
   </>
  );
}


export default EditItem;