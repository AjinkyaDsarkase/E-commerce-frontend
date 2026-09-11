import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from '../pages/Home'
import Cart from '../pages/Cart'
import Products from '../pages/Products'
import ProductDetails from '../pages/ProductDetails'
import Wishlist from '../pages/Wishlist'
import Checkout from '../pages/Checkout'
import Login from '../features/auth/Login'
import Register from '../features/auth/Register'
import Profile from '../pages/Profile'
import Orders from '../pages/Orders'
import OrderDetails from '../pages/OrderDetails'
import OrderSuccess from '../pages/OrderSuccess'
import NotFound from '../pages/NotFound'

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/products' element={<Products />}/>
      <Route path='/products/:id' element={<ProductDetails />}/>
      <Route path='/cart' element={<Cart />}/>
      <Route path='/wishlist' element={<Wishlist />}/>
      <Route path='/checkout' element={<Checkout/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/profile' element={<Profile />}/>
      <Route path='/orders' element={<Orders/>}/>
      <Route path='/orders/:id' element={<OrderDetails />} />
      <Route path='/order-success' element={<OrderSuccess />} />
      <Route path='*' element={<NotFound />} />
    </Routes>     
  )
}

export default AppRoutes
