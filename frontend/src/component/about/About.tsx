import React from 'react'
import "./About.css"
const About: React.FC= () => {
  return (
    <div>
        <div id="about-main">
          <div className="jumbotron">
            <div className="jumbotron-inner">
              <div className="top-box">
                <div className="content-box">
                  <h1>
                    About CameraTopOne
                  </h1>
                  <p>

                  </p>
                </div>
              </div>
            </div>
            <div className="img-layer-container">
              <div className="team-image" id="team-image">
                <img src="https://apimatic.io/img/theme/aboutUs/images-1.png" />
              </div>
              <div className="circles-container">
                <div className="img-1">
                  <img src="https://apimatic.io/img/theme/aboutUs/Circles-1-1.svg" />                        
                </div>
                <div className="img-2">
                  <img src="https://apimatic.io/img/theme/aboutUs/Circles-2-1.svg" />                        
                </div>                    
              </div>           
            </div>
          </div>
          <div className="story-container">
            <div className="need-for-dx-container">
              <h3 className="text-center">
              Giới thiệu
              </h3>
              <p>
                CÔNG TY CỔ PHẦN CÔNG NGHỆ KYMA (KYMA TECHNOLOGY JOINT STOCK COMPANY) là đối tác và đại lý chính thức của các hãng lớn như: SONY, NIKON, CANON, FUJIFILM, BOSE, JBL ..vv. Chúng tôi cung cấp các sản phẩm như máy ảnh, máy quay, phụ kiện studio, âm thanh và máy 
                tính chính hãng đi kèm với dịch vụ bảo hành sau bán hàng chu đáo mang đến trải nghiệm tốt nhât cho khách hàng . Kyma.vn hướng đến mục tiêu tiếp cận bán hàng trên đa nền tảng Ommichanel để phục vụ khách hàng được tốt nhất và nhanh nhất. Ngoài ra Kyma còn cung cấp hệ thống B2B (Bán hàng phục vụ doanh nghiệp) luôn cung cấp đầy đủ chứng từ hợp đồng với giá tốt nhất trên thị trường nhằm đem lại đến sự hài lòng cho khách hàng cá nhân cũng như tổ chức, công ty. Tất cả giá bán sản phẩm trên website: kyma.vn đã bao gồm 10% VAT.
              </p>
              <div className="img-container">
                <img src="https://kyma.vn/StoreData/images/banner/sapq.jpg" alt="apimatic developer experience process" className="img-responsive" />
              </div>
            </div>
            <div className="container-divider" />
            <div className="our-tech-container">
              <h3 className="text-center">
              Quy trình vận hành hệ thống
              </h3>
              
              <div className="img-container">
                <img src="https://kyma.vn/StoreData/images/PageData/241204e3-3d.jpg" alt="apimatic code generation engine" className="img-responsive" />
              </div>
            </div>
            
          </div>
        </div>
      </div>
  )
}

export default About
