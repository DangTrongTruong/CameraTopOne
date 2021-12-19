import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import "./NewProduct.css"
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import SideBar from "./Sidebar";
import Loader from "../component/layout/loader/Loader";
import { useNavigate, useParams } from "react-router";
import {clearError, getUser, updateUser} from '../slice/authSlice'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const UpdateUser:React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {userId} = useParams();
  const { loading, error,token, user,userUpdate ,success} = useSelector((state:any) => state.authStore);


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");


  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUser(userId,token));
    } else {
      setName(userUpdate.name);
      setEmail(userUpdate.email);
      setRole(userUpdate.role);
    }
    // if(error){
    //   toast(error);
    //   dispatch(clearError(""));
    // }
  }, [dispatch,error]);

  const updateUserSubmitHandler = (e:React.SyntheticEvent<EventTarget>) => {
    console.log(1)
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);
    myForm.set("token", token);
    dispatch(updateUser({userId, myForm}));
  };

  return (
    <Fragment>
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <form
              className="createProductForm"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Update User</h1>

              <div>
                <PersonIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default UpdateUser;