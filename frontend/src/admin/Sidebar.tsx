import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";

const Sidebar:React.FC = () => {
  return (
    <div className="sidebar">
      <Link to="/">
       <h1>CAMERA-TOP-ONE</h1>
      </Link>
      <Link to="/admin">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
     
      <Link to="/admin/products">
        <p>
          <PostAddIcon /> Products
        </p>
      </Link>

      <Link to="/admin/product">
        <p>
          <AddIcon />Create Product
        </p>
      </Link>
        
      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>

      <Link to="/admin/order">
        <p>
          <PostAddIcon /> Orders
        </p>
      </Link>
      
    </div>
  );
};


export default Sidebar;