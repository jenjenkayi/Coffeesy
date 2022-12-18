import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./CartItems.css";
import {editCartItemThunk} from '../../store/cart';

const EditItem = ({item}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {cartItemId} = useParams();

  const [quantity, setQuantity] = useState(item?.quantity);
  const stock = item?.product?.quantity
  
  useEffect(() => {
    setQuantity(item.quantity)
  }, [item.quantity])
  
  const quantities = []
  for (let i = 1; i <= stock; i++) {
    quantities.push(i)
  }
  
  const submitHandler = async () => {    
    dispatch(editCartItemThunk(Number(quantity), Number(item.id)))
    // setQuantity(e.target.value)
    // .then(() => {
    //     history.push(`/cart`);
    // })
  }

  return (
    <>
    <section>
      <form className="edit-item-container" >
        <select
            className='edit-item-input'
            type="number"
            value={quantity}
            // onChange={(e) => submitHandler(e.target.value)}
            onChange={(e)=> setQuantity(e.target.value)}
            onBlur={()=>  submitHandler()}
          >
            {quantities.map(quantity => (<option key={quantity} value={quantity}>{quantity}</option>))}
        </select>
      </form>
    </section>
    <div className="items-price">${(quantity * item?.product?.price).toFixed(2)}
      {quantity > 1 && <span className='item-price'>(${(item.product.price).toFixed(2)} each)</span>}
    </div>
   </>
  );
}


export default EditItem;