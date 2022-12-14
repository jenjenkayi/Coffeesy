import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './Navigation.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [showMenu, setShowMenu] = useState(false);
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  return (
    <>
    <div className="nav-right">
     {user && 
     <button type="button" className='nav-create-product-button' 
        onClick={() => history.push("/products/new")}>
        <i className="fa-solid fa-store fa-xl"></i>
        <span className="hover-text">Shop Manager</span>
      </button>}
      <button type="button" className="nav-cart"
        onClick={() => history.push("/cart")}>
        <i className="fa-solid fa-cart-shopping fa-xl"></i>
        <span className="hover-text">Cart</span>
      </button>
    {user && 
    <div className="dropdown-menu">
      <button className="profile-button" onClick={openMenu}>
        <i className="fas fa-user-circle fa-2xl" />
        <span className="hover-text">Your account</span>
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <div className="dropdown-user">        
            <i className="fa-solid fa-circle-user fa-xl"></i>
            {user.username}
          </div>
          <button className="dropdown-button"
            onClick={() => history.push('/products/current')}>
            <i className="fa-regular fa-rectangle-list fa-xl"></i>
            Manage Listings
          </button>
          <button className="dropdown-button"
            onClick={() => history.push('/reviews/current')}>
            <i className="fa-regular fa-pen-to-square fa-xl"></i>
            Manage Reviews
          </button>
          <button className="dropdown-button" onClick={logout}
          >
            <i class="fa-solid fa-arrow-right-from-bracket fa-xl"></i>
            Sign Out
          </button>
        </ul>
      )}
    </div>
    }
  </div>
</>
);
}

export default ProfileButton;