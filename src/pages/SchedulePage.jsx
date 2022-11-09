import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import Select from "react-select";
import { useHistory, useLocation } from "react-router-dom";
import Slider from "react-slick";
import Rodal from "rodal";
import { getListProductByCateId, getProductMenuMode3, postOrder } from "../apis/apiService";
import { CountDown } from "../common/Cart/CountDown";
import Loading from "../common/Loading/Loading";
import { LOCALSTORAGE_CART_NAME } from "../constants/Variable";
import { AppContext } from "../context/AppProvider";
import { ProductList } from "../components/products/ProductList";
import ScrollContainer from "react-indiana-drag-scroll";
import Skeleton from "react-loading-skeleton";

const SchedulePage = () => {
    const { setIsHeaderOrder, setHeaderInfo, setisCartMain3, mobileMode, Cart3, menuIdProvider, setMenuIdProvider, setDeliveryDate } = useContext(AppContext);
    const [dayCurrent, setDayCurrent] = useState({});
    const [fullTime, setFullTime] = useState("");
    const [listDay, setListDay] = useState([]);
    const [isLoadingCircle, setIsLoadingCircle] = useState(true);
    const [isLoadingCate, setIsLoadingCate] = useState(false);
    const [isLoadingProduct, setIsLoadingProduct] = useState(false);
    const [products, setProducts] = useState(null);
    const [categorys, setCategorys] = useState(null);
    const [tabActive, setTabActive] = useState(0);
    let history = useHistory();
    let location = useLocation();

    const getDate = () => {
        Date.prototype.addDays = function (days) {
            var date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        };
        var date = new Date();

        let schedule = [];
        for (let index = 0; index < listDay.length; index++) {
            let day = listDay[index].dayFilter;
            day = day.split("-");
            if (day[2]) {
                schedule = [
                    ...schedule,
                    { day: day[2].toString(), id: listDay[index].id, weekDay: date.addDays(index).toString().split(" ")[0], fullTime: listDay[index].dayFilter, name: listDay[index].name },
                ];
            }
        }
        return schedule;
    };
    const hanldeReLoad = () => {
        hanldeFilterCate(0);
    };
    useEffect(() => {
        setHeaderInfo({ isSearchHeader: true, title: "" });
        if (Cart3.length > 0) {
            setisCartMain3(true);
        } else {
            setisCartMain3(false);
        }
        setIsHeaderOrder(false);

        return () => {
            if (Cart3.length > 0) {
                setisCartMain3(true);
            }
        };
    }, [setHeaderInfo, setIsHeaderOrder, Cart3]);
    const handleGetProductMenu = (day) => {
        setIsLoadingProduct(true);
        setIsLoadingCate(true);
        getProductMenuMode3(day, "", 1, 100)
            .then((res) => {
                if (res.data) {
                    const menu = res.data;
                    const productList = menu.products || [];
                    const categoryList = menu.categoryInMenuViews || [];
                    const days = menu.menuMode3s || [];
                    for (let index = 0; index < days.length; index++) {
                        const element = days[index];
                        if (element.id === day) {
                            setMenuIdProvider(element.id);
                            setDayCurrent(element);
                        }
                    }
                    setTimeout(() => {
                        console.log({ productList });
                        setListDay(days);
                        setCategorys(categoryList);
                        setProducts(productList);
                        setIsLoadingCircle(false);
                        setIsLoadingProduct(false);
                        setIsLoadingCate(false);
                    }, 300);
                } else {
                    setIsLoadingCircle(false);
                    setIsLoadingCate(false);
                    setIsLoadingProduct(false);
                }
            })
            .catch((error) => {
                console.log(error);
                setProducts([]);
                setIsLoadingCircle(false);
                setIsLoadingCate(false);
                setIsLoadingProduct(false);
            });
    };
    useEffect(() => {
        setisCartMain3(false);
        if (location.state) {
            const { day } = location.state;
            const { menuName } = location.state;
            // setDay(getDate()[2].day);
            setDeliveryDate(menuName);
            handleGetProductMenu(day);
        } else {
            history.push("/mode/3");
        }

        return () => {};
    }, [location.state]);

    const settings = {
        dots: false,
        slidesToShow: mobileMode ? 5 : 8,
        slidesToScroll: 5,
        autoplay: false,
        swipeToSlide: false,
        infinite: false,

        responsive: [
            {
                breakpoint: 700,
                settings: {
                    // swipe: true,
                },
            },
        ],
    };

    const hanldeFilterCate = (id) => {
        getProductMenuMode3(dayCurrent.id, id === 0 ? "" : id, 1, 100)
            .then((res) => {
                if (res.data) {
                    const menu = res.data;
                    const productList = menu.products || [];
                    setProducts(productList);
                    setTimeout(() => {
                        setIsLoadingProduct(false);
                    }, 300);
                } else {
                    // setIsLoadingCircle(false);
                }
            })
            .catch((error) => {
                console.log(error);
                setProducts([]);
                setIsLoadingProduct(false);
            });
    };
    return (
        <>
            <Loading isLoading={isLoadingCircle} />
            <div className={`loading-spin ${!isLoadingCircle && "loading-spin-done"}`}></div>

            <div className="container d_flex  schedule-padding" style={{ flexDirection: "column", gap: 10 }}>
                <div className="schedule-wrapper">
                    <div style={{ background: "#fff", paddingLeft: 15, paddingRight: 15, paddingBottom: 15 }}>
                        <Slider {...settings}>
                            {getDate().map((item, index) => {
                                return (
                                    <div
                                        className={`f_flex schedule-item ${dayCurrent.id === item.id && "schedule-item-active"}`}
                                        onClick={() => {
                                            if (dayCurrent.id !== item.id) {
                                                setDayCurrent(item);
                                                setFullTime(item.fullTime);
                                                handleGetProductMenu(item.id);
                                                setMenuIdProvider(item.id);
                                                console.log(item);
                                                setDeliveryDate(item.name);
                                                setTabActive(0);
                                            }
                                        }}
                                    >
                                        <span className="schedule-week"> {item.weekDay}</span>
                                        <span className="schedule-day">{item.day}</span>
                                    </div>
                                );
                            })}
                        </Slider>
                    </div>

                    <ScrollContainer
                        className="schedule-category"
                        horizontal={true}
                        style={{ width: "100%", background: "rgb(246, 249, 252)", padding: 15, gap: 15, gridTemplateColumns: "repeat(7, 1fr)" }}
                    >
                        {isLoadingCate &&
                            [1, 2, 3, 4].map((item, ind) => {
                                return <Skeleton key={ind} height={38} width={mobileMode ? 135 : 150} borderRadius={10} />;
                            })}
                        {!isLoadingCate && (
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
                                    if (0 !== tabActive) {
                                        setTabActive(0);
                                        setIsLoadingProduct(true);
                                        hanldeFilterCate(0);
                                    }
                                }}
                            >
                                <span>Tất cả</span>
                            </div>
                        )}

                        {!isLoadingCate &&
                            categorys !== null &&
                            categorys.length > 0 &&
                            categorys.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        style={{
                                            background: "#fff",
                                            borderRadius: "10px",
                                            border: "1px solid rgb(204, 204, 204)",
                                            width: mobileMode ? 135 : 150,
                                            height: 40,
                                            color: "rgb(128, 128, 128)",
                                            fontSize: mobileMode ? 14 : 16,
                                        }}
                                        className={`center_flex cusor ${tabActive === item.id ? "active-search" : ""}`}
                                        onClick={() => {
                                            if (item.id !== tabActive) {
                                                setTabActive(item.id);
                                                setIsLoadingProduct(true);
                                                hanldeFilterCate(item.id);
                                            }
                                        }}
                                    >
                                        <span style={{ padding: "0 0" }}>{item.name}</span>
                                    </div>
                                );
                            })}
                    </ScrollContainer>
                    {/* </div> */}
                    <div>
                        {products !== null && !isLoadingProduct && (
                            <ProductList
                                data={products}
                                filter={1}
                                store={true}
                                menuName={dayCurrent.name}
                                reLoad={() => {
                                    hanldeReLoad();
                                }}
                            />
                        )}
                    </div>
                    <div className={`loading-spin ${!isLoadingProduct && "loading-spin-done"}`} style={{ top: mobileMode ? 285 : 315 }}></div>
                    {isLoadingProduct &&
                        [1, 2, 3, 4, 5, 6].map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    style={{
                                        transition: "0.5s all",
                                        margin: "0 15px",
                                        padding: "15px 0",
                                        display: "flex",
                                        gap: 15,
                                        justifyContent: "space-between",
                                        borderBottom: "1px solid #f0f0f0",
                                    }}
                                >
                                    <div style={{ display: "flex", gap: 15 }}>
                                        <Skeleton height={80} width={80} borderRadius={8} />
                                        <div style={{ display: "flex", gap: 5, flexDirection: "column", paddingTop: 5 }}>
                                            <Skeleton height={20} width={150} borderRadius={5} />
                                            <Skeleton height={32} width={130} borderRadius={5} />
                                        </div>
                                    </div>
                                    <Skeleton height={22} width={100} borderRadius={5} />
                                </div>
                            );
                        })}
                </div>
            </div>
        </>
    );
};

export default SchedulePage;
