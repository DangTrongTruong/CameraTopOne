import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import './ListUser.css'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../component/layout/loader/Loader'
import {  useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { getAllReviews } from '../slice/productDetailSlice'
const ListReviews:React.FC = () => {
    const {id} = useParams();
    const dispatch = useDispatch()
    const {reviews,loading} = useSelector((state:any) => state.productDetailStore)
  useEffect(() => {
    dispatch(getAllReviews(id))
  }, [dispatch])

  
  return (
    <div className="productListContainer">
        <Sidebar/>
       {loading ? <Loader/> :(
            <div className="productList">
            <h1>Product List</h1>
        <table>
       
        <thead>
          <tr>
            <th>Name</th>
            <th>Rating</th>
            <th>Comment</th>
          </tr>
         
        </thead>
       
        <tbody>
        {reviews && reviews.map( (item:any,index:number) =>(
          <tr key={index}>
          <td>{item.name}</td>
          <td>{item.rating}</td>
          <td>{item.comment}</td>
        </tr>
        ))}
          
        </tbody>
      </table>
        </div>
       )}
        <ToastContainer />
    </div>
  )
}

export default ListReviews
