import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import Coffeesy from '../../assets/Coffeesy.png';

function Navigation({ loaded }){
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();

  let sessionLinks;

  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  return (
     <div className='nav-wrapper'>
        <img
          className='nav-logo'
          src={Coffeesy}
          alt=""
          onClick={() => history.push('/')}
          >
          </img>
         <button type="button" className='nav-create-product-button' 
            onClick={() => history.push("/products/new")}>
            <i className="fa-solid fa-store fa-xl"></i>
          </button>
          {loaded && sessionLinks}
      </div>
  );
}

export default Navigation;