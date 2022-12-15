import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import "./Cart.css";
import {addCartItemThunk} from '../../store/cart';

const EditItem = ({cartItem}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {productId} = useParams();

  const user = useSelector((state) => state.session.user);

  const [quantity, setQuantity] = useState(cartItem.quantity);
  const [errors, setErrors] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();
      
    let cartItems = {quantity}
      
    if (!cartItems.quantity) return setErrors(["Review field can not be empty"]);
 
      const data = { 
        user_id: user.id,
        productId: productId,
        quantity, 
      }
    
    setErrors([]);  
    dispatch(addCartItemThunk(data))
    .then(() => {
        history.push(`/cart`);
    })
    }

  return (
    <section>
      <form className="AddItem-Container" onSubmit={submitHandler}>
        <ul className="errors">
          {errors.length > 0 &&
          errors.map((error) => <li key={error}>{error}</li>)}
        </ul>
        <label className='AddItem-Label'>
          Quantity
        <input
            className='AddItem-Input'
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)} 
        />
        </label>
        <button type="submit" className='AddItem-Submit-Button'>Add to cart</button>
      </form>
    </section>
  );
}


export default EditItem;