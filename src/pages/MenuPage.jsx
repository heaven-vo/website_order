import React, { useContext, useEffect, useState } from "react";
import Countdown from "react-countdown";
import BallTriangle from "react-loading-icons/dist/esm/components/ball-triangle";
import Skeleton from "react-loading-skeleton";
import { useHistory } from "react-router-dom";
import Slider from "react-slick";
import { getListStoreCategory, getListStoreInMenuByMode, getMenuByMode, getMenuByModeGroupBy, getMenuMode3 } from "../apis/apiService";
import DurationList from "../components/products/DurationList";
import { ProductSlide, SampleNextArrow, SamplePrevArrow } from "../components/products/ProductSlide";
import ShopList from "../components/products/ShopList";
import { ShopSlide } from "../components/products/ShopSlide";
import { getHourFromDouble } from "../constants/Caculator";
import { CATE_FITLER, IMAGE_NOTFOUND, LOCALSTORAGE_CART_NAME, LOCALSTORAGE_CART_NAME1, LOCALSTORAGE_CART_NAME2, LOCALSTORAGE_CART_NAME3, LOCALSTORAGE_MODE } from "../constants/Variable";
import { AppContext } from "../context/AppProvider";

const Mdata = [
    {
        id: 2,
        title: "50% Off For Your First Shopping",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
        cover: "https://www.highlandscoffee.com.vn/vnt_upload/weblink/Summer_Tea__website_banner2000x640_Tra_Yi_hYng.jpg",
    },
    {
        id: 1,
        title: "50% Off For Your First Shopping",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
        cover: "https://firebasestorage.googleapis.com/v0/b/deliveryfood-9c436.appspot.com/o/banner%2Fbanner_sale.jpg?alt=media&token=7d19e5a3-9cbf-44e7-902d-bb532651362f",
    },
    {
        id: 3,
        title: "50% Off For Your First Shopping",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
        cover: "https://firebasestorage.googleapis.com/v0/b/deliveryfood-9c436.appspot.com/o/banner%2F193452567_232982721923561_7074968439565756507_n.jpg?alt=media&token=81a1f170-ee5a-472f-b47a-31decc0760fc",
    },
];

export const Mdata2 = [
    {
        id: 1,
        title: "50% Off For Your First Shopping",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
        cover: "https://firebasestorage.googleapis.com/v0/b/deliveryfood-9c436.appspot.com/o/icon%2Fslider_1.webp?alt=media&token=b61c0b1c-cdb9-4376-a4d4-954dc4a562d6",
    },
    {
        id: 3,
        title: "50% Off For Your First Shopping",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
        cover: "https://firebasestorage.googleapis.com/v0/b/deliveryfood-9c436.appspot.com/o/banner%2Fsection_banner_2.jpg?alt=media&token=8b1e5d93-a71e-42e4-935c-79071d44f2a0",
    },

    {
        id: 2,
        title: "50% Off For Your First Shopping",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
        cover: "https://salt.tikicdn.com/cache/w830/ts/tmp/d3/b9/a9/26ecee15b4f1b63e5ff92b621226f000.jpg",
    },
];
export const Mdata3 = [
    {
        id: 1,
        title: "50% Off For Your First Shopping",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
        cover: "https://firebasestorage.googleapis.com/v0/b/deliveryfood-9c436.appspot.com/o/banner%2Fslide_2.png?alt=media&token=fda857ed-3c7f-469d-9e51-927a28207085",
    },
    // {
    //     id: 3,
    //     title: "50% Off For Your First Shopping",
    //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
    //     cover: "https://firebasestorage.googleapis.com/v0/b/deliveryfood-9c436.appspot.com/o/banner%2Fsection_banner_2.jpg?alt=media&token=8b1e5d93-a71e-42e4-935c-79071d44f2a0",
    // },

    // {
    //     id: 2,
    //     title: "50% Off For Your First Shopping",
    //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
    //     cover: "https://salt.tikicdn.com/cache/w830/ts/tmp/d3/b9/a9/26ecee15b4f1b63e5ff92b621226f000.jpg",
    // },
];
export default Mdata;
export const MenuPage = () => {
    const {
        mode,
        mobileMode,
        setIsHeaderOrder,
        setHeaderInfo,
        setMenuIdProvider,
        setisCartMain1,
        setisCartMain2,
        setisCartMain3,
        setCart1,
        setCart2,
        setCart3,
        setOpenDeleteCart,
        setCategoriesInMenu,
        setKeySearch,
    } = useContext(AppContext);
    const [filtter, setFilter] = useState(CATE_FITLER);
    // const [checked, setChecked] = useState(false);
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [isLoadingProduct, setIsLoadingProduct] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [menuProduct, setMenuProduct] = useState([]);
    const [menuCategory, setMenuCategory] = useState([]);
    const [title, setTitle] = useState("");
    const [listStore, setListStore] = useState([]);
    const [listStoreCategory, setListStoreCategory] = useState([]);
    const [slideData, setSlideData] = useState([]);
    const [menuEmpty, setMenuEmpty] = useState(false);
    const [pageIndex, setPageIndex] = useState(1);
    const [isFull, setisFull] = useState(false);
    // const [menuCategory, setMenuCategory] = useState([]);
    const [widthScreen, setWidthScreen] = useState(window.innerWidth - 100);

    let history = useHistory();
    useEffect(() => {
        setIsLoadingPage(true);
        setIsHeaderOrder(false);
        setKeySearch("");
        if (mode === "1") {
            getMenuByModeId(mode);
            setSlideData(Mdata);
        }
        if (mode === "2") {
            getMenu(mode, filtter, 1, 10);
            setSlideData(Mdata2);
        }
        if (mode === "3") {
            setHeaderInfo({ isSearchHeader: false, title: "Chọn ngày giao hàng" });
            getMenuInMode3(7);
            setSlideData(Mdata3);
        } else {
            setHeaderInfo({ isSearchHeader: true, title: "" });
        }
    }, [setIsHeaderOrder, mode]);
    // const hanldeChangeFilter = (fil) => {
    //     setFilter(fil);
    //     setIsLoadingProduct(true);
    //     getMenu(mode, fil, 1, 100);
    // };
    // useEffect(() => {
    //     setIsLoadingProduct(true);

    //     getMenu(menu, filtter, 1, 10);
    // }, [filtter]);

    // const loadMore = () => {
    //     // setPageIndex(pageIndex + 1);
    //     console.log({ listStore });
    //     let newStores = [];
    //     getListStoreInMenuByMode("1", pageIndex, 3)
    //         .then((res) => {
    //             if (res.data) {
    //                 const stores = res.data;

    //                 console.log({ stores });
    //                 newStores = [...listStore, ...stores];
    //                 console.log({ newStores });
    //                 setListStore([...listStore, ...stores]);
    //             } else {
    //             }
    //             setIsLoadingPage(false);
    //             setIsLoadingProduct(false);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             setIsLoadingPage(false);
    //             setIsLoadingProduct(false);
    //         });
    // };

    useEffect(() => {
        const handleScroll = (e) => {
            const scrollHeight = e.target.scrollHeight;
            let currentHeight = 0;
            if (mobileMode) {
                currentHeight = Math.ceil(e.target.scrollTop + window.innerHeight);
            } else {
                currentHeight = Math.ceil(e.target.scrollTop + window.innerHeight * (90 / 100));
            }

            if (currentHeight >= scrollHeight - 5 && !isFull) {
                setIsLoadingMore(true);
                getListStoreInMenuByMode("1", pageIndex, 3)
                    .then((res) => {
                        if (res.data) {
                            const stores = res.data;
                            if (stores.length > 0) {
                                setListStore([...listStore, ...stores]);
                                setIsLoadingMore(false);
                                setPageIndex(pageIndex + 1);
                            } else {
                                setisFull(true);
                                setListStore([...listStore, ...stores]);
                                setIsLoadingMore(false);
                            }
                        } else {
                        }
                        setIsLoadingPage(false);
                    })
                    .catch((error) => {
                        console.log(error);
                        setIsLoadingMore(false);
                    });
            }
        };
        let main = document.getElementById("main");
        if (mode === "1") {
            main.addEventListener("scroll", handleScroll);
        }
        return () => {
            main.removeEventListener("scroll", handleScroll);
        };
    }, [listStore, mobileMode, pageIndex]);

    const checkCartInMenu1 = (menuId) => {
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME1))) {
            localStorage.setItem(LOCALSTORAGE_CART_NAME1, JSON.stringify([]));
            setCart1([]);
            setisCartMain1(false);
        } else {
            const CartList1 = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME1));
            if (CartList1.length > 0 && CartList1[0].menuId !== menuId.toString()) {
                setOpenDeleteCart(true);
            }
        }
    };
    const checkCartInMenu2 = (menuId) => {
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME2))) {
            localStorage.setItem(LOCALSTORAGE_CART_NAME2, JSON.stringify([]));
            setCart2([]);
            setisCartMain2(false);
        } else {
            const CartList2 = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME2));
            if (CartList2.length > 0 && CartList2[0].menuId !== menuId.toString()) {
                setOpenDeleteCart(true);
            }
        }
    };
    // const checkCartInMode3 = () => {
    //     if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_MODE))) {
    //         localStorage.setItem(LOCALSTORAGE_MODE, JSON.stringify([]));
    //         setCart3([]);
    //         setisCartMain3(false);
    //     } else {
    //         const CartList3 = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME3));
    //         const Mode = JSON.parse(localStorage.getItem(LOCALSTORAGE_MODE));
    //         if (CartList3.length > 0 && Mode !== mode) {
    //             setOpenDeleteCart(true);
    //         }
    //     }
    // };
    const getMenuByModeId = (mode) => {
        if (mode !== "0") {
            Promise.all([getMenuByMode(mode), getListStoreInMenuByMode(mode, pageIndex, 3), getListStoreCategory(mode, 5, 8)])
                .then((res) => {
                    if (res.length > 0) {
                        const menu = res[0].data;
                        const stores = res[1].data;
                        const storesCategory = res[2].data;

                        checkCartInMenu1(menu.id);
                        setListStoreCategory(storesCategory);
                        setListStore(stores);
                        setMenuIdProvider(menu.id);
                        setTitle(menu.name);
                        setTimeEndState(getHourFromDouble(menu.endTime));
                        setMenuCategory(menu.listCategoryInMenus || []);
                        setCategoriesInMenu(menu.listCategoryInMenus || []);
                        setPageIndex(pageIndex + 1);
                        if (menu.listCategoryInMenus.length > 0) {
                            setMenuEmpty(false);
                        } else {
                            setMenuEmpty(true);
                        }
                    } else {
                        setListStore([]);
                        setMenuCategory([]);
                        setMenuEmpty(true);
                    }

                    setIsLoadingPage(false);
                    setIsLoadingProduct(false);
                })
                .catch((error) => {
                    console.log(error);
                    setIsLoadingPage(false);
                    setIsLoadingProduct(false);
                    setListStore([]);
                    setMenuCategory([]);
                    setMenuEmpty([]);
                });
        }
    };
    const getMenuInMode3 = (size) => {
        if (mode !== "0") {
            getMenuMode3(size)
                .then((res) => {
                    if (res.data) {
                        const menu = res.data;
                        setMenuProduct(menu);
                    } else {
                        setMenuProduct([]);
                        setMenuCategory([]);
                        setMenuEmpty(true);
                    }
                    setIsLoadingPage(false);
                    setIsLoadingProduct(false);
                })
                .catch((error) => {
                    console.log(error);
                    setIsLoadingPage(false);
                    setIsLoadingProduct(false);
                    setMenuProduct([]);
                    setMenuCategory([]);
                    setMenuEmpty([]);
                });
        }
    };
    const getMenu = (menu, filtter, pageInd, size) => {
        // setMenuCategory([]);
        if (menu !== "0") {
            getMenuByModeGroupBy(menu, filtter, pageInd, size)
                .then((res) => {
                    if (res.data) {
                        const menu = res.data;
                        checkCartInMenu2(menu.id);
                        setMenuProduct(menu);
                        setMenuIdProvider(menu.id);
                        setMenuCategory(menu.listCategoryStoreInMenus);
                        setCategoriesInMenu(menu.listCategoryStoreInMenus || []);
                        if (menu.listCategoryStoreInMenus.length > 0) {
                            setMenuEmpty(false);
                        } else {
                            setMenuEmpty(true);
                        }
                    } else {
                        setMenuProduct([]);
                        setMenuCategory([]);
                        setMenuEmpty(true);
                    }
                    setIsLoadingPage(false);
                    setIsLoadingProduct(false);
                })
                .catch((error) => {
                    console.log(error);
                    setIsLoadingPage(false);
                    setIsLoadingProduct(false);
                    setMenuProduct([]);
                    setMenuCategory([]);
                    setMenuEmpty([]);
                });
        }
    };

    useEffect(() => {
        function handleResize() {
            setWidthScreen(window.innerWidth - 100);
        }

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            setHeaderInfo({});
        };
    }, [setHeaderInfo, widthScreen]);

    let date = new Date();
    let timeStart = 12;
    let timeEnd2 = 15;
    // let timeEnd3 = 13.56;
    // const [timeStartState, setTimeStartState] = useState(timeStart);
    const [timeEndState, setTimeEndState] = useState(timeEnd2);
    const [timeCount, setTimeCount] = useState(1);
    const [isStop, setIsStop] = useState(false);
    const [result, setReuslt] = useState(1);

    useEffect(() => {
        let hour = timeEndState - date.getHours() - 1;
        let minus = 60 - date.getMinutes();
        let second = 60 - date.getSeconds();
        let res = hour * 3600 + minus * 60 + second;
        setReuslt(res);
        return () => {};
    }, [date]);

    const callApi = () => {
        setIsLoadingPage(true);
        setIsLoadingProduct(true);
        setTimeout(() => {
            getMenuByModeId(mode);
        }, 5000);
    };

    // function getTimeStamp(input) {
    //     var parts = input.trim().split(" ");
    //     var date = parts[0].split("-");
    //     var time = (parts[1] ? parts[1] : "00:00:00").split(":");

    //     // NOTE:: Month: 0 = January - 11 = December.
    //     var d = new Date(date[0], date[1] - 1, date[2], time[0], time[1], time[2]);
    //     return d.getTime() / 1000;
    // }

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        fade: true,
        appendDots: (dots) => {
            return <ul style={{ margin: "0px" }}>{dots}</ul>;
        },
    };
    const hanldeReLoad = () => {
        getMenu(mode, filtter, 1, 100);
    };
    const settingCaategory = {
        dots: true,
        infinite: false,
        slidesToShow: menuCategory?.length <= 6 ? menuCategory?.length : 6,
        slidesToScroll: menuCategory?.length <= 6 ? menuCategory?.length : 6,
        autoplay: false,
        swipeToSlide: false,
        swipe: false,
        appendDots: (dots) => {
            return <ul style={{ margin: "0px" }}>{dots}</ul>;
        },
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    // slidesPerRow: 1,
                    dots: true,
                    swipe: true,
                    nextArrow: "",
                    prevArrow: "",
                    rows: 2,
                },
            },
        ],
    };

    // Renderer callback
    const renderer = ({ total, hours, minutes, seconds }) => {
        if (total) {
            // Render a countdown
            return (
                <span className="count-down">
                    <span
                        style={{
                            background: "var(--primary)",
                            color: "#fff",
                            fontWeight: 600,
                            fontSize: "0.9rem",
                            padding: "2px 4px",
                            transition: "all 0.3s",
                            WebkitTransition: "0.3s all",
                            borderRadius: 3,
                        }}
                    >
                        {hours < 10 ? "0" + hours : hours}
                    </span>
                    :
                    <span
                        style={{
                            background: "var(--primary)",
                            color: "#fff",
                            fontWeight: 600,
                            fontSize: "0.9rem",
                            padding: "2px 4px",
                            transition: "all 0.3s",
                            WebkitTransition: "0.3s all",
                            borderRadius: 3,
                        }}
                    >
                        {minutes < 10 ? "0" + minutes : minutes}
                    </span>
                    :
                    <span
                        style={{
                            background: "var(--primary)",
                            color: "#fff",
                            fontWeight: 600,
                            fontSize: "0.9rem",
                            padding: "2px 4px",
                            transition: "all 0.3s",
                            WebkitTransition: "0.3s all",
                            borderRadius: 3,
                        }}
                    >
                        {seconds < 10 ? "0" + seconds : seconds}
                    </span>
                </span>
            );
        } else {
            return (
                <span className="count-down">
                    <span
                        style={{
                            background: "var(--primary)",
                            color: "#fff",
                            fontWeight: 600,
                            fontSize: "0.9rem",
                            padding: "2px 4px",
                            transition: "all 0.3s",
                            WebkitTransition: "0.3s all",
                            borderRadius: 3,
                        }}
                    >
                        {"00"}
                    </span>
                    :
                    <span
                        style={{
                            background: "var(--primary)",
                            color: "#fff",
                            fontWeight: 600,
                            fontSize: "0.9rem",
                            padding: "2px 4px",
                            transition: "all 0.3s",
                            WebkitTransition: "0.3s all",
                            borderRadius: 3,
                        }}
                    >
                        {"00"}
                    </span>
                    :
                    <span
                        style={{
                            background: "var(--primary)",
                            color: "#fff",
                            fontWeight: 600,
                            fontSize: "0.9rem",
                            padding: "2px 4px",
                            transition: "all 0.3s",
                            WebkitTransition: "0.3s all",
                            borderRadius: 3,
                        }}
                    >
                        {"00"}
                    </span>
                </span>
            );
        }
    };
    const menuTitle = (title, description, isCoundown) => {
        return (
            <div className="c_flex" style={{ gap: 3, flexWrap: "wrap" }}>
                <div className="f_flex" style={{ gap: 5, width: "100%", alignItems: "start", justifyContent: "space-between", flexDirection: "column" }}>
                    {isLoadingPage ? (
                        <Skeleton height={mobileMode ? 18 : 21} width={mobileMode ? widthScreen : 380} />
                    ) : (
                        <span className="menu-text-detail" style={{ fontWeight: "lighter" }}>
                            {description}
                        </span>
                    )}

                    <div className="center_flex" style={{ gap: 15, justifyContent: "space-between", width: "100%" }}>
                        {isLoadingPage ? <Skeleton height={mobileMode ? 30 : 38} width={230} /> : <h3 className="menu-text-title">{title}</h3>}
                        {isLoadingPage ? (
                            <Skeleton height={23} width={81} borderRadius={3} />
                        ) : (
                            isCoundown && (
                                <div className="">
                                    <Countdown
                                        renderer={renderer}
                                        date={Date.now() + result * 1000}
                                        // date={Date.now() + 9500000}
                                        daysInHours={true}
                                        // overtime={true}

                                        onComplete={() => {
                                            callApi();
                                        }}
                                    ></Countdown>
                                </div>
                            )
                        )}
                    </div>
                    <section className="TopCate  " style={{ width: "100%" }}>
                        <div className="container" style={{ padding: 0 }}>
                            {isLoadingPage ? (
                                <div style={{ height: "100%" }}>
                                    <Skeleton borderRadius={5} height={mobileMode ? 180 : 350} style={{ margin: "0 0" }} />
                                </div>
                            ) : (
                                <Slider {...settings}>
                                    {slideData.map((value, index) => {
                                        return (
                                            <>
                                                <div
                                                    className="box product"
                                                    key={index}
                                                    style={{ padding: 0, background: "none", borderRadius: "0.5rem", boxShadow: "none", margin: 0, transition: "1s all" }}
                                                >
                                                    <div className="slide-img" style={{ borderRadius: "0.5rem", overflow: "hidden" }}>
                                                        <img src={value.cover} alt="" style={{ objectFit: "cover", width: "100%", height: "100%", borderRadius: "0.5rem" }} />
                                                    </div>
                                                </div>
                                            </>
                                        );
                                    })}
                                </Slider>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        );
    };
    const render = () => {
        switch (mode) {
            case "1":
                return menuTitle(title, "Gọi là có - nhận đơn và xử lý giao hàng ngay.", true);
            case "2":
                return menuTitle("Hôm Nay Nấu Gì?", "Thực phẩm tươi sống giao ngay trong ngày.", false);
            case "3":
                return menuTitle("Đồ Ăn Cho Cả Tuần", "Đặt hàng và giao hàng trong 3 - 5 ngày", false);

            default:
                return menuTitle("Điểm Tâm Sáng", "Gọi là có - nhận đơn và xử lý giao hàng ngay.", true);
        }
    };
    const hanldeViewAll = (cateId, categoryName) => {
        history.push(`/mode/${mode}/${filtter}/${cateId}`, { categoryName: categoryName });
    };
    return (
        <>
            <div className={`loading-spin ${!isLoadingPage && "loading-spin-done"}`}></div>
            <section className="shop background back-white" style={{ paddingTop: mode === "3" ? 80 : 120 }}>
                <div className="container d_flex back-white " style={{ padding: "10px 15px 20px 15px", flexDirection: "column", gap: 10 }}>
                    <div className="">{render()}</div>

                    {isLoadingPage ? (
                        <Skeleton borderRadius={5} height={122} style={{ marginBottom: 5 }} />
                    ) : mode !== "3" && menuCategory && menuCategory.length > 0 ? (
                        <div className="cateogry-menu">
                            <Slider {...settingCaategory}>
                                {menuCategory &&
                                    menuCategory.map((cate, index) => {
                                        return (
                                            <div key={index} className="cateogry-menu-wrapper ">
                                                <div className="cateogry-menu-img" onClick={() => hanldeViewAll(cate.id, cate.name)}>
                                                    <img src={cate.image || "https://thumbs.dreamstime.com/b/vietnamese-pho-soup-illustration-97217112.jpg"} alt="" />
                                                </div>
                                                <span className="cateogry-menu-text">{cate.name}</span>
                                            </div>
                                        );
                                    })}
                            </Slider>
                        </div>
                    ) : (
                        ""
                    )}
                </div>

                {!isLoadingPage &&
                    !isLoadingProduct &&
                    mode === "1" &&
                    listStoreCategory?.map((menu, index) => {
                        if (menu.listStores.length > 0) {
                            return (
                                <ShopSlide
                                    key={index}
                                    filtter={filtter}
                                    data={[...menu.listStores] || []}
                                    label={menu.name}
                                    cateId={menu.id}
                                    reLoad={() => {
                                        hanldeReLoad();
                                    }}
                                />
                            );
                        } else return true;
                    })}
                {!isLoadingPage && !isLoadingProduct && mode === "1" && (
                    <>
                        <div className="container-padding f_flex" style={{ alignItems: "end", display: listStore.length > 0 ? "flex" : "none" }}>
                            <span style={{ padding: "40px 15px 10px 15px", fontWeight: 700, fontSize: 16, color: "rgb(100, 100, 100)" }}>Quán ngon gần bạn</span>
                        </div>
                        <ShopList data={listStore.length > 0 && [...listStore]} isStore={true} tabActive={0} />
                        {isLoadingMore && !isFull ? (
                            <div style={{ width: "100%" }} className="center_flex">
                                <BallTriangle stroke="var(--primary)" style={{ width: 40 }} />
                                {/* <span>Đang tải</span> */}
                            </div>
                        ) : (
                            <div style={{ height: 50, width: "100%" }}></div>
                        )}
                    </>
                )}

                {!isLoadingPage &&
                    !isLoadingProduct &&
                    mode === "2" &&
                    menuProduct?.listCategoryStoreInMenus?.map((menu, index) => {
                        if (menu.listProducts.length > 0) {
                            return (
                                <ProductSlide
                                    key={index}
                                    filtter={filtter}
                                    data={[...menu.listProducts] || []}
                                    label={menu.name}
                                    cateId={menu.id}
                                    labelImg={menu.image || IMAGE_NOTFOUND}
                                    isViewAll={true}
                                    reLoad={() => {
                                        hanldeReLoad();
                                    }}
                                />
                            );
                        } else return true;
                    })}
                {!isLoadingPage && !isLoadingProduct && mode === "3" && <DurationList data={[...menuProduct]} />}
                {isLoadingPage || isLoadingProduct ? (
                    <section className="shop" style={{ padding: "0px 15px 0px 15px" }}>
                        <div className="container d_flex">
                            <div className="contentWidth" style={{ marginLeft: 0 }}>
                                <div style={{ marginBottom: 20 }}>
                                    <div className="heading d_flex" style={{ alignItems: "center" }}>
                                        <div className="heading-left  center_flex">
                                            <div style={{ marginRight: 5 }}>
                                                <Skeleton height={45} width={45} borderRadius={50} />
                                            </div>

                                            <Skeleton height={43} width={150} borderRadius={8} style={{ margin: 0 }} />
                                        </div>

                                        {/* <Skeleton height={43} width={110} borderRadius={8} style={{ margin: 0 }} /> */}
                                    </div>
                                    <div className="product-content  grid6">
                                        {[1, 2, 3, 4, 5, 6].map((item, index) => {
                                            if (mobileMode && index > 2) {
                                                return true;
                                            }
                                            return (
                                                <div style={{ margin: 6 }} key={index}>
                                                    <Skeleton height={220} width={140} borderRadius={8} style={{ margin: 0 }} />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                ) : (
                    ""
                )}
                {menuEmpty && (
                    <section className="shop" style={{ padding: "25px 0 40px 0" }}>
                        <div className="container center_flex">
                            <div className="contentWidth  center_flex" style={{ marginLeft: 0, flexDirection: "column", gap: 10 }}>
                                <img src="/images/empty-food.png" style={{ width: mobileMode ? 50 : 80, paddingBottom: 10 }} alt="" />
                                <span style={{ fontSize: mobileMode ? 16 : 20, fontWeight: 600 }}>Không có sản phẩm nào!</span>
                                <span style={{ fontSize: mobileMode ? 14 : 16, fontWeight: "lighter", textAlign: "center", padding: "0 50px" }}>
                                    Hiện không có sản phẩm nào, Bạn vui lòng quay lại vào lúc khác.
                                </span>
                            </div>
                        </div>
                    </section>
                )}
            </section>
        </>
    );
};
