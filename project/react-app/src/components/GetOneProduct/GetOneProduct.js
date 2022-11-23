import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import "./GetOneProduct.css";
import {getOneProductThunk} from '../../store/product';
import GetProductReviews from '../GetProductReviews/GetProductReviews'

const GetOneProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {productId} = useParams();

  const product = useSelector(state => state.product.singleProduct);
  const productArr = Object.values(product);

  useEffect(() => {
    dispatch(getOneProductThunk(productId))
  }, [dispatch, productId]);

  if (Object.keys(productArr).length === 0) {
    return null;
  }

return ( 
        <>
        <div className="product-container">
            <div>{product.image}</div>
            <div>
            <img className="product-image" src="https://cdn.pixabay.com/photo/2017/06/02/11/49/still-life-2366084__340.jpg" alt="default"/>
            </div>
            <div>{product.avgRating}</div>
            <div>{product.reviewCount}</div>
            <div>{product.name}</div>
            <div>${product.price}</div>
            <div>{product.quantity}</div>
            <div>{product.description}</div>
        </div>
       
            <div>
                <GetProductReviews />
            </div>
        </>
    )
}


export default GetOneProduct;