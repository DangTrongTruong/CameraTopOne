import "./Footer.css"
import React from 'react'
const Footer:React.FC = () => {
  return (
    <div id="footer">
      <div className="leftFooter">
          <h4>DOWNLOAD APP STORE</h4>
          <p>Download App for Android anh IOS mobile phone</p>
            <img src="https://www.seekpng.com/png/full/223-2231228_app-store-apple-transprent-download-on-apple-store.png"/>
            <img src="https://venturebeat.com/wp-content/uploads/2017/03/google_play_logo.png?w=1200&strip=all" alt="googlePlay"/>
      </div>

      <div className="midFooter">
            <h1>CAMERA-TOP-ONE</h1>
            <p>Hight Quantity is our first priority</p>
            <p>Copyrights 2021</p>
      </div>

      <div className="rightFooter">
          <h4>Follow us</h4>
          <a href="https://www.youtube.com">Youtube</a>
          <a href="https://www.facebook.com">Facebook</a>
          <a href="https://www.instagram.com">Instagram</a>
      </div>
    </div>
  )
}

export default Footer
