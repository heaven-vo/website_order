import React, { useContext, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../context/AppProvider";
import ProductCart from "./ProductCart";

export const ProductGrid = ({ filtter, label, data, labelImg, cateId, isLoading, isViewAll }) => {
    const { setCart, setlistProducts, mobileMode, menu } = useContext(AppContext);
    // const [products, setProducts] = useState([]);
    // useEffect(() => {
    //     setProducts(listProducts);
    // }, [listProducts]);
    let history = useHistory();
    return (
        <>
            <section className="shop" style={{ background: "#f6f9fc", padding: "25px 0 40px 0" }}>
                <div className="container d_flex">
                    <div className="contentWidth" style={{ marginLeft: 0 }}>
                        <div style={{ marginBottom: 20 }}>
                            <div className="heading d_flex" style={{ alignItems: "center" }}>
                                <div className="heading-left  center_flex">
                                    {isLoading ? (
                                        <div style={{ marginRight: 5 }}>
                                            <Skeleton height={45} width={45} borderRadius={50} />
                                        </div>
                                    ) : (
                                        <div style={{ width: 45, height: 45, borderRadius: 50, marginLeft: 5 }}>
                                            <img style={{ borderRadius: 50, objectFit: "cover", width: "100%", height: "100%" }} src={labelImg} alt="" />
                                        </div>
                                    )}
                                    {isLoading ? <Skeleton height={43} width={150} borderRadius={8} style={{ margin: 0 }} /> : <h2>{label ? label : ""}</h2>}
                                </div>
                                {isViewAll &&
                                    (isLoading ? (
                                        <Skeleton height={43} width={110} borderRadius={8} style={{ margin: 0 }} />
                                    ) : (
                                        <div className="heading-right  " style={{ display: label ? "block" : "none" }} onClick={() => history.push(`/menu/${menu}/${filtter}/${cateId}`)}>
                                            <span>Xem tất cả</span>
                                            <i className="fa-solid fa-caret-right"></i>
                                        </div>
                                    ))}
                            </div>
                            <div className="product-content  grid6">
                                {data.map((item, index) => {
                                    if (mobileMode && index > 6) {
                                        return true;
                                    }
                                    return isLoading ? (
                                        <div style={{ margin: 6 }}>
                                            <Skeleton height={272} borderRadius={8} style={{ margin: 0 }} />
                                        </div>
                                    ) : (
                                        <ProductCart product={item} key={index} />
                                    );
                                })}
                            </div>
                        </div>
                        {isViewAll && mobileMode && !isLoading && (
                            <div
                                style={{ textAlign: "center", margin: "0 5px", height: 45, borderRadius: "0.375rem", alignItems: "center", border: "1px solid var(--secondary)" }}
                                className="center_flex "
                                onClick={() => history.push(`/menu/${menu}/${filtter}/${cateId}`)}
                            >
                                <span onClick={() => {}} style={{ fontWeight: 600, fontSize: 15, color: "var(--secondary)" }}>
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
