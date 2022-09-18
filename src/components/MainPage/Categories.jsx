import React from "react"

const Categories = () => {
  const data = [
    {
      cateImg: "./images/category/cat1.png",
      cateName: "Trứng & Sữa",
    },
    {
      cateImg: "./images/category/cat2.png",
      cateName: "Thịt Tưới Sống",
    },
    {
      cateImg: "./images/category/cat3.png",
      cateName: "Hải Sản",
    },
    {
      cateImg: "./images/category/cat4.png",
      cateName: "Các Loại Hạt",
    },
    {
      cateImg: "./images/category/cat5.png",
      cateName: "Đồ Uống",
    },
    {
      cateImg: "./images/category/cat6.png",
      cateName: "Rau Củ Quả",
    },
    {
      cateImg: "./images/category/cat7.png",
      cateName: "Thực Phẩm Bổ Sung",
    },
    {
      cateImg: "./images/category/cat8.png",
      cateName: "Gia Vị",
    },
    {
      cateImg: "./images/category/cat9.png",
      cateName: "Trái Cây Tươi",
    },
    {
      cateImg: "./images/category/cat10.png",
      cateName: "Thực Phẩm Chay",
    },
    
  ]

  return (
    <>
      <div className='category'>
        {data.map((value, index) => {
          return (
            <div className='box f_flex' key={index}>
              <img src={value.cateImg} alt='' />
              <span>{value.cateName}</span>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Categories
