import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getSearchProductsThunk } from '../../store/product'
import "./SearchProduct.css";

const SearchProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const products = useSelector(state => state.product.searchProducts);
  const productsArr = Object.values(products);

  useEffect(() => {
    dispatch(getSearchProductsThunk())
  }, [dispatch]);


return (
    <h1>Search Product</h1>
)

}

export default SearchProduct;
