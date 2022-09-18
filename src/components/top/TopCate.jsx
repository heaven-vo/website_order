import React from "react";
import "./style.css";
import TopCart from "./TopCart";

const TopCate = () => {
    return (
        <>
            <section className="TopCate background">
                <div className="container">
                    <div className="heading c_flex">
                        <div className="heading-left  c_flex">
                            <i className="fa-solid fa-border-all"></i>
                            <h2>Loại Thực Phẩm</h2>
                        </div>
                        <div className="heading-right row ">
                            <span>Xem tất cả</span>
                            <i className="fa-solid fa-caret-right"></i>
                        </div>
                    </div>
                    <TopCart />
                </div>
            </section>
        </>
    );
};

export default TopCate;
