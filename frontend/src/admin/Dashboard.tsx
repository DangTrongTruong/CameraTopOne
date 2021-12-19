import React from 'react'
import Sidebar from './Sidebar'
import "./Dashboard.css"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Dashboard:React.FC = () => {
  const {products} = useSelector((state:any) => state.productStore);
  const {listUser} = useSelector((state:any) => state.authStore)
  const {orders} = useSelector((state:any) => state.orderStore)
  return (
    <div className="dashboard">
      <Sidebar/>
      <div className="dashboardContainer">
          <h1>Dashboard</h1>
          <div className="dashboardSumary">
              <div className="dashboardSummaryBox2">
                  <Link to="/admin">
                      <p>Product</p>
                      <p>{products.length}</p>
                  </Link>
                  <Link to="/admin/users">
                      <p>User</p>
                      <p>{listUser.length}</p>
                  </Link>
                  <Link to="/admin/users">
                      <p>Order</p>
                      <p>{orders.length}</p>
                  </Link>
              </div>
          </div>
         
      </div>
    </div>
  )
}

export default Dashboard
