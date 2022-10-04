import React, { useEffect } from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../context/AppProvider";

export const OrderPage = () => {
    const { setIsHeaderOrder, setIsHeader } = useContext(AppContext);
    useEffect(() => {
        setIsHeaderOrder(true);
        setIsHeader(false);

        return () => {
            setIsHeaderOrder(false);
            setIsHeader(true);
        };
    }, [setIsHeaderOrder, setIsHeader]);
    let history = useHistory();
    return (
        <>
            <section className="background" style={{ paddingTop: 10, paddingBottom: 10 }}>
                <div className="container non-radius" style={{ borderRadius: 10 }}>
                    <div style={{ flexDirection: "column", gap: 20 }} className="f_flex">
                        {[1, 2].map((item) => {
                            return (
                                <div className="order-wrapper">
                                    <div>
                                        <div className="order-store">
                                            <span className="order-store-title">Fresh Saigon</span>
                                            <div className="f_flex" style={{ gap: 15 }}>
                                                <div className="c_flex" style={{ color: "green", gap: 10 }}>
                                                    <i class="fa-solid fa-truck-fast"></i>
                                                    <span>Thành Công</span>
                                                </div>
                                                <span className="order-store-status">|</span>
                                                <span className="order-text-price order-store-status" style={{ fontWeight: 600 }}>
                                                    Đã Giao
                                                </span>
                                            </div>
                                        </div>
                                        <div className="order" style={{}}>
                                            <div className="order-img" style={{ width: 130 }}>
                                                <img src="https://dl.airtable.com/.attachments/1bb802dde8400e5fcebaf931620da443/9265bcad/Mix-Celery-Juice-thumbnail2x.jpg" alt="" />
                                            </div>
                                            <div style={{ flex: 1, flexDirection: "column" }} className="f_flex">
                                                <span className="order-text-name">Hỗn Hợp Cần Tây</span>
                                                {/* <span className="order-text-cate">Nước Uống</span> */}
                                                <span className="order-text-count">1 Chai</span>
                                            </div>
                                            <div>
                                                <span className="order-text-price">20.000đ</span>
                                            </div>
                                        </div>
                                        <div className="order" style={{}}>
                                            <div className="order-img" style={{ width: 130 }}>
                                                <img
                                                    src="https://firebasestorage.googleapis.com/v0/b/deliveryfood-9c436.appspot.com/o/food%2Fba-ri-b-thumbnail2x.jpg?alt=media&token=3d9c0460-5a19-4cf0-bf22-b3e48b57b0a0"
                                                    alt=""
                                                />
                                            </div>
                                            <div style={{ flex: 1, flexDirection: "column" }} className="f_flex">
                                                <span className="order-text-name">Thịt Bò Văn Dương</span>
                                                {/* <span className="order-text-cate">Thịt Tươi Sống</span> */}
                                                <span className="order-text-count">0.5Kg</span>
                                            </div>
                                            <div>
                                                <span className="order-text-price">199.000đ</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div>
                                        <div className="order-store">
                                            <span className="order-store-title">Hai San Hoang Gia</span>
                                        </div>

                                        <div className="order" style={{}}>
                                            <div className="order-img" style={{ width: 150 }}>
                                                <img src="https://dl.airtable.com/2zD9MBqWSdqd8vN5sUGK_Ghe%20Xanh%20thumbnail%202x.jpg" alt="" />
                                            </div>
                                            <div style={{ flex: 1, flexDirection: "column" }} className="f_flex">
                                                <span className="order-text-name">Ghẹ Xanh Văn Dương 1231 1231 312</span>
                                                <span className="order-text-cate">Hải Sản Tươi Sống</span>
                                                <span className="order-text-count">0.5Kg</span>
                                            </div>
                                            <div>
                                                <span className="order-text-price">199.000đ</span>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="order-total">
                                        <div>
                                            Tổng số tiền:{" "}
                                            <span className="order-text-price" style={{ fontSize: 20, fontWeight: 600, marginLeft: 10 }}>
                                                220.000đ
                                            </span>
                                        </div>
                                        <div>
                                            <div
                                                onClick={() => {
                                                    history.push(`/order/${"123"}`);
                                                }}
                                                style={{ textAlign: "center", width: 230, height: 50, borderRadius: "0.375rem", alignItems: "center" }}
                                                className="center_flex btn-hover order-btn"
                                            >
                                                <span style={{ fontWeight: 600, fontSize: 15 }}>Xem chi tiết</span>
                                            </div>
                                        </div>
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
