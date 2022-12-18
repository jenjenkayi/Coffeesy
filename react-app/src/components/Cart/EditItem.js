import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./CartItems.css";
import {editCartItemThunk} from '../../store/cart';

const EditItem = ({item}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {cartItemId} = useParams();

  const user = useSelector((state) => state.session.user);

  const [quantity, setQuantity] = useState(item?.quantity);
  const [errors, setErrors] = useState([]);

  const stock = item?.product?.quantity

  const quantities = []
  for (let i = 1; i <= stock; i++) {
    quantities.push(i)
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setErrors([]);  

     const data = {
        quantity, 
    };
    
    dispatch(editCartItemThunk(data, cartItemId))
    .then(() => {
        history.push(`/cart`);
    })
  }

  return (
    <>
    <section>
      <form className="edit-item-container" onSubmit={submitHandler}>
        <select
            className='edit-item-input'
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}>
            {quantities.map(quantity => (<option key={quantity} value={quantity}>{quantity}</option>))}
        </select>
      </form>
    </section>
     <div className="items-price">${(quantity * item?.product?.price).toFixed(2)}</div>
   </>
  );
}


export default EditItem;