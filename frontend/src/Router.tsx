import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router'
import Dashboard from './admin/Dashboard'
import NewProduct from './admin/NewProduct'
import ProductList from './admin/ProductList'
import UpdateProduct from './admin/UpdateProduct'
import About from './component/about/About'
import Cart from './component/cart/Cart'
import ConfirmOrder from './component/cart/ConfirmOrder'
import Shipping from './component/cart/Shipping'
import Home from './component/home/Home'
import ProductDetails from './component/product/ProductDetails'
import Products from './component/product/Products'
import Search from './component/product/Search'
import ForgotPassword from './component/user/ForgotPassword'
import LoginSignUp from './component/user/LoginSignUp'
import Profile from './component/user/Profile'
import ResetPassword from './component/user/ResetPassword'
import UpdatePassword from './component/user/UpdatePassword'
import UpdateProfile from './component/user/UpdateProfile'
import Admin from './Layout/Admin'
import Website from './Layout/Website'
import ListUser from './admin/ListUser'
import UpdateUser from './admin/UpdateUser'
import ListReviews from './admin/ListReviews'
import MyOrder from './component/cart/MyOrder'
import ListOrder from './admin/ListOrder'
import OrderDetail from './admin/OrderDetail'


const Router = () => {
    const {user} = useSelector( (state:any) => state.authStore)
  return (
    <div>
    <Routes>
      <Route path="/" element={<Website />}>
      <Route path="/" element={<Home/>} />
         <Route path="/products/:keyword"  element={<Products/>} />
         <Route path="/products"  element={<Products/>} />
         <Route path="/product/:id"  element={<ProductDetails/>} />
         <Route path="/search"  element={<Search/>} />
         <Route path="/login"  element={<LoginSignUp/>} />
         <Route path="/about"  element={<About/>} />
         <Route path="/me/update"  element={<UpdateProfile/>} />
         <Route path="/password/update"  element={<UpdatePassword/>} />
         <Route path="/password/forgot"  element={<ForgotPassword/>} />
         <Route path="/password/reset/:token"  element={<ResetPassword/>} />
         <Route path="/account"  element={<Profile user={user}/>} />
         <Route path="/cart"  element={<Cart/>} />
         <Route path="/shipping"  element={<Shipping/>} />
         <Route path="/order/confirm"  element={<ConfirmOrder/>} />
         <Route path="/orders"  element={<MyOrder/>} />
      </Route>

      <Route path="/admin" element={<Admin/>}>
        <Route index  element={<Dashboard/>} />
        <Route path="/admin/products"  element={<ProductList/>} />
        <Route path="/admin/product"  element={<NewProduct/>} />
        <Route path="/admin/product/:id"  element={<UpdateProduct/>} />
        <Route path="/admin/users"  element={<ListUser/>} />
        <Route path="/admin/users/:id"  element={<UpdateUser/>} />
        <Route path="/admin/review/:id"  element={<ListReviews/>} />
        <Route path="/admin/order"  element={<ListOrder/>} />
        <Route path="/admin/order/detail/:id"  element={<OrderDetail/>} />
      </Route>
    </Routes>
  </div>
  )
}

export default Router
