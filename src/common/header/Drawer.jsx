// @flow
import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import { caculatorVND } from "../../constants/Caculator";
import { getStatusColor, getStatusName, LOCALSTORAGE_USER_LOGIN } from "../../constants/Variable";
// import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppProvider";
// import "./Drawer.scss";
export const DrawerContent = () => {
    // const history = useNavigate();
    const { setIsOpenDrawer, auth, setAuth, orderDrawer } = React.useContext(AppContext);
    const [isOpenCategory, setisOpenCategory] = React.useState(false);
    let history = useHistory();
    const data = [
        { id: 1, cateImg: "./images/category/cat-1.png", cateName: "Trứng & Sữa" },
        { id: 2, cateImg: "./images/category/cat-2.png", cateName: "Thịt Tươi Sống" },
        { id: 3, cateImg: "./images/category/cat-1.png", cateName: "Các Loại Hạt" },
        { id: 4, cateImg: "./images/category/cat-2.png", cateName: "Thịt Hải Sản Đóng Hộp" },
        { id: 5, cateImg: "./images/category/cat-1.png", cateName: "Rau Củ Tươi" },
        { id: 6, cateImg: "./images/category/cat-2.png", cateName: "Rượu Bia" },
    ];
    const hanldeLogout = () => {
        setAuth({ userId: "", isLogin: false, userPhone: "" });
        localStorage.setItem(LOCALSTORAGE_USER_LOGIN, JSON.stringify({ userId: "", isLogin: false, userPhone: "" }));
    };
    return (
        <div className="drawer__wrapper">
            {auth?.isLogin ? (
                <>
                    <div className="drawer__wrapper__item" style={{ justifyContent: "start", gap: 10 }}>
                        <img src="/images/account.png" alt="" style={{ width: 44, height: 44, borderRadius: 50 }} />
                        <div>
                            <span>{auth.userPhone ? "+" + auth.userPhone : ""}</span>
                        </div>
                    </div>

                    <Link to={"/"} onClick={() => setIsOpenDrawer(false)}>
                        <div className="drawer__wrapper__item" style={{ justifyContent: "start", gap: 10 }}>
                            <div className="center_flex" style={{ background: "#66bb6a", color: "#fff", width: 27, height: 27, borderRadius: 50 }}>
                                <i style={{ fontSize: 13, marginLeft: 2 }} className="fa-solid fa-list-ul"></i>
                            </div>
                            <h4>Thực đơn</h4>
                        </div>
                    </Link>
                    <Link to={"/order"} onClick={() => setIsOpenDrawer(false)}>
                        <div className="drawer__wrapper__item" style={{ justifyContent: "start", gap: 10 }}>
                            <img src="/images/order.svg" alt="" style={{ width: 27, height: 27, borderRadius: 50 }} />
                            <div>
                                <h4 style={{ fontSize: 15 }}>Lịch sử mua hàng</h4>
                            </div>
                        </div>
                    </Link>
                    <Link to={"/login"} onClick={() => setIsOpenDrawer(false)}>
                        <div
                            className="drawer__wrapper__item"
                            style={{ justifyContent: "start", gap: 10 }}
                            onClick={() => {
                                hanldeLogout();
                            }}
                        >
                            <div className="center_flex" style={{ background: "var(--red)", color: "#fff", width: 27, height: 27, borderRadius: 50 }}>
                                <i style={{ fontSize: 13, marginLeft: 2 }} className="fa-solid fa-right-from-bracket"></i>
                            </div>
                            <h4>Đăng xuất</h4>
                        </div>
                    </Link>
                    {orderDrawer.length > 0 && (
                        <>
                            <div style={{ padding: "20px 10px 10px 10px" }}>
                                <span style={{ fontWeight: 700 }}>
                                    Bạn có <span style={{ color: "var(--primary)" }}>{orderDrawer?.length || "0"}</span> đơn hàng{" "}
                                </span>
                            </div>
                            {orderDrawer.map((item, index) => {
                                return (
                                    <div
                                        className="box cusor"
                                        key={index}
                                        style={{ width: "100%", padding: "0px 5px 7px 5px" }}
                                        onClick={() => {
                                            history.push(`/order/${item.id}`);
                                            setIsOpenDrawer(false);
                                        }}
                                    >
                                        <div className="product mtop" style={{ margin: 5 }}>
                                            <div className="order-wrapper f_flex" style={{ justifyContent: "space-between", padding: "5px", margin: 0 }}>
                                                <div className="f_flex order-info" style={{ gap: 15 }}>
                                                    <div className="order-store cusor" style={{ justifyContent: "flex-start" }}>
                                                        <span className="order-store-title" style={{ fontSize: "15px", paddingBottom: 0 }}>
                                                            {item.storeName}
                                                        </span>
                                                        <span className="order-store-time" style={{ fontSize: "14px" }}>
                                                            {item.time}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="f_flex order-status-wrapper" style={{ flexDirection: "column", gap: 10, width: 115 }}>
                                                    <div className="center_flex" style={{ background: getStatusColor(item.statusId), borderRadius: "20px", padding: "7px 13px" }}>
                                                        <span className="order-store-status" style={{ fontSize: "12px" }}>
                                                            {getStatusName(item.statusId)}
                                                        </span>
                                                    </div>
                                                    <span className="order-store-title" style={{ display: "flex", gap: 3, fontSize: "16px" }}>
                                                        {caculatorVND(item.total)}
                                                        <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>₫</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </>
                    )}
                </>
            ) : (
                <Link to={"/login"} onClick={() => setIsOpenDrawer(false)}>
                    <div className="drawer__wrapper__item" style={{ justifyContent: "start", gap: 10 }}>
                        <img src="/images/login.svg" alt="" style={{ width: 30, height: 30, borderRadius: 50 }} />
                        <div>
                            <span style={{ fontSize: 16 }}>Đăng nhập</span>
                        </div>
                    </div>
                </Link>
            )}
        </div>
    );
};
