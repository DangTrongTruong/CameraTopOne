import React from 'react'
import {useState} from 'react'
import {MenuItems} from './MenuItems'
import {Link} from 'react-router-dom'
import './Header.css'
const Header: React.FC = () => {
    const [click,setClick] = useState(false)
  return (
    <nav className="NavbarItems">
        <Link className="narbar-logo" to="/">CameraTopOne</Link>
        <div className="menu-icon" onClick ={()=>setClick(!click)}>
          <i className={ click ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
        <ul className ={click ? "nav-menu active" : 'nav-menu'} >
          {MenuItems.map( (item,index) => <li key={index}><Link className={item.cName} to={item.url}>{item.title}</Link></li>)}
          <Link to={"/login"} className="btn-auth"><i className="fas fa-user"></i></Link> 
        </ul>
    </nav>
  )
}

export default Header
