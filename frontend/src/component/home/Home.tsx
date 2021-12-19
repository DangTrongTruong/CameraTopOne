import React, { useEffect } from 'react'
import { CgMouse } from 'react-icons/all'
import "./Home.css"
import ProductCard from './ProductCard'
import {  useDispatch } from "react-redux"
import { useSelector } from 'react-redux'
import Loader from '../layout/loader/Loader'
import { getProductHome } from '../../slice/productSlice'
import {IProduct} from '../../model/Product'
import MetaData from '../layout/MetaData'

const Home: React.FC= () => {
  const dispatch = useDispatch()
  const {loading,products} = useSelector( (state:any) => state.productStore)
  useEffect(() => {
    dispatch(getProductHome())
  }, [dispatch])
  const productHotReview = products.filter( (item:IProduct) => item.numOfReviews > 2)
  return (
    <>
    {loading ? (<Loader/>) :(
      <>
      <MetaData title="Home"/>
      <div className="banner">
       
        <h1>Hello Camera-TopOne</h1>
      </div>

      <h2 className="homeHeading">Sản phẩm nổi bật</h2>

      <div className="container" id="container">
       {products && productHotReview.map( (product:IProduct,index:number) =>  <ProductCard key={index} product={product} />)}
      </div>
    </>
    )}
    
    
    </>
  )
}

export default Home
