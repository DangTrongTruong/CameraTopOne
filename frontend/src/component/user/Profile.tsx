import React, { Fragment } from 'react'
import MetaData from "../layout/MetaData"
import {Link} from "react-router-dom"
import "./Profile.css"
import {User} from "../../model/User"
const Profile:React.FC<User> = ({user}) => {
  return (
    <Fragment>
      <MetaData title={`${user.name} Profile`}/>
      <div className="profileContainer">
        <div>
            <h1>My Profile</h1>
            <img src={user.avatar.url} alt={user.name}/>
            <Link to="/me/update">Edit Profile</Link>
        </div>
        <div>
            <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
            </div>
            <div>
                <h4>Email</h4>
                <p>{user.email}</p>
            </div>
            <div>
                <h4>Time Login</h4>
                <p>{String(user.createdAt).substr(0,10)}</p>
            </div>
            <div>
            <Link to="/orders">My Orders</Link>
            <Link to="/password/update">Change Password</Link>
            </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Profile