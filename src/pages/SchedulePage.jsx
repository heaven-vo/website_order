import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import Select from "react-select";
import { useHistory, useLocation } from "react-router-dom";
import Slider from "react-slick";
import Rodal from "rodal";
import { getListProductByCateId, postOrder } from "../apis/apiService";
import { CountDown } from "../common/Cart/CountDown";
import Loading from "../common/Loading/Loading";
import { LOCALSTORAGE_CART_NAME } from "../constants/Variable";
import { AppContext } from "../context/AppProvider";
import { ProductList } from "../components/products/ProductList";
import ScrollContainer from "react-indiana-drag-scroll";

const SchedulePage = () => {
    const { setIsHeaderOrder, setHeaderInfo, setisCartMain, mobileMode, Cart, userInfo, setCart, setOpentModalSuccess, setOpentModalError, setMessError, setorderIdSuccess } = useContext(AppContext);
    const [day, setDay] = useState("");
    const [fullTime, setFullTime] = useState("");
    const [isLoadingCircle, setIsLoadingCircle] = useState(true);
    const [products, setProducts] = useState(null);
    const [isLoadingOrder, setisLoadingOrder] = useState(false);
    const [tabActive, setTabActive] = useState(0);
    let history = useHistory();
    let location = useLocation();
    // const hours = [
    //     { value: "8", label: "08:00 - 9:00" },
    //     { value: "9", label: "09:00 - 10:00" },
    //     { value: "10", label: "10:00 - 11:00" },
    //     { value: "11", label: "11:00 - 12:00" },
    //     { value: "12", label: "12:00 - 13:00" },
    //     { value: "13", label: "13:00 - 14:00" },
    //     { value: "14", label: "14:00 - 15:00" },
    //     { value: "15", label: "15:00 - 16:00" },
    //     { value: "16", label: "16:00 - 17:00" },
    //     { value: "17", label: "17:00 - 18:00" },
    //     { value: "18", label: "18:00 - 19:00" },
    //     { value: "19", label: "19:00 - 20:00" },
    //     { value: "20", label: "20:00 - 20:00" },
    //     // { value: "12", label: "19:00 - 20:00" },
    // ];
    let date = new Date();
    // const optionsHours = hours.filter((hour) => {
    //     if (parseInt(hour.label.split(" - ")[1]) >= date.getHours() + 1) {
    //         return { value: hour.value, label: hour.label };
    //     }
    // });
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
        for (let index = 0; index < 9; index++) {
            schedule = [...schedule, { day: converDate(date.addDays(index)).dd, id: index, weekDay: date.addDays(index).toString().split(" ")[0], fullTime: converDate(date.addDays(index)).fullTime }];
        }
        // console.log(date.addDays(0));
        return schedule;
    }

    useEffect(() => {
        setHeaderInfo({ isSearchHeader: true, title: "" });
        if (Cart.length > 0) {
            setisCartMain(true);
        } else {
            setisCartMain(false);
        }
        setIsHeaderOrder(false);
        if (location.state) {
            setDay(getDate()[2].day);
        }
        getListProductByFilter("e981f0c4-3633-4122-b770-ccaabb22e474", "c595cb7e-1813-484f-a97e-b5698bc7e7a6");
        return () => {
            if (Cart.length > 0) {
                setisCartMain(true);
            }
        };
    }, [setHeaderInfo, setIsHeaderOrder, setisCartMain, Cart, location.state]);

    useEffect(() => {
        setisCartMain(false);
        setDay(getDate()[0].day);
        // setFullTime(getDate()[0].fullTime);
        // setHour(optionsHours[0] || "");
        // setOptionTime(optionsHours);
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

    // const handleValidate = () => {
    //     let isValid = true;
    //     if (!hour) {
    //         isValid = false;
    //     }
    //     if (hour) {
    //         setHourState(true);
    //     } else {
    //         setHourState(false);
    //     }
    //     if (isValid) {
    //         setVisiblePopupComfirm(true);
    //     }
    // };
    // const hanldeOrder = () => {
    //     setisLoadingOrder(true);

    //     let newOrder = { ...order, durationId: hour.value.toString() };
    //     console.log({ newOrder });
    //     postOrder(newOrder)
    //         .then((res) => {
    //             if (res.data) {
    //                 const { statusCode } = res.data;
    //                 const { message } = res.data;

    //                 if (statusCode === "Fail") {
    //                     setMessError(message);
    //                     setOpentModalError(true);
    //                     setisLoadingOrder(false);
    //                 } else {
    //                     let orderId = "";
    //                     if (res.data.data) {
    //                         const { id } = res.data.data;
    //                         orderId = id;
    //                     }
    //                     setorderIdSuccess(orderId);
    //                     setOpentModalSuccess(true);
    //                     setisLoadingOrder(false);
    //                     localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify([]));
    //                     setCart([]);
    //                 }

    //                 console.log(res.data);
    //                 // setCart([]);
    //             }
    //         })
    //         .catch((error) => {
    //             setMessError(null);
    //             console.log(error);
    //             setOpentModalError(true);
    //             setisLoadingOrder(false);
    //         });
    // };
    const colourStyles = {
        control: (styles) => ({
            ...styles,
            // width: 150,
            borderRadius: "1rem",
            padding: "0 5px",
            fontSize: mobileMode ? 14 : 16,
        }),
        menuList: (styles) => ({
            ...styles,
        }),
    };
    const getListProductByFilter = (menuId, cateId) => {
        getListProductByCateId(menuId, cateId, 1, 100)
            .then((res) => {
                if (res.data) {
                    const category = res.data;
                    const productList = category.listProducts || [];
                    const title = category.name;

                    setProducts(productList);
                    setIsLoadingCircle(false);
                } else {
                    setIsLoadingCircle(false);
                }
            })
            .catch((error) => {
                console.log(error);
                setProducts([]);
                setIsLoadingCircle(false);
            });
    };

    return (
        <>
            <Loading isLoading={isLoadingOrder} />
            {/* <Rodal
                height={mobileMode ? 300 : 320}
                width={mobileMode ? 350 : 400}
                visible={visiblePopupComfirm}
                showCloseButton={false}
                onClose={() => {
                    setVisiblePopupComfirm(false);
                }}
                style={{ borderRadius: 10 }}
            >
                <div style={{ padding: "5px 0 10px 0", textAlign: "center", display: "flex", flexDirection: "column" }}>
                    <span className="" style={{ fontSize: mobileMode ? 18 : 20, fontWeight: 700, textAlign: "center", color: "rgb(82, 182, 91)" }}>
                        Đơn hàng sẽ được gửi đi trong
                    </span>
                    <span className="" style={{ fontSize: mobileMode ? 18 : 20, fontWeight: 700, textAlign: "center", color: "rgb(82, 182, 91)" }}>
                        {visiblePopupComfirm ? (
                            <CountDown
                                callbackOrder={() => {
                                    // hanldeOrder();
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
                    <span style={{ fontSize: mobileMode ? 14 : 17, fontWeight: 600 }}>Địa chỉ giao hàng:</span>
                    <span style={{ fontSize: mobileMode ? 14 : 17, fontWeight: 400 }}> Building {building} Vinhomes Grand Park</span>
                </div>
                <div style={{ padding: "5px 0" }}>
                    <span style={{ fontSize: mobileMode ? 14 : 17, fontWeight: 600 }}>Thời gian giao hàng dự kiến: </span>
                    <span style={{ fontSize: mobileMode ? 14 : 17, fontWeight: 400 }}>
                        {hour !== null ? hour.label : ""}, {fullTime !== null ? fullTime : ""}
                    </span>
                </div>
                <div style={{ padding: "5px 0" }}>
                    <span style={{ fontSize: mobileMode ? 14 : 17, fontWeight: 600 }}>Tổng tiền đơn hàng:</span>
                    <span style={{ fontSize: mobileMode ? 14 : 17, fontWeight: 400 }}>{" " + total.toLocaleString()}</span>
                </div>
                <div className="f_flex rodal-delet-cart" style={{ width: " 100%", justifyContent: "space-between", paddingTop: 20, gap: 15 }}>
                    <button
                        style={{ flex: 1, padding: 14, fontSize: "1rem", cursor: "pointer", fontWeight: 700, borderRadius: 10, background: "rgb(220,220,220)", height: 50, color: "#000" }}
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
                        style={{ flex: 1, padding: 14, fontSize: "1rem", cursor: "pointer", fontWeight: 700, borderRadius: 10, background: "var(--primary)", height: 50, color: "#fff" }}
                    >
                        Đồng ý
                    </button>
                </div>
            </Rodal> */}
            <div className="container d_flex  schedule-padding" style={{ flexDirection: "column", gap: 10 }}>
                <div className="schedule-wrapper">
                    {/* <div className="schedule-title">
                        <h3 style={{ fontWeight: 700, paddingBottom: 30, display: "flex", gap: 5 }}>
                            Chọn ngày giao hàng <h4 style={{ color: "red" }}>*</h4>
                        </h3>
                    </div> */}
                    <div style={{ background: "#fff", paddingLeft: 15, paddingRight: 15, paddingBottom: 15 }}>
                        <Slider {...settings}>
                            {getDate().map((item, index) => {
                                return (
                                    <div
                                        className={`f_flex schedule-item ${day === item.day && "schedule-item-active"}`}
                                        onClick={() => {
                                            setDay(item.day);
                                            setFullTime(item.fullTime);
                                            // if (item.day.toString() === date.getDate().toString()) {
                                            //     setOptionTime(optionsHours);
                                            // } else {
                                            //     setOptionTime(hours);
                                            // }
                                            // console.log();
                                            // setHour("");
                                        }}
                                    >
                                        <span className="schedule-week"> {item.weekDay}</span>
                                        <span className="schedule-day">{item.day}</span>
                                    </div>
                                );
                            })}
                        </Slider>
                    </div>
                    {/* <div style={{ width: "100%", background: "rgb(246, 249, 252)", padding: 15, gap: 15, gridTemplateColumns: "repeat(7, 1fr)" }} className="schedule-category"> */}
                    {/* <div style={{ width: 150 }}>
                            <Select
                                // options={categoriesInMenu.length > 0 ? optionsBuilding : null}
                                placeholder="Danh mục"
                                isSearchable={false}
                                onChange={(e) => {}}
                                styles={colourStyles}
                            />
                        </div> */}
                    <ScrollContainer
                        className="schedule-category"
                        horizontal={true}
                        style={{ width: "100%", background: "rgb(246, 249, 252)", padding: 15, gap: 15, gridTemplateColumns: "repeat(7, 1fr)" }}
                    >
                        <div
                            style={{
                                background: "#fff",
                                borderRadius: "10px",
                                border: "1px solid rgb(204, 204, 204)",
                                width: mobileMode ? 120 : 130,
                                height: 40,
                                color: "rgb(128, 128, 128)",
                                fontSize: mobileMode ? 14 : 16,
                            }}
                            className={`center_flex cusor ${tabActive === 0 ? "active-search" : ""}`}
                            onClick={() => {
                                setTabActive(0);
                            }}
                        >
                            <span>Tất cả</span>
                        </div>
                        <div
                            style={{
                                background: "#fff",
                                borderRadius: "10px",
                                border: "1px solid rgb(204, 204, 204)",
                                width: mobileMode ? 120 : 130,
                                height: 40,
                                color: "rgb(128, 128, 128)",
                                fontSize: mobileMode ? 14 : 16,
                            }}
                            className={`center_flex cusor ${tabActive === 1 ? "active-search" : ""}`}
                            onClick={() => {
                                setTabActive(1);
                            }}
                        >
                            <span>Thịt, Hải sản</span>
                        </div>
                        <div
                            style={{
                                background: "#fff",
                                borderRadius: "10px",
                                border: "1px solid rgb(204, 204, 204)",
                                width: mobileMode ? 120 : 130,
                                height: 40,
                                color: "rgb(128, 128, 128)",
                                fontSize: mobileMode ? 14 : 16,
                            }}
                            className={`center_flex cusor ${tabActive === 2 ? "active-search" : ""}`}
                            onClick={() => {
                                setTabActive(2);
                            }}
                        >
                            <span>Đồ đông lạnh</span>
                        </div>
                        <div
                            style={{
                                background: "#fff",
                                borderRadius: "10px",
                                border: "1px solid rgb(204, 204, 204)",
                                width: mobileMode ? 120 : 130,
                                height: 40,
                                color: "rgb(128, 128, 128)",
                                fontSize: mobileMode ? 14 : 16,
                            }}
                            className={`center_flex cusor ${tabActive === 3 ? "active-search" : ""}`}
                            onClick={() => {
                                setTabActive(3);
                            }}
                        >
                            <span>Rau, Củ</span>
                        </div>
                        <div
                            style={{
                                background: "#fff",
                                borderRadius: "10px",
                                border: "1px solid rgb(204, 204, 204)",
                                width: mobileMode ? 120 : 130,
                                height: 40,
                                color: "rgb(128, 128, 128)",
                                fontSize: mobileMode ? 14 : 16,
                            }}
                            className={`center_flex cusor ${tabActive === 3 ? "active-search" : ""}`}
                            onClick={() => {
                                setTabActive(3);
                            }}
                        >
                            <span>Rau, Củ</span>
                        </div>
                        <div
                            style={{
                                background: "#fff",
                                borderRadius: "10px",
                                border: "1px solid rgb(204, 204, 204)",
                                width: mobileMode ? 120 : 130,
                                height: 40,
                                color: "rgb(128, 128, 128)",
                                fontSize: mobileMode ? 14 : 16,
                            }}
                            className={`center_flex cusor ${tabActive === 3 ? "active-search" : ""}`}
                            onClick={() => {
                                setTabActive(3);
                            }}
                        >
                            <span>Rau, Củ</span>
                        </div>
                        <div
                            style={{
                                background: "#fff",
                                borderRadius: "10px",
                                border: "1px solid rgb(204, 204, 204)",
                                width: mobileMode ? 120 : 130,
                                height: 40,
                                color: "rgb(128, 128, 128)",
                                fontSize: mobileMode ? 14 : 16,
                            }}
                            className={`center_flex cusor ${tabActive === 3 ? "active-search" : ""}`}
                            onClick={() => {
                                setTabActive(3);
                            }}
                        >
                            <span>Rau, Củ</span>
                        </div>
                    </ScrollContainer>
                    {/* </div> */}
                    <div>
                        <ProductList
                            data={
                                products !== null
                                    ? products.map((item) => {
                                          return {
                                              ...item,
                                              image: "https://firebasestorage.googleapis.com/v0/b/lucky-science-341916.appspot.com/o/assets%2FImagesProducts%2Fad8b11c3-568b-448a-9a23-8e322abeff50?alt=media&token=2b2c29de-97e3-4874-88bb-3b02f4784011",
                                          };
                                      })
                                    : []
                            }
                            filter={1}
                            reLoad={() => {
                                // hanldeReLoad();
                            }}
                        />
                    </div>
                    {/* <div className="schedule-title">
                        <h3 style={{ fontWeight: 700, paddingTop: 30, display: "flex", gap: 5 }}>
                            Chọn giờ nhận hàng <h4 style={{ color: "red" }}>*</h4>
                        </h3>
                    </div> */}
                    {/* <div style={{ paddingTop: 20 }}>
                        <Select
                            options={optionTime.length > 0 ? optionTime : []}
                            placeholder={`${optionTime.length > 0 ? "Chọn giờ" : "Không có khung giờ phù hợp"} `}
                            onChange={(e) => {
                                setHour(e);
                            }}
                            isSearchable={false}
                            value={hour}
                        />
                    </div>
                    {!hourState && (
                        <div className="input-validate">
                            <span>Vui lòng chọn giờ nhận hàng</span>
                        </div>
                    )} */}

                    {/* <div className="center_flex" style={{ gap: 20, paddingTop: 30 }}>
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
                            <span style={{ fontWeight: 700, fontSize: mobileMode ? 15 : 18 }}>Quay lại</span>
                        </button>
                        <button
                            onClick={() => {
                                setBuilding(userInfo.building.label);
                                setTotal(order.total);
                                // setVisiblePopupComfirm(true);
                                // setOpentModalError(true);
                                // handleValidate();
                            }}
                            type="button"
                            disabled={isLoadingOrder}
                            style={{
                                textAlign: "center",
                                width: "100%",
                                height: 50,
                                borderRadius: "0.5rem",
                                alignItems: "center",
                                backgroundColor: isLoadingOrder ? "#f5f5f5" : "var(--primary)",
                                color: "#fff",
                            }}
                            className="center_flex checkout-btn"
                        >
                            <span style={{ fontWeight: 700, fontSize: mobileMode ? 15 : 18 }}>Đặt hàng</span>
                        </button>
                    </div> */}
                </div>
            </div>
        </>
    );
};

export default SchedulePage;
