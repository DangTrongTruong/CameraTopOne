import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import './ProductList.css'
import { useDispatch, useSelector } from 'react-redux'
import {getProductHome, removeProduct} from '../slice/productSlice'
import Loader from '../component/layout/loader/Loader'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { clearError } from '../slice/authSlice'
const ProductList:React.FC = () => {
    const dispatch = useDispatch()
    const {loading,products,success,message} = useSelector( (state:any) => state.productStore)
    const {token} = useSelector((state:any) => state.authStore)
  useEffect(() => {
    // if(message){
    //   toast(message);
    // }
    dispatch(getProductHome())
  }, [dispatch])

  const handlerRemoveProduct = (id:string)=>{
        if(window.confirm("Ban co chac chan muon xoa khong ?")){
            dispatch(removeProduct({id,token}))
        }
  }
  return (
    <div className="productListContainer">
        <Sidebar/>
       {loading ? <Loader/> :(
            <div className="productList">
            <h1>Product List</h1>
        <table>
       
        <thead>
          <tr>
            <th>Image</th>
            <th>ID</th>
            <th>Name</th>
            <th>Descriptions</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
         
        </thead>
       
        <tbody>
        {products.map( (item:any,index:number) =>(
          <tr key={index}>
          <td><img src={item.images[0].url}/></td>
          <td>{item._id}</td>
          <td>{item.name}</td>
          <td>{item.description}</td>
          <td>{item.price}</td>
          <td>{item.Stock}</td>
          <td className="action">
              <Link to={`/admin/review/${item._id}`}><i className="far fa-comments reviewIcon"></i></Link>
              <Link to={`/admin/product/${item._id}`}><i className="fas fa-edit editIcon"></i></Link>
              <span onClick={()=>handlerRemoveProduct(item._id)}><i className="fas fa-trash-alt removeIcon"></i></span>
          </td>
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

export default ProductList
