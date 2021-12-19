import React, { Fragment ,useEffect,useRef, useState} from 'react'
import "./LoginSignUp.css"
import Loader from "../layout/loader/Loader"
import {Link} from "react-router-dom"
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import {useDispatch,useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser,registerUser } from '../../slice/authSlice';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { error } from 'console';
import logo from '../../image/avatar.jpeg'
const LoginSignUp:React.FC = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const redirect = queryParams.get('redirect');
  const loginTab = useRef<any>(null);
  const registerTab = useRef<any>(null);
  const switcherTab = useRef<any>(null);
  const {loading,isAuthenticated,error,token} = useSelector( (state:any) =>state.authStore)
  const [user,setUser] = useState({
    name:"",
    email:"",
    password:"",
  })

  

  const {name,email,password} = user;

  //Dang nhap
  type data ={
    email:string,
    password:string,
  }
  const onSubmit = (data:data)=>{
    dispatch(loginUser(data))
    
}
const [avatar, setAvatar] = useState<any>(logo);
  const [avatarPreview, setAvatarPreview] = useState<any>(logo);
  
  //Dang ky
  const registerSubmit = (e:React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(registerUser(myForm));
  };


  //value form
  const registerDataChange = (e:any) =>{
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  }


if(isAuthenticated){
  if(redirect == "shipping"){
    navigate("/shipping")
  }
  else{
    navigate("/account")
  }
}


  const switchTabs = (e:React.SyntheticEvent<EventTarget>, tab:any) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };
  return (
    <Fragment>
      {false ? <Loader/> :
        <Fragment>
        <div className="LoginSignUpContainer">
          <div className="LoginSignUpBox">
            <div>
              <div className="login_signUp_toggle">
                <p onClick={e => switchTabs((e),"login")}>LOGIN</p>
                <p onClick={e => switchTabs((e),"register")}>REGISTER</p>
              </div>
              <button ref={switcherTab}></button>
            </div>
  
            <form className="loginForm" ref={loginTab} onSubmit={handleSubmit(onSubmit)}>
                  <div className="loginEmail">
                    <MailOutlineIcon/>
                    <input {...register("email")} placeholder="Email" type="email"/>
                  </div>
                  <div className="loginPassword">
                    <LockOpenIcon/>
                    <input {...register("password")} placeholder="Password" type="password"/>
                  </div>
                  <Link to="/password/forgot">Forget Password ?</Link>
                  <input type="submit" value="Login" className="loginBtn"/>
            </form>
            <form
              className="signUpForm"
              ref={registerTab}
              encType="multipart/form-data"
              onSubmit={registerSubmit}
            >
              <div className="signUpName">
                <FaceIcon/>
                <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={name}
                onChange={registerDataChange}
                />
              </div>
              <div className="signUpEmail">
                <MailOutlineIcon/>
                <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={registerDataChange}
                />
              </div>
              <div className="signUpPassword">
                <MailOutlineIcon/>
                <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={password}
                onChange={registerDataChange}
                />
              </div>
              <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
              <input
                type="submit"
                value="Register"
                className="signUpBtn"
              />
              
            </form>
          </div>
        </div>
      </Fragment>
      }
       <ToastContainer />
    </Fragment>
  )
}

export default LoginSignUp
