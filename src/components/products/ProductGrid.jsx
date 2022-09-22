import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppProvider";
import Pdata from "./Pdata";
import ProductCart from "./ProductCart";

export const ProductGrid = ({ label, shopItems }) => {
    const { setCart, listProducts, setlistProducts, mobileMode } = useContext(AppContext);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        setProducts(listProducts);
    }, [listProducts]);
    return (
        <>
            <section className="shop" style={{ background: "#f6f9fc", padding: "20px 0" }}>
                <div className="container d_flex">
                    <div className="contentWidth" style={{ marginLeft: 0 }}>
                        <div style={{ marginBottom: 20 }}>
                            <div className="heading d_flex">
                                <div className="heading-left   f_flex">
                                    <h2>{label ? label : ""}</h2>
                                </div>
                                <div className="heading-right  " style={{ display: label ? "block" : "none" }}>
                                    <span>Xem tất cả</span>
                                    <i className="fa-solid fa-caret-right"></i>
                                </div>
                            </div>
                            <div className="product-content  grid6">
                                {products.map((item, index) => {
                                    if (mobileMode && index > 5) {
                                        return true;
                                    }
                                    return <ProductCart product={item} key={index} />;
                                })}
                            </div>
                        </div>
                        {mobileMode && (
                            <div style={{ textAlign: "center", margin: "0 5px", height: 45, borderRadius: "0.375rem", alignItems: "center", border: "1px solid #e94560" }} className="center_flex ">
                                <span onClick={() => {}} style={{ fontWeight: 600, fontSize: 15, color: "#e94560" }}>
                                    Xem thêm sản phẩm
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};
