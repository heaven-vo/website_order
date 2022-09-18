import React, { useState } from "react";

const Catg = () => {
    const [isActive, setIsActive] = useState(1);
    const data = [
        { id: 1, cateImg: "./images/category/cat-1.png", cateName: "Trứng & Sữa" },
        { id: 2, cateImg: "./images/category/cat-2.png", cateName: "Thịt Tươi Sống" },
        { id: 3, cateImg: "./images/category/cat-1.png", cateName: "Các Loại Hạt" },
        { id: 4, cateImg: "./images/category/cat-2.png", cateName: "Thịt Hải Sản Đóng Hộp" },
        { id: 5, cateImg: "./images/category/cat-1.png", cateName: "Rau Củ Tươi" },
        { id: 6, cateImg: "./images/category/cat-2.png", cateName: "Rượu Bia" },
    ];
    const onSelected = (id) => {
        setIsActive(id);
    };
    return (
        <>
            <div className="category">
                <div className="chead d_flex">
                    <h1>Danh Mục Thực Phẩm </h1>
                    {/* <h1>Shops </h1> */}
                </div>
                {data.map((value, index) => {
                    return (
                        <div className={`box f_flex ${isActive === value.id ? "isSelected" : ""}`} key={index} onClick={() => onSelected(value.id)}>
                            {/* <img src={value.cateImg} alt='' /> */}
                            <span>{value.cateName}</span>
                        </div>
                    );
                })}
                {/* <div className="box box2" style={{ backgroundColor: "#e94560" }}>
                    <button style={{ color: "#ffffff", cursor: "pointer" }}>Xem Tất Cả</button>
                </div> */}
            </div>
        </>
    );
};

export default Catg;
