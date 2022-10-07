import React, { useEffect } from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { TabMenuOrder } from "../common/header/TabMenuOrder";
import { IMAGE_NOTFOUND_v2 } from "../constants/Variable";
import { AppContext } from "../context/AppProvider";

export const OrderPage = () => {
    const { setIsHeaderOrder, setHeaderInfo, setisCartMain, isCartMain } = useContext(AppContext);
    useEffect(() => {
        setisCartMain(false);
        setIsHeaderOrder(true);
        setHeaderInfo({ isSearchHeader: false, title: "Lịch sử mua hàng" });
        console.log(isCartMain);
        return () => {
            setIsHeaderOrder(false);
        };
    }, [setIsHeaderOrder, setHeaderInfo, setisCartMain, isCartMain]);

    let history = useHistory();
    return (
        <>
            <section className="background back-white" style={{ paddingTop: 130, paddingBottom: 80, height: "100%" }}>
                <div className="container non-radius" style={{ borderRadius: 10 }}>
                    <div style={{ flexDirection: "column" }} className="f_flex">
                        {[1, 2].map((item) => {
                            return (
                                <div className="order-wrapper c_flex">
                                    <div className="f_flex" style={{ alignItems: "center", gap: 15 }}>
                                        <div className="order-img-wrapper">
                                            <img src={IMAGE_NOTFOUND_v2} alt="" />
                                        </div>
                                        <div className="order-store cusor" onClick={() => history.push("/order/1")}>
                                            <span className="order-store-title">Fresh Saigon </span>
                                            <span className="order-store-time">3 thg 10 2022, 20:05</span>
                                            <span className="order-store-btn" onClick={() => history.push("/order/1")}>
                                                Xem chi tiết
                                                <div>
                                                    <i class="fa-solid fa-arrow-right"></i>
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="order-store-title">100.000đ</span>
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
