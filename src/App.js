import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import TopMenu from './pages/TopMenu';
import Products from './components/Products';
import Cart from "./components/Cart";
import EditProduct from './components/Edit';
import NoMatch from './components/NoMatch';
import Add from './components/Add';
import { CartProvider } from './contexts/Cart';
import  { ProductsProvider } from './contexts/Products';

class App extends Component {
  render() {
    return (
      <ProductsProvider>
        <CartProvider>
          <Router>
            <TopMenu />

            <Switch>
              <Route path="/products" component={ Products } />
              <Route path="/cart" component={ Cart } />
              <Route path="/edit/:id" component={ EditProduct } />
              <Route path="/add" component={ Add } />
              <Redirect from="/home" to="/products" />
              <Redirect from="/" to="/home" />
              <Route component={ NoMatch } />
            </Switch>
          </Router>
        </CartProvider>
      </ProductsProvider>
    );
  }
}

export default App;
