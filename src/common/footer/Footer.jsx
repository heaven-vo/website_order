import React from "react"
import "./style.css"

const Footer = () => {
  return (
    <>
      <footer>
        <div className='container grid4'>
          <div className='box'>
            <h1>Bonik</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor libero id et, in gravida. Sit diam duis mauris nulla cursus. Erat et lectus vel ut sollicitudin elit at amet.</p>
            {/* <div className='icon d_flex'>
              <div className='img d_flex'>
                <i className='fa-brands fa-google-play'></i>
                <span>Google Play</span>
              </div>
              <div className='img d_flex'>
                <i className='fa-brands fa-app-store-ios'></i>
                <span>App Store</span>
              </div>
            </div> */}
          </div>

          <div className='box'>
            <h2>Về Chúng Tôi</h2>
            <ul>
              <li>Hỏi và đáp</li>
              <li>Giới thiệu</li>
              <li>Liên hệ</li>
              <li>Điều khoản dịch vụ</li>
              <li>Chính sách bảo mật</li>
            </ul>
          </div>
          <div className='box'>
            <h2>Chăm Sóc Khách Hàng</h2>
            <ul>
              <li>Tổng Đài Hỗ Trợ </li>
              <li>Hướng dẫn đặt hàng </li>
              <li>Theo dõi đơn hàng của bạn </li>
              <li>Tra hàng & Hoàn tiền </li>
            </ul>
          </div>
          <div className='box'>
            <h2>Liên Hệ Với Chúng Tôi</h2>
            <ul>
              <li>Vinhomes Grand Park Quận 9 – Thành Phố Thủ Đức </li>
              <li>Email: support.help@gmail.com</li>
              <li>Phone: +035 1123 456 </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
