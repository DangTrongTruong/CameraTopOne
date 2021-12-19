import React, { Fragment, useState } from 'react'
import "./UserOptions.css"
import {SpeedDial,SpeedDialAction} from "@material-ui/lab"
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import {useDispatch, useSelector} from "react-redux" 
import 'react-toastify/dist/ReactToastify.css';
import {User} from "../../../model/User"
import { logoutUser } from '../../../slice/authSlice';
const UserOptions:React.FC<User>= ({user}) => {
    const dispatch = useDispatch()
    const {cartItems} = useSelector((state:any) => state.cartStore)
    const navigate = useNavigate()
    const [open,setOpen] = useState(false)

    const options = [
        {icon: <ListAltIcon/>, name:"Orders" , func:orders},
        {icon: <PersonIcon/>, name:"Profile" , func:account},
        {icon:<ShoppingCartIcon style={{color: cartItems.length > 0 ? "tomato" : "unset"}}/>,name:`Cart(${cartItems.length})`,func:cart},
        {icon: <ExitToAppIcon/>, name:"Logout" , func:logout}
    ]

    if(user.role === "admin"){
        options.unshift({
            icon:<DashboardIcon/>,
            name:"Dashboard",
            func: dashboard,
        })
    }
    //navigate
    
    function dashboard(){
        navigate('/admin')
    }

    function orders(){
        navigate('/orders')
    }
    function cart(){
        navigate('/cart')
    }

    function account(){
        navigate('/account')
    }

    function logout(){
            dispatch(logoutUser())
            navigate('/login')
    }
  return (
    <Fragment>
        <Backdrop open={open} style={{zIndex:"10"}}/>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={()=> setOpen(false)}
        onOpen={()=> setOpen(true)}
        open={open}
        direction="down"
        className="speedDial"
        style={{zIndex:"11"}}
        icon={
            <img
                className="speedDialIcon"
                src={user ? user.avatar.url : ""}
                alt="Profile"
            />
        }
      >
          {options.map( item =>(
              <SpeedDialAction 
              key={item.name}
              icon={item.icon} 
              tooltipTitle={item.name}
              onClick={item.func}
              tooltipOpen={window.innerWidth <= 600 ? true :false}
              />
          ))}

      </SpeedDial>
      <ToastContainer />
    </Fragment>
  )
}

export default UserOptions
