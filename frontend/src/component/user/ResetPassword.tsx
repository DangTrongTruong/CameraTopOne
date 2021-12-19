import React, { Fragment, useState, useEffect } from "react";
import "./ResetPassword.css";
import Loader from "../layout/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router'
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import { resetPassword } from "../../slice/authSlice";
const ResetPassword = () => {
  let {token} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { error, success, loading } = useSelector((state:any) => state.authStore);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e:React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("password",password);
    myForm.set("confirmPassword", confirmPassword);
    
    const formData = {
      token,
      myForm,
    }
    dispatch(resetPassword(formData));
  };

  useEffect(() => {
    if (error) {
      toast(error);
    }

    if (success) {
        toast("Password Updated Successfully");
        navigate("/login");
    }
  }, [dispatch, error, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Reset Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Update Profile</h2>

              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >

                <div>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
       <ToastContainer />
    </Fragment>
  )
}

export default ResetPassword
