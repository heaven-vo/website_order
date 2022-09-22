import React from "react"
import Scard from "./Scard"

const ShopSlide = () => {
  return (
    <>
      <section className='Discount background '>
        <div className='container'>
          <div className='heading c_flex'>
            <div className='heading-left c_flex'>
              <h2>Cửa Hàng Nổi Bật</h2>
            </div>
            <div className='heading-right  '>
              <span>Xem tất cả</span>
              <i className='fa-solid fa-caret-right'></i>
            </div>
          </div>
          <Scard />
        </div>
      </section>
    </>
  )
}

export default ShopSlide
