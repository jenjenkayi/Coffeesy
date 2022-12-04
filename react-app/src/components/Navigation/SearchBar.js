import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getSearchProductsThunk } from '../../store/product'
import "./Navigation";

function SearchBar() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [keyword, setKeyword] = useState('');
 
  const submitHandler = async (e) => {
    e.preventDefault();

  dispatch(getSearchProductsThunk(keyword)).then(() => {
    history.push(`/products/search/${keyword}`);
    });

    setKeyword("")
  }

return (
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
)

}

export default SearchBar;