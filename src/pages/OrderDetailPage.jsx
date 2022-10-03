import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppProvider";

export const OrderDetailPage = () => {
    const { setIsHeaderOrder, setIsHeader, Cart } = useContext(AppContext);
    useEffect(() => {
        setIsHeaderOrder(false);
        setIsHeader(false);
    }, [setIsHeaderOrder, setIsHeader]);

    return (
        <section className="background" style={{ paddingTop: 10, paddingBottom: 10 }}>
            <div className="container non-radius" style={{ borderRadius: 10, padding: 0, background: "#fff" }}>
                <div style={{ flexDirection: "column", gap: 5 }} className="f_flex">
                    <div style={{ padding: 10 }}>
                        <h3 style={{ fontSize: "1.4rem" }}>Thông tin giao hàng</h3>
                        <div className="f_flex order-detail-info">
                            <i class="fa-solid fa-circle" style={{ fontSize: "0.7rem", lineHeight: 2, color: "green" }}></i>
                            <div className="flex-collumn">
                                <span style={{ color: "green", fontWeight: 600 }}>Giao hàng thành công</span>
                                <span>08-08-2022 16:30</span>
                            </div>
                        </div>
                        <div className="f_flex order-detail-adrress">
                            <i style={{ color: "var(--primary)", lineHeight: 1.3 }} class="fa-solid fa-location-dot"></i>
                            <div className="flex-collumn">
                                <span>Địa chỉ nhận hàng:</span>
                                <span>Hoàng Thái</span>
                                <span>03532803983</span>
                                <span>Building S6.03 Vinhomes Green Park</span>
                            </div>
                        </div>
                    </div>
                    <div style={{ height: "10px", background: "#f6f9fc" }}></div>
                    <div className="order-wrapper" style={{ padding: "0 10px" }}>
                        <div>
                            <div className="order-store">
                                <span className="order-store-title">Fresh Saigon</span>
                                <div className="f_flex" style={{ gap: 15 }}>
                                    <div className="c_flex" style={{ color: "var(--primary)", gap: 10 }}>
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
                                <div className="order-img" style={{ width: 150 }}>
                                    <img src="https://dl.airtable.com/.attachments/1bb802dde8400e5fcebaf931620da443/9265bcad/Mix-Celery-Juice-thumbnail2x.jpg" alt="" />
                                </div>
                                <div style={{ flex: 1, flexDirection: "column" }} className="f_flex">
                                    <span className="order-text-name">Hỗn Hợp Cần Tây</span>
                                    <span className="order-text-cate">Nước Uống</span>
                                    <span className="order-text-count">1 Chai</span>
                                </div>
                                <div>
                                    <span className="order-text-price">20.000đ</span>
                                </div>
                            </div>
                            <div className="order" style={{}}>
                                <div className="order-img" style={{ width: 150 }}>
                                    <img
                                        src="https://firebasestorage.googleapis.com/v0/b/deliveryfood-9c436.appspot.com/o/food%2Fba-ri-b-thumbnail2x.jpg?alt=media&token=3d9c0460-5a19-4cf0-bf22-b3e48b57b0a0"
                                        alt=""
                                    />
                                </div>
                                <div style={{ flex: 1, flexDirection: "column" }} className="f_flex">
                                    <span className="order-text-name">Thịt Bò Văn Dương</span>
                                    <span className="order-text-cate">Thịt Tươi Sống</span>
                                    <span className="order-text-count">0.5Kg</span>
                                </div>
                                <div>
                                    <span className="order-text-price">199.000đ</span>
                                </div>
                            </div>
                        </div>
                        <div>
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
                        </div>
                        <div className="order-detail-total" style={{ justifyContent: "flex-end", borderTop: "1px solid rgb(230, 230, 230)" }}>
                            <div>
                                Mã đơn hàng:
                                <span className="order-detail-total-text" style={{ fontSize: 20, fontWeight: 400, marginLeft: 10 }}>
                                    02139329
                                </span>
                            </div>
                        </div>
                        <div className="order-detail-total" style={{ justifyContent: "flex-end" }}>
                            <div>
                                Tổng tiền hàng:
                                <span className="order-detail-total-text" style={{ fontSize: 20, fontWeight: 400, marginLeft: 10 }}>
                                    220.000đ
                                </span>
                            </div>
                        </div>
                        <div className="order-detail-total" style={{ justifyContent: "flex-end" }}>
                            <div>
                                Phí vận chuyển:
                                <span className="order-detail-total-text" style={{ fontSize: 20, fontWeight: 400, marginLeft: 10 }}>
                                    20.000đ
                                </span>
                            </div>
                        </div>
                        <div className="order-detail-total" style={{ justifyContent: "flex-end" }}>
                            <div>
                                Tổng số tiền:
                                <span className="order-detail-text-price" style={{ fontSize: 20, fontWeight: 600, marginLeft: 10 }}>
                                    220.000đ
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
