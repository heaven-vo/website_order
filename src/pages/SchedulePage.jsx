import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import Select from "react-select";
import { useHistory, useLocation } from "react-router-dom";
import Slider from "react-slick";
import Rodal from "rodal";
import { postOrder } from "../apis/apiService";
import { CountDown } from "../common/Cart/CountDown";
import Loading from "../common/Loading/Loading";
import { LOCALSTORAGE_CART_NAME } from "../constants/Variable";
import { AppContext } from "../context/AppProvider";

const SchedulePage = () => {
    const { setIsHeaderOrder, setHeaderInfo, setisCartMain, mobileMode, Cart, userInfo, setCart } = useContext(AppContext);
    const [day, setDay] = useState("");
    const [total, setTotal] = useState("");
    const [hour, setHour] = useState("");
    const [building, setBuilding] = useState("");
    const [order, setOrder] = useState(null);
    const [fullTime, setFullTime] = useState("");
    const [visiblePopupComfirm, setVisiblePopupComfirm] = useState(false);
    const [isLoadingOrder, setisLoadingOrder] = useState(false);
    let history = useHistory();
    let location = useLocation();
    const hours = [
        { value: "0", label: "08:00 - 9:00" },
        { value: "1", label: "09:00 - 10:00" },
        { value: "2", label: "10:00 - 11:00" },
        { value: "3", label: "11:00 - 12:00" },
        { value: "4", label: "12:00 - 13:00" },
        { value: "5", label: "13:00 - 14:00" },
        { value: "6", label: "14:00 - 15:00" },
        { value: "7", label: "15:00 - 16:00" },
        { value: "9", label: "16:00 - 17:00" },
    ];
    function converDate(data) {
        var dd = String(data.getDate()).padStart(2, "0");
        var mm = String(data.getMonth()).padStart(2, "0");
        var yy = String(data.getFullYear()).padStart(2, "0");
        return {
            dd: dd,
            fullTime: dd + "/" + mm + "/" + yy,
        };
    }
    function getDate() {
        Date.prototype.addDays = function (days) {
            var date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        };
        var date = new Date();

        let schedule = [];
        for (let index = 0; index < 15; index++) {
            schedule = [...schedule, { day: converDate(date.addDays(index)).dd, id: index, weekDay: date.addDays(index).toString().split(" ")[0], fullTime: converDate(date.addDays(index)).fullTime }];
        }
        // console.log(date.addDays(0));
        return schedule;
    }

    useEffect(() => {
        setHeaderInfo({ isSearchHeader: false, title: "Lịch giao hàng" });
        setisCartMain(false);
        setIsHeaderOrder(false);
        if (location.state) {
            let { order } = location.state;
            console.log("check");
            setOrder(order);
        } else {
            history.push("/checkout");
        }
        return () => {
            if (Cart.length > 0) {
                setisCartMain(true);
            }
        };
    }, [setHeaderInfo, setIsHeaderOrder, setisCartMain, Cart, location.state, history]);
    const options = hours.map((time) => {
        return { value: time.value, label: time.label };
    });
    useEffect(() => {
        setisCartMain(false);
        setDay(getDate()[0].day);
        setFullTime(getDate()[0].fullTime);
        setHour(options[0]);
        return () => {};
    }, []);
    const SampleNextArrow = (props) => {
        const { onClick } = props;
        return (
            <div className="control-btn" onClick={onClick}>
                <button className="next">
                    <i className="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        );
    };
    const SamplePrevArrow = (props) => {
        const { onClick } = props;
        return (
            <div className="control-btn" onClick={onClick}>
                <button className="prev">
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
            </div>
        );
    };

    const settings = {
        dots: false,
        slidesToShow: mobileMode ? 5 : 9,
        slidesToScroll: 5,
        autoplay: false,
        swipeToSlide: false,
        infinite: false,
        swipe: false,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    // slidesPerRow: 1,
                    swipe: true,
                    nextArrow: "",
                    prevArrow: "",
                    rows: 1,
                },
            },
        ],
    };

    console.log({ options });
    const hanldeOrder = () => {
        // setisLoadingOrder(true);

        console.log({ order });
        // postOrder(order)
        //     .then((res) => {
        //         if (res.data) {
        //             localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify([]));
        //             setCart([]);
        //             setisLoadingOrder(false);

        //             history.push("/");
        //         }
        //         return res;
        //     })
        //     .then((res) => {
        //         if (res.data) {
        //             const order = res.data;
        //         }
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //         setisLoadingOrder(false);
        //     });
    };
    return (
        <>
            <Loading isLoading={isLoadingOrder} />
            <Rodal
                height={300}
                width={mobileMode ? 350 : 400}
                visible={visiblePopupComfirm}
                showCloseButton={false}
                onClose={() => {
                    setVisiblePopupComfirm(false);
                }}
                style={{ borderRadius: 10 }}
            >
                <div style={{ padding: "5px 0 10px 0", textAlign: "center", display: "flex", flexDirection: "column" }}>
                    <span className="" style={{ fontSize: mobileMode ? 20 : 23, fontWeight: 700, textAlign: "center", color: "rgb(82, 182, 91)" }}>
                        Đơn hàng sẽ được gửi đi trong
                    </span>
                    <span className="" style={{ fontSize: mobileMode ? 20 : 23, fontWeight: 700, textAlign: "center", color: "rgb(82, 182, 91)" }}>
                        {visiblePopupComfirm ? (
                            <CountDown
                                callbackOrder={() => {
                                    hanldeOrder();
                                    setVisiblePopupComfirm(false);
                                }}
                            />
                        ) : (
                            ""
                        )}{" "}
                        giây...
                    </span>
                </div>
                <div style={{ padding: "5px 0" }}>
                    <span style={{ fontSize: mobileMode ? 16 : 17, fontWeight: 600 }}>Địa chỉ giao hàng:</span>
                    <span style={{ fontSize: mobileMode ? 16 : 17, fontWeight: 400 }}> Building {building} Vinhomes Grand Park</span>
                </div>
                <div style={{ padding: "5px 0" }}>
                    <span style={{ fontSize: mobileMode ? 16 : 17, fontWeight: 600 }}>Thời gian giao hàng dự kiến: </span>
                    <span style={{ fontSize: mobileMode ? 16 : 17, fontWeight: 400 }}>{hour !== null ? hour.label : ""}</span>
                </div>
                <div style={{ padding: "5px 0" }}>
                    <span style={{ fontSize: mobileMode ? 16 : 17, fontWeight: 600 }}>Tổng tiền đơn hàng:</span>
                    <span style={{ fontSize: mobileMode ? 16 : 17, fontWeight: 400 }}>{" " + total.toLocaleString()}</span>
                </div>
                <div className="f_flex" style={{ width: " 100%", justifyContent: "space-between", paddingTop: 20, gap: 15 }}>
                    <button
                        style={{ flex: 1, padding: 18, fontSize: "1rem", cursor: "pointer", fontWeight: 700, borderRadius: 10, background: "rgb(220,220,220)" }}
                        onClick={(e) => {
                            e.preventDefault();
                            setVisiblePopupComfirm(false);
                        }}
                    >
                        Quay lại
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            hanldeOrder();
                            setVisiblePopupComfirm(false);
                        }}
                        style={{ flex: 1, padding: 18, fontSize: "1rem", cursor: "pointer", fontWeight: 700, borderRadius: 10, background: "var(--primary)" }}
                    >
                        OK
                    </button>
                </div>
            </Rodal>
            <div className="container d_flex  schedule-padding" style={{ flexDirection: "column", gap: 10 }}>
                <div className="schedule-wrapper">
                    <div className="schedule-title">
                        <h3 style={{ fontWeight: 700, paddingBottom: 30, display: "flex", gap: 5 }}>
                            Chọn ngày giao hàng <h4 style={{ color: "red" }}>*</h4>
                        </h3>
                    </div>
                    <div style={{ background: "#fff" }}>
                        <Slider {...settings}>
                            {getDate().map((item, index) => {
                                return (
                                    <div
                                        className={`f_flex schedule-item ${day === item.day && "schedule-item-active"}`}
                                        onClick={() => {
                                            setDay(item.day);
                                            setFullTime(item.fullTime);
                                            setHour("");
                                        }}
                                    >
                                        <span className="schedule-week"> {item.weekDay}</span>
                                        <span className="schedule-day">{item.day}</span>
                                    </div>
                                );
                            })}
                        </Slider>
                    </div>
                    <div className="schedule-title">
                        <h3 style={{ fontWeight: 700, paddingTop: 30, display: "flex", gap: 5 }}>
                            Chọn giờ nhận hàng <h4 style={{ color: "red" }}>*</h4>
                        </h3>
                    </div>
                    <div style={{ paddingTop: 20 }}>
                        <Select
                            options={options}
                            placeholder="Chọn giờ"
                            onChange={(e) => {
                                setHour(e);
                            }}
                            value={hour}
                        />
                    </div>
                    <div className="center_flex" style={{ gap: 20, paddingTop: 30 }}>
                        <button
                            onClick={() => {
                                history.goBack();
                            }}
                            type="button"
                            disabled={isLoadingOrder}
                            style={{
                                textAlign: "center",
                                width: "100%",
                                height: 45,
                                borderRadius: "0.5rem",
                                alignItems: "center",
                                border: "1px solid var(--primary)",
                                backgroundColor: "#fff",
                                color: "var(--primary)",
                            }}
                            className="center_flex checkout-btn"
                        >
                            <span style={{ fontWeight: 700, fontSize: 18 }}>Quay lại</span>
                        </button>
                        <button
                            onClick={() => {
                                setBuilding(userInfo.building.label);
                                setTotal(order.total);
                                setVisiblePopupComfirm(true);
                            }}
                            type="button"
                            disabled={isLoadingOrder}
                            style={{
                                textAlign: "center",
                                width: "100%",
                                height: 45,
                                borderRadius: "0.5rem",
                                alignItems: "center",
                                backgroundColor: isLoadingOrder ? "#f5f5f5" : "var(--primary)",
                            }}
                            className="center_flex checkout-btn"
                        >
                            <span style={{ fontWeight: 700, fontSize: 18 }}>Đặt hàng</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SchedulePage;
