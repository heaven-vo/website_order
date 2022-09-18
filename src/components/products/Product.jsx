import React from "react";
import Catg from "./Catg";
import ProductCart from "./ProductCart";
import "./style.css";

const Product = ({ shopItems }) => {
    return (
        <>
            <section className="shop background">
                <div className="container d_flex">
                    <Catg />
                    <div className="contentWidth">
                        {[1, 2].map((item) => {
                            return (
                                <div style={{ marginBottom: 20 }} key={item}>
                                    <div className="heading d_flex">
                                        <div className="heading-left row  f_flex">
                                            <h2>Tops Market</h2>
                                        </div>
                                        <div className="heading-right row ">
                                            <span>Xem tất cả</span>
                                            <i className="fa-solid fa-caret-right"></i>
                                        </div>
                                    </div>
                                    <div className="product-content  grid5">
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
