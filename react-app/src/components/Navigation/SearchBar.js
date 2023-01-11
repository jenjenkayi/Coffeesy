import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { getSearchProductsThunk, getAllProductsThunk } from '../../store/product'
import "./Navigation";

function SearchBar() {
  const dispatch = useDispatch();
  const history = useHistory();

  const products = useSelector(state => state.product.searchProducts);
  const productsArr = Object.values(products);

  const [keyword, setKeyword] = useState('');
  const [showDropdown, setShowDropdown] = useState(false)
  const [result, setResult] = useState([])

  const results = keyword => {
    let res = []

    for (let i = 0; i < productsArr.length; i++) {
      let product = productsArr[i]
      keyword = keyword.toLowerCase()
      
      if (product.name.toLowerCase().includes(keyword) || 
          product.category.toLowerCase().includes(keyword) || 
          product.description.toLowerCase().includes(keyword)) {
          res.push(product)
      }
    }
    return res
  }

  useEffect(() => {
    if (keyword.length) {
      setShowDropdown(true)
      setResult(results(keyword))
    } else {
      setShowDropdown(false)
      setResult([])
    }
  }, [keyword])

  const submitHandler = async (e) => {
    e.preventDefault();

  dispatch(getAllProductsThunk())  
  dispatch(getSearchProductsThunk(keyword)).then(() => {
    history.push(`/products/search/${keyword}`);
    });

  }

return (
  <>
    <form className="search-bar-form-container" onSubmit={submitHandler}>
        <input
            className='search-bar-form-input'
            type="text"
            placeholder='Search for anything'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
        />
        <button className="search-bar-form-button">
            <i className="fa-solid fa-magnifying-glass fa-xl"></i>
        </button>
    </form>

    <div className="searchbar-dropdown">
      {result.length > 0 && showDropdown && 
      <div>{result.map(product => {
        return (
            <NavLink key={product.id} to={`/products/${product.id}`} onClick={()=>setKeyword("")}>
            <div className='searchbar-results'>
            <img 
            className="searchbar-product-img"
            src={product.image}
            alt=""
            />
            <div className="searchbar-product-info">
            <div>{product.name}</div>
            <div>${product.price}</div>        
            </div>
            </div>
            </NavLink>
        )
      })}
    </div>}
    </div>

    {!result.length && showDropdown &&  
      <div className="searchbar-dropdown">We couldn't find any results for '{keyword}'</div>}
  </>
  )
}

export default SearchBar;