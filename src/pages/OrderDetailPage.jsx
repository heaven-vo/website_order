import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../context/AppProvider";

export const OrderDetailPage = () => {
    const { setIsHeaderOrder, setIsHeader, mobileMode } = useContext(AppContext);
    useEffect(() => {
        setIsHeaderOrder(false);
        setIsHeader(false);
    }, [setIsHeaderOrder, setIsHeader]);
    let history = useHistory();
    const productListComponent = () => {
        return (
            <div className="order-wrapper" style={{ padding: "", flex: 0.65 }}>
                <div>
                    <div className="order-store">
                        <span className="order-store-title">Fresh Saigon</span>
                        <div className="f_flex" style={{ gap: 15 }}></div>
                    </div>
                    <div className="order" style={{}}>
                        <div className="order-img" style={{ width: 150 }}>
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
                        <div className="order-img" style={{ width: 150 }}>
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
            </div>
        );
    };
    const orderInfoComponent = () => {
        return (
            <div className="order-wrapper order-detail-container" style={{ flex: 0.35, borderBottom: "1px solid rgb(230, 230, 230)" }}>
                <h3 style={{ fontSize: mobileMode ? "1rem" : "1.3rem" }}>Thông tin giao hàng</h3>
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
        );
    };
    return (
        <section className="background" style={{ paddingTop: 20, paddingBottom: 10 }}>
            <div className="container non-radius" style={{ borderRadius: 10, padding: 0, background: "#fff" }}>
                <div style={{ flexDirection: "column" }} className="f_flex">
                    <div className="" style={{ display: mobileMode ? "block" : "flex" }}>
                        {mobileMode ? orderInfoComponent() : productListComponent()}

                        {mobileMode ? <div style={{ height: "10px", background: "#f6f9fc" }}></div> : <div style={{ width: "10px", background: "#f6f9fc" }}></div>}
                        {mobileMode ? productListComponent() : orderInfoComponent()}
                    </div>
                    {mobileMode ? <div style={{ height: "10px", background: "#f6f9fc" }}></div> : ""}
                    <div className="" style={{ display: mobileMode ? "block" : "flex" }}>
                        <div style={{ flex: 0.65, background: "#f6f9fc" }}></div>
                        {mobileMode ? "" : <div style={{ width: "10px", background: "#f6f9fc" }}></div>}
                        <div className="order-wrapper order-detail-container" style={{ flex: 0.35 }}>
                            <h3 style={{ fontSize: mobileMode ? "1rem" : "1.3rem", paddingBottom: 10 }}>Chi tiết thanh toán</h3>

                            <div className="order-detail-total">
                                <div className="order-detail-total-titlte">
                                    Mã đơn hàng:
                                    <span className="order-detail-total-text" style={{ fontWeight: 400, marginLeft: 10 }}>
                                        S131232
                                    </span>
                                </div>
                            </div>
                            <div className="order-detail-total">
                                <div className="order-detail-total-titlte">
                                    Tổng tiền hàng:
                                    <span className="order-detail-total-text" style={{ fontWeight: 400, marginLeft: 10 }}>
                                        218.000đ
                                    </span>
                                </div>
                            </div>
                            <div className="order-detail-total">
                                <div className="order-detail-total-titlte">
                                    Phí vận chuyển:
                                    <span className="order-detail-total-text" style={{ fontWeight: 400, marginLeft: 10 }}>
                                        18.000đ
                                    </span>
                                </div>
                            </div>
                            <div className="order-detail-total" style={{ paddingBottom: 15 }}>
                                <div className="order-detail-total-titlte">
                                    Hình thức thanh toán:
                                    <span className="order-detail-total-text" style={{ fontWeight: 400, marginLeft: 10 }}>
                                        Tiền mặt
                                    </span>
                                </div>
                            </div>

                            <div className="order-detail-total" style={{ borderTop: "1px solid rgb(230, 230, 230)", paddingTop: 15 }}>
                                <div className="order-detail-total-titlte">
                                    <span style={{ fontWeight: 700, color: "#000", fontSize: mobileMode ? "16px" : "18px" }}>Tổng cộng:</span>
                                    <span className="order-detail-text-price" style={{ fontWeight: 700, marginLeft: 10, color: "#000", fontSize: mobileMode ? "16px" : "18px" }}>
                                        218.000đ
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {mobileMode && (
                <div className="container" style={{ marginTop: 10, padding: "0 10px" }}>
                    <div
                        onClick={() => {
                            history.push(`/order`);
                        }}
                        style={{ textAlign: "center", width: "100%", height: 50, borderRadius: "0.375rem", alignItems: "center" }}
                        className="center_flex btn-hover "
                    >
                        <span style={{ fontWeight: 600, fontSize: 15 }}>Trở lại</span>
                    </div>
                </div>
            )}
        </section>
    );
};
