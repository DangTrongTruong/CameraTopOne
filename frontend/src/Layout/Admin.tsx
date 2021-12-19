import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router'

const Admin:React.FC = () => {
  const {isAuthenticated} = useSelector((state:any) => state.authStore)
  return (
    <div>
      {isAuthenticated &&  <Outlet />}
    </div>
  )
}

export default Admin
