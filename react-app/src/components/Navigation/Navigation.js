import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import logo from '../../assets/logo.png';
import SearchBar from './SearchBar';

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
          src={logo}
          alt=""
          onClick={() => history.push('/')}
          >
          </img>
          <div className='search-bar'>
            <SearchBar />
          </div>
          {loaded && sessionLinks}
      </div>
  );
}

export default Navigation;