import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import { authenticate } from './store/session';
import CreateProduct from './components/CreateProduct/CreateProduct';
import EditProduct from './components/EditProduct/EditProduct';
import GetOneProduct from './components/GetOneProduct/GetOneProduct';
import GetAllProducts from './components/GetAllProducts/GetAllProducts';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        {/* <Route path='/users/:userId' exact={true} >
          <User />
        </Route> */}
        <Route path="/products/:productId">
          <GetOneProduct />
        </Route>
        <Route path="/products/new">
          <CreateProduct />
        </Route>
        <Route path="/products/:productId/edit">
          <EditProduct />
        </Route>
        <Route path='/'>
          <GetAllProducts />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
