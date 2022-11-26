import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../LoginFormModal';
import './Navigation.css';
import Coffeesy from '../../assets/Coffeesy.png';

function Navigation({ isLoaded }){
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
          
        {/* {sessionUser && <button type="button" className='nav_host_button' 
            onClick={() => history.push("/createSpot")}>
            Become a Host
          </button>} */}
            {isLoaded && sessionLinks}
      </div>
  );
}

export default Navigation;