import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticate } from './store/session';
import { Modal } from './context/Modal';
import CreateProduct from './components/CreateProduct/CreateProduct';
import EditProduct from './components/EditProduct/EditProduct';
import GetOneProduct from './components/GetOneProduct/GetOneProduct';
import GetAllProducts from './components/GetAllProducts/GetAllProducts';
import GetUsersProducts from './components/GetUsersProducts/GetUsersProducts';
import CreateReview from './components/CreateReview/CreateReview';
import GetUsersReviews from './components/GetUsersReviews/GetUsersReviews';
import EditReview from './components/EditReview/EditReview';
import Accessories from './components/Categories/Accesssories';
import WholeBeans from './components/Categories/WholeBeans';
import GroundCoffee from './components/Categories/GroundCoffee';
import Pods from './components/Categories/Pods';
import Drinkware from './components/Categories/Drinkware';
import Equipment from './components/Categories/Equipment';
import Navigation from './components/Navigation/Navigation';
import SignupForm from './components/SignupFormModal';
import LoginForm from './components/LoginFormModal';
import Footer from './components/Footer/Footer';
import SearchProduct from './components/SearchProduct/SearchProduct';
import CartItems from './components/Cart/CartItems';

function App() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) return null;
  

  return (
     <BrowserRouter>
      <Navigation loaded={loaded}/>
        <Switch>
          <Route path="/signup">
            <SignupForm />
          </Route>
          <Route path='/login'>
            <LoginForm />
          </Route>
          <Route path="/products/new">
            <CreateProduct />
          </Route>
          <Route path="/reviews/:reviewId/edit">
            <EditReview />
          </Route>
          <Route path='/products/current'>
            <GetUsersProducts />
          </Route>
          <Route path="/products/:productId/edit">
            <EditProduct />
          </Route>
          <Route path='/reviews/current'>
            <GetUsersReviews />
          </Route>
          <Route path='/products/:productId/new-review'>
            <CreateReview />
          </Route>
          <Route path="/accessories">
            <Accessories />
          </Route>
          <Route path="/wholebeans">
            <WholeBeans />
          </Route>
          <Route path="/groundcoffee">
            <GroundCoffee />
          </Route>
          <Route path="/pods">
            <Pods />
          </Route>
          <Route path="/drinkware">
            <Drinkware />
          </Route>
          <Route path="/equipment">
            <Equipment />
          </Route>
          <Route path='/products/search/:keyword'>
            <SearchProduct />
          </Route>
          <Route path="/products/:productId">
            <GetOneProduct />
          </Route>
          <Route path='/cart'>
            <CartItems />
          </Route>
          <Route path='/'>
            <GetAllProducts />
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter>
  );
}

export default App;
