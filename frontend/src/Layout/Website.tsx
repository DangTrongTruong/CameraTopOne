import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet } from "react-router-dom";
import Footer from '../component/layout/footer/Footer';
import Header from '../component/layout/header/Header';
const Website:React.FC = () => {
  return (
    <div>
        <Header/>
        <Outlet />
        <Footer/>
    </div>
  )
}

export default Website
