import React, { useContext, useEffect, useState } from "react";
import BallTriangle from "react-loading-icons/dist/esm/components/ball-triangle";
import { useHistory, useLocation } from "react-router-dom";
import { getOrderDetail } from "../apis/apiService";
import { getStatusColor, getStatusName, STATUS_ORDER } from "../constants/Variable";
import { AppContext } from "../context/AppProvider";

const OrderLookupPage = () => {
    const { setHeaderInfo, mobileMode, setIsHeaderOrder } = useContext(AppContext);
    const [isLoadingCircle, setIsLoadingCircle] = useState(false);
    const [orderInfo, setOrderInfo] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [orderId, setOrderId] = useState("");
    const [productOrder, setproductOrder] = useState([]);
    const [statusOrder, setStatusOrder] = useState([]);
    let location = useLocation();
    useEffect(() => {
        setHeaderInfo({ isSearchHeader: false, title: "Đơn hàng của bạn" });

        return () => {};
    }, []);
    useEffect(() => {
        let doc = document.getElementById("main");

        if (location.state) {
            let { orderId } = location.state;
            setOrderId(orderId);
            hanldeSubmit(orderId);
        }
        doc.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
        console.log({ orderId });
        setIsHeaderOrder(false);

        // setHeaderInfo({ isSearchHeader: false, title: "Chi tiết đơn hàng" });
    }, [setIsHeaderOrder, setHeaderInfo, location]);
    let history = useHistory();
    const hanldeSubmit = (id) => {
        setOrderInfo(null);
        setIsLoadingCircle(true);
        getOrderDetail(id)
            .then((res) => {
                if (res.data) {
                    const order = res.data;
                    setOrderInfo(order);
                    setproductOrder(order.listProInMenu || []);
                    setStatusOrder(order.listStatusOrder || []);
                    setIsLoadingCircle(false);
                    setNotFound(false);
                } else {
                    setNotFound(true);
                }
            })
            .catch((error) => {
                console.log(error);
                setNotFound(true);
                setIsLoadingCircle(false);
                setOrderInfo({});
            });
    };
    const getTimeOrder = (time) => {
        let result = time.split(" ");
        if (result && result[1]) {
            result = result[1];
            return result;
        } else {
            return "--";
        }
    };
    const getStatusCancel = (statusList) => {
        let cancel = false;
        for (let index = 0; index < statusList.length; index++) {
            const element = statusList[index];
            if (element && element.name === STATUS_ORDER[4].compare) {
                cancel = true;
            }
        }
        return cancel;
    };
    // statusOrder[1] ? (statusOrder[1].name === STATUS_ORDER[1].compare ? 1 : 0.3) : 0.3
    const getOpacity = (status) => {
        let opacity = 0;
        if (status && status.name) {
            if (status.name === STATUS_ORDER[0].compare || status.name === STATUS_ORDER[1].compare || status.name === STATUS_ORDER[2].compare || status.name === STATUS_ORDER[3].compare) {
                opacity = 1;
            } else {
                opacity = 0.3;
            }
        } else {
            opacity = 0.3;
        }
        return opacity;
    };
    //{statusOrder[0] ? (statusOrder[0].name === STATUS_ORDER[0].compare ? getTimeOrder(statusOrder[0].time) : "--") : "--"}
    const validStatus = (status) => {
        let statusTime = "--";
        if (status && status.name) {
            if (status.name === STATUS_ORDER[0].compare || status.name === STATUS_ORDER[1].compare || status.name === STATUS_ORDER[2].compare || status.name === STATUS_ORDER[3].compare) {
                statusTime = getTimeOrder(statusOrder[0].time);
            }
        }
        return statusTime;
    };
    return (
        <section className="background back-white" style={{ paddingTop: 100, paddingBottom: 80 }}>
            <div className="center_flex">
                <div className="order-lookup-wrapper">
                    <div className="c_flex" style={{ alignItems: "center", width: "100%", gap: 10, padding: "0 15px" }}>
                        <input
                            placeholder="Nhập mã đơn hàng của bạn cần theo dõi"
                            style={{ flex: 1, borderRadius: 5 }}
                            value={orderId || ""}
                            onChange={(e) => {
                                setOrderId(e.target.value);
                            }}
                            onKeyDown={(e) => {
                                if (e.keyCode === 13) {
                                    hanldeSubmit(orderId);
                                }
                            }}
                        />
                        <button
                            onClick={() => {
                                hanldeSubmit(orderId);
                            }}
                            type="button"
                            style={{
                                textAlign: "center",
                                width: mobileMode ? 50 : 180,
                                height: mobileMode ? 50 : 50,
                                borderRadius: "0.5rem",
                                alignItems: "center",
                                backgroundColor: "var(--primary)",
                                color: "#fff",
                                cursor: "pointer",
                            }}
                            className="center_flex "
                        >
                            {" "}
                            {mobileMode ? (
                                <i class="fa-solid fa-magnifying-glass" style={{ fontSize: 18 }}></i>
                            ) : (
                                <span style={{ fontWeight: 700, fontSize: mobileMode ? 14 : 16 }}>{"Theo dõi đơn hàng"}</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            {isLoadingCircle && (
                <div className="center_flex" style={{ display: "flex", paddingTop: 100 }}>
                    <BallTriangle stroke="var(--primary)" />
                </div>
            )}
            {notFound && (
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 15, paddingTop: 50 }}>
                    <img src="/images/notfound.svg" alt="" style={{ width: mobileMode ? 80 : 100 }} />
                    <span style={{ color: "rgb(149, 155, 164)", fontSize: 15 }}>Không tìm thấy đơn hàng nào!</span>
                </div>
            )}
            {orderInfo && orderInfo?.id && !notFound && (
                <>
                    <div style={{ height: "20px", background: "#f6f9fc" }}></div>
                    <div className="center_flex">
                        <div className="order-lookup-content">
                            <div className="container non-radius" style={{ borderRadius: 10, padding: 0, background: "#fff" }}>
                                <div style={{ flexDirection: "column" }} className="f_flex">
                                    <div className="" style={{ display: "block" }}>
                                        {/* {orderInfoComponent()} */}
                                        <div className="order-wrapper order-detail-container" style={{ flex: 0.35 }}>
                                            {/* <h3 style={{ fontSize: mobileMode ? "1rem" : "1.3rem" }}>Thông tin giao hàng</h3> */}
                                            {/* <div className="f_flex order-detail-info">
                                    <i className="fa-solid fa-circle" style={{ fontSize: "0.7rem", lineHeight: 2, color: "green" }}></i>
                                    <div className="flex-collumn">
                                        <span style={{ color: "green", fontWeight: 600 }}>Giao hàng thành công</span>
                                        <span>08-08-2022 16:30</span>
                                    </div>
                                </div> */}

                                            <div className="f_flex order-detail-adrress">
                                                <i style={{ color: "var(--primary)", lineHeight: 2, fontSize: 12 }} className="fa-solid fa-circle"></i>
                                                <div className="flex-collumn">
                                                    <span>Mã đơn hàng:</span>
                                                    <span> {orderInfo.id} </span>
                                                </div>
                                            </div>
                                            <div className="f_flex order-detail-adrress" style={{ marginTop: 15 }}>
                                                <i style={{ color: "var(--primary)", lineHeight: 2 }} className="fa-regular fa-clock"></i>
                                                <div className="flex-collumn">
                                                    <span>Ngày đặt hàng:</span>
                                                    <span> {orderInfo?.time?.split(" ")[0]} </span>
                                                </div>
                                            </div>
                                            <div className="f_flex order-detail-adrress" style={{ marginTop: 15 }}>
                                                <i style={{ color: "var(--primary)", lineHeight: 2 }} className="fa-solid fa-location-dot"></i>
                                                <div className="flex-collumn">
                                                    <span>Địa chỉ nhận hàng:</span>
                                                    <span>Building {orderInfo.buildingName} Vinhomes Green Park</span>
                                                </div>
                                            </div>
                                        </div>
                                        {<div style={{ height: "10px", background: "#f6f9fc" }}></div>}
                                        {/* {productListComponent()} */}
                                        <div className="order-wrapper" style={{ flex: 0.65 }}>
                                            <h3 style={{ fontSize: mobileMode ? "1rem" : "1.3rem", display: "flex", alignItems: "center", gap: 20 }}>
                                                Tiến độ
                                                {getStatusCancel(statusOrder) && (
                                                    <div className="center_flex" style={{ background: getStatusColor("5"), borderRadius: "20px", padding: "7px 18px" }}>
                                                        <span className="order-store-status" style={{ fontSize: 15 }}>
                                                            {getStatusName("5")}
                                                        </span>
                                                    </div>
                                                )}
                                            </h3>
                                            <div className="f_flex" style={{ gap: 20 }}>
                                                <div className="f_flex" style={{ gap: 9, padding: "24px 10px 10px 10px", flexDirection: "column", alignItems: "center" }}>
                                                    <div style={{ opacity: getOpacity(statusOrder[0]) }}>
                                                        <i className="fa-regular fa-circle-dot" style={{ color: "#1cc461", boxShadow: "0 0 0 2px rgb(27 196 97 / 30%)", borderRadius: "50%" }}></i>
                                                    </div>
                                                    <div className="line" style={{ opacity: getOpacity(statusOrder[0]) }}></div>
                                                    <div style={{ opacity: getOpacity(statusOrder[0]) }}>
                                                        <i className="fa-regular fa-circle-dot" style={{ color: "#1cc461", boxShadow: "0 0 0 2px rgb(27 196 97 / 30%)", borderRadius: "50%" }}></i>
                                                    </div>
                                                    <div className="line" style={{ opacity: getOpacity(statusOrder[0]) }}></div>
                                                    <div style={{ opacity: getOpacity(statusOrder[0]) }}>
                                                        <i className="fa-regular fa-circle-dot" style={{ color: "#1cc461", boxShadow: "0 0 0 2px rgb(27 196 97 / 30%)", borderRadius: "50%" }}></i>
                                                    </div>
                                                    <div className="line" style={{ opacity: getOpacity(statusOrder[0]) }}></div>
                                                    <div style={{ opacity: getOpacity(statusOrder[0]) }}>
                                                        <i className="fa-regular fa-circle-dot" style={{ color: "#1cc461", boxShadow: "0 0 0 2px rgb(27 196 97 / 30%)", borderRadius: "50%" }}></i>
                                                    </div>
                                                    <div className="line" style={{ opacity: getOpacity(statusOrder[0]) }}></div>
                                                    <div style={{ opacity: getOpacity(statusOrder[0]) }}>
                                                        <i className="fa-regular fa-circle-dot" style={{ color: "#1cc461", boxShadow: "0 0 0 2px rgb(27 196 97 / 30%)", borderRadius: "50%" }}></i>
                                                    </div>
                                                </div>
                                                <div className="f_flex" style={{ gap: 25, padding: "10px 10px", flexDirection: "column" }}>
                                                    <div className="f_flex status-icon" style={{ opacity: getOpacity(statusOrder[0]) }}>
                                                        <img src="https://cdn-icons-png.flaticon.com/512/3338/3338721.png" alt="" style={{ width: 38, height: 38 }} />
                                                        <div className="f_flex" style={{ flexDirection: "column", paddingLeft: 4 }}>
                                                            <span className="status-info-time">{validStatus(statusOrder[0])}</span>
                                                            <span className="status-info-name">Đặt hàng thành công</span>
                                                        </div>
                                                    </div>
                                                    <div className="f_flex status-icon" style={{ opacity: getOpacity(statusOrder[0]) }}>
                                                        <img src="https://cdn-icons-png.flaticon.com/512/3338/3338671.png" alt="" style={{ width: 42, height: 42 }} />
                                                        <div className="f_flex" style={{ flexDirection: "column" }}>
                                                            <span className="status-info-time">{validStatus(statusOrder[0])}</span>
                                                            <span className="status-info-name">Đang chuẩn bị</span>
                                                        </div>
                                                    </div>
                                                    <div className="f_flex status-icon" style={{ opacity: getOpacity(statusOrder[0]) }}>
                                                        <img src="https://cdn-icons-png.flaticon.com/512/3338/3338686.png" alt="" style={{ width: 38, height: 38 }} />
                                                        <div className="f_flex" style={{ flexDirection: "column", paddingLeft: 4 }}>
                                                            <span className="status-info-time">{validStatus(statusOrder[0])}</span>
                                                            <span className="status-info-name">Lấy hàng thành công</span>
                                                        </div>
                                                    </div>
                                                    <div className="f_flex status-icon" style={{ opacity: getOpacity(statusOrder[0]) }}>
                                                        <img src="https://cdn-icons-png.flaticon.com/512/3338/3338599.png" alt="" style={{ width: 38, height: 38 }} />
                                                        <div className="f_flex" style={{ flexDirection: "column", paddingLeft: 4 }}>
                                                            <span className="status-info-time">{validStatus(statusOrder[0])}</span>
                                                            <span className="status-info-name">Đang giao</span>
                                                        </div>
                                                    </div>
                                                    <div className="f_flex status-icon" style={{ opacity: getOpacity(statusOrder[0]) }}>
                                                        <img src="https://cdn-icons-png.flaticon.com/512/3338/3338590.png" alt="" style={{ width: 38, height: 38 }} />
                                                        <div className="f_flex" style={{ flexDirection: "column", paddingLeft: 4 }}>
                                                            <span className="status-info-time">{validStatus(statusOrder[0])}</span>
                                                            <span className="status-info-name">Hoàn thành</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {<div style={{ height: "10px", background: "#f6f9fc" }}></div>}
                                        <div className="order-wrapper" style={{ padding: "", flex: 0.65 }}>
                                            <div>
                                                <div className="order-store">
                                                    <span className="order-store-title">{orderInfo.storeName}</span>
                                                    <div className="f_flex" style={{ gap: 15 }}></div>
                                                </div>
                                                {productOrder.map((item, index) => {
                                                    return (
                                                        <div className="order" key={index} style={{}}>
                                                            <div className="" style={{}}>
                                                                <span className="order-text-count">{item.quantity}x</span>
                                                            </div>
                                                            <div style={{ flex: 1, flexDirection: "column" }} className="f_flex">
                                                                <span className="order-text-name">{item.productName}</span>
                                                                {/* <span className="order-text-cate">Nước Uống</span> */}
                                                            </div>
                                                            <div>
                                                                <span className="order-text-price" style={{ display: "flex", alignItems: "center", gap: 3 }}>
                                                                    {item.price?.toLocaleString()}
                                                                    <span style={{ fontSize: mobileMode ? "0.8rem" : "0.9rem", fontWeight: 500 }}>₫</span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    {<div style={{ height: "10px", background: "#f6f9fc" }}></div>}
                                    <div className="" style={{ display: "block" }}>
                                        <div style={{ flex: 0.65, background: "#f6f9fc" }}></div>
                                        {/* {mobileMode ? "" : <div style={{ width: "10px", background: "#f6f9fc" }}></div>} */}
                                        <div className="order-wrapper order-detail-container" style={{ flex: 0.35 }}>
                                            <h3 style={{ fontSize: mobileMode ? "1.1rem" : "1.3rem", paddingBottom: 10 }}>Chi tiết thanh toán</h3>

                                            {/* <div className="order-detail-total">
                                    <div className="order-detail-total-titlte">
                                        Mã đơn hàng:
                                        <span className="order-detail-total-text" style={{ fontWeight: 400, marginLeft: 10 }}>
                                            {orderInfo.id || "--"}
                                        </span>
                                    </div>
                                </div> */}
                                            <div className="order-detail-total">
                                                <div className="order-detail-total-titlte">
                                                    Hình thức thanh toán:
                                                    <span className="order-detail-total-text" style={{ fontWeight: 400, marginLeft: 10 }}>
                                                        {orderInfo.paymentName || "--"}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="order-detail-total">
                                                <div className="order-detail-total-titlte">
                                                    Hình thức giao hàng:
                                                    <span className="order-detail-total-text" style={{ fontWeight: 400, marginLeft: 10 }}>
                                                        {"--"}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="order-detail-total">
                                                <div className="order-detail-total-titlte">
                                                    Người giao hàng:
                                                    <span className="order-detail-total-text" style={{ fontWeight: 400, marginLeft: 10 }}>
                                                        {"--"}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="order-detail-total">
                                                <div className="order-detail-total-titlte">
                                                    Liên hệ người giao hàng:
                                                    <span className="order-detail-total-text" style={{ fontWeight: 400, marginLeft: 10 }}>
                                                        {"--"}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="order-detail-total">
                                                <div className="order-detail-total-titlte">
                                                    Tổng tiền hàng:
                                                    <span className="order-detail-total-text" style={{ fontWeight: 400, marginLeft: 10, display: "flex", alignItems: "center", gap: 3 }}>
                                                        {(orderInfo.total - orderInfo.shipCost).toLocaleString() || "--"}
                                                        <span style={{ fontSize: mobileMode ? "0.8rem" : "0.9rem", fontWeight: 500 }}>₫</span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="order-detail-total" style={{ paddingBottom: 15 }}>
                                                <div className="order-detail-total-titlte">
                                                    Phí vận chuyển:
                                                    <span className="order-detail-total-text" style={{ fontWeight: 400, marginLeft: 10, display: "flex", alignItems: "center", gap: 3 }}>
                                                        {orderInfo.shipCost?.toLocaleString() || "--"}
                                                        <span style={{ fontSize: mobileMode ? "0.8rem" : "0.9rem", fontWeight: 500 }}>₫</span>
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="order-detail-total" style={{ borderTop: "1px solid rgb(230, 230, 230)", paddingTop: 15 }}>
                                                <div className="order-detail-total-titlte">
                                                    <span style={{ fontWeight: 700, color: "#000", fontSize: mobileMode ? "16px" : "18px" }}>Tổng cộng:</span>
                                                    <span
                                                        className="order-detail-text-price"
                                                        style={{ fontWeight: 700, marginLeft: 10, color: "#000", fontSize: mobileMode ? "16px" : "18px", display: "flex", gap: 3 }}
                                                    >
                                                        {orderInfo.total?.toLocaleString() || "--"}
                                                        <span style={{ fontSize: mobileMode ? "0.9rem" : ".95rem", fontWeight: 700 }}>₫</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
};

export default OrderLookupPage;
