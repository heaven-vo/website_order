import React from "react";
import Pdata from "./Pdata";
import ProductCart from "./ProductCart";

export const ProductGrid = ({ label, shopItems }) => {
    return (
        <>
            <section className="shop" style={{ background: "#f6f9fc", padding: "20px 0" }}>
                <div className="container d_flex">
                    <div className="contentWidth" style={{ marginLeft: 0 }}>
                        <div style={{ marginBottom: 20 }}>
                            <div className="heading d_flex">
                                <div className="heading-left row  f_flex">
                                    <h2>{label ? label : ""}</h2>
                                </div>
                                <div className="heading-right row " style={{ display: label ? "block" : "none" }}>
                                    <span>Xem tất cả</span>
                                    <i className="fa-solid fa-caret-right"></i>
                                </div>
                            </div>
                            <div className="product-content  grid6">
                                <ProductCart shopItems={shopItems} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
