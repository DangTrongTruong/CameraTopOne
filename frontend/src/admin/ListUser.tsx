import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import './ListUser.css'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../component/layout/loader/Loader'
import { Link } from 'react-router-dom'
import { clearError, deleteUser, getAllUsers } from '../slice/authSlice'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const ListUser:React.FC = () => {
    const dispatch = useDispatch()
    const {token,loading,listUser,success,error} = useSelector((state:any) => state.authStore)
  useEffect(() => {
    if(error){
      toast(error);
      dispatch(clearError(""));
    }
    dispatch(getAllUsers({token}))
  }, [dispatch,error])

  const handlerRemoveUser = (id:string)=>{
        if(window.confirm("Ban co chac chan muon xoa khong ?")){
          dispatch(deleteUser({id,token}))
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
            <th>Avatar</th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
         
        </thead>
       
        <tbody>
        {listUser.map( (item:any,index:number) =>(
          <tr key={index}>
          <td><img src={item.avatar.url}/></td>
          <td>{item._id}</td>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td style={{color: item.role == "admin" ? "tomato" : "green"}}>{item.role}</td>
          <td className="action">
              <Link to={`/admin/users/${item._id}`}><i className="fas fa-edit editIcon"></i></Link>
              <span onClick={()=>handlerRemoveUser(item._id)}><i className="fas fa-trash-alt removeIcon"></i></span>
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

export default ListUser
