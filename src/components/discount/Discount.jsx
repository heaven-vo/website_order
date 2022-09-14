import React from "react"
import Dcard from "./Dcard"

const Discount = () => {
  return (
    <>
      <section className='Discount background '>
        <div className='container'>
          <div className='heading d_flex'>
            <div className='heading-left row  f_flex'>
              <img src='https://firebasestorage.googleapis.com/v0/b/deliveryfood-9c436.appspot.com/o/food%2Fmarket-svgrepo-com.svg?alt=media&token=88f13597-490d-405e-bd33-b34d9bf8acc3' />
              <h2>Cửa Hàng Nổi Bật</h2>
            </div>
            <div className='heading-right row '>
              <span>Xem tất cả</span>
              <i className='fa-solid fa-caret-right'></i>
            </div>
          </div>
          <Dcard />
        </div>
      </section>
    </>
  )
}

export default Discount
