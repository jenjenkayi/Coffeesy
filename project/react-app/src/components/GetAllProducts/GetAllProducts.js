import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import "./GetAllProducts.css";
import {getAllProductsThunk} from '../../store/product';

const GetAllProducts = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const products = useSelector(state => state.product.allProducts);
  const productsArr = Object.values(products);

  useEffect(() => {
    dispatch(getAllProductsThunk())
  }, [dispatch]);

  if (Object.keys(productsArr).length === 0) {
    return null;
  }


return (
    <h1>All Products</h1>
 )
}

export default GetAllProducts;
