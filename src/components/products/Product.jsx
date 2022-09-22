import React, { useState } from "react";
import Catg from "./Catg";
import ProductCart from "./ProductCart";
import "./style.css";

const Product = ({ shopItems }) => {
    const data = [
        { id: 1, cateImg: "./images/category/cat-1.png", cateName: "Trứng & Sữa" },
        { id: 2, cateImg: "./images/category/cat-2.png", cateName: "Thịt Tươi Sống" },
        { id: 3, cateImg: "./images/category/cat-1.png", cateName: "Các Loại Hạt" },
        { id: 4, cateImg: "./images/category/cat-2.png", cateName: "Thịt Hải Sản Đóng Hộp hop" },
        { id: 5, cateImg: "./images/category/cat-1.png", cateName: "Rau Củ Tươi" },
        { id: 6, cateImg: "./images/category/cat-2.png", cateName: "Rượu Bia" },
    ];
    const [isActive, setIsActive] = useState(1);
    return (
        <>
            <section className="shop background">
                <div className="container d_flex">
                    <Catg />
                    <div className="contentWidth">
                        <div className="container d_flex category-list" style={{ marginBottom: 25 }}>
                            <div className="f_flex" style={{ gap: 20,  }}>
                                {data.map((item) => {
                                    return (
                                        <div
                                            className={`${isActive === item.id ? "menu-item-active" : "menu-item "} cusor center_flex category-item`}
                                            style={{  }}
                                            onClick={() => setIsActive(item.id)}
                                        >
                                            <span>{item.cateName}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        {[1, 2].map((item) => {
                            return (
                                <div style={{ marginBottom: 20 }} key={item}>
                                    <div className="heading d_flex">
                                        <div className="heading-left   f_flex">
                                            <h2>Tops Market</h2>
                                        </div>
                                        <div className="heading-right  ">
                                            <span>Xem tất cả</span>
                                            <i className="fa-solid fa-caret-right"></i>
                                        </div>
                                    </div>
                                    <div className="product-content  grid5 product-grid-mobile">
                                        {shopItems.map((item) => (
                                            <ProductCart product={item} key={item.id} />
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Product;
