import React, { useContext, useEffect, useState } from "react";
import Countdown from "react-countdown";
import BallTriangle from "react-loading-icons/dist/esm/components/ball-triangle";
import Skeleton from "react-loading-skeleton";
import { useHistory } from "react-router-dom";
import Slider from "react-slick";
import { getListStoreCategory, getListStoreInMenuByMode, getMenuByMode, getMenuByModeGroupBy } from "../apis/apiService";
import DurationList from "../components/products/DurationList";
import { ProductSlide, SampleNextArrow, SamplePrevArrow } from "../components/products/ProductSlide";
import ShopList from "../components/products/ShopList";
import { ShopSlide } from "../components/products/ShopSlide";
import { getHourFromDouble } from "../constants/Caculator";
import { CATE_FITLER, IMAGE_NOTFOUND, LOCALSTORAGE_CART_NAME } from "../constants/Variable";
import { AppContext } from "../context/AppProvider";

const Mdata = [
    {
        id: 1,
        title: "50% Off For Your First Shopping",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
        cover: "/images/Buoisang_Banner-min.jpg",
    },
    {
        id: 2,
        title: "50% Off For Your First Shopping",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
        cover: "/images/banner-combo-mon-an-1200x600-finail.jpg",
    },
    {
        id: 3,
        title: "50% Off For Your First Shopping",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
        cover: "/images/panner.jpg",
    },
];

export const Mdata2 = [
    {
        id: 3,
        title: "50% Off For Your First Shopping",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
        cover: "https://storethailan.com/wp-content/uploads/2021/05/section_banner_2.jpg",
    },
    {
        id: 1,
        title: "50% Off For Your First Shopping",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
        cover: "http://cdn.tgdd.vn/Files/2022/03/16/1420563/15-3-28-3-2022-hoa-don-rau-thit-ca-100k-duoc-mua-ca-phao-song-huong-10k-202203160959551185.jpg",
    },
    {
        id: 2,
        title: "50% Off For Your First Shopping",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
        cover: "https://cdn.tgdd.vn/Files/2022/02/07/1414213/banh-keo-giam-tha-ga-giam-den-37-202202070953508165.jpg",
    },
];
export default Mdata;
export const MenuPage = () => {
    const { mode, mobileMode, setIsHeaderOrder, setHeaderInfo, setMenuIdProvider, setisCartMain, setCart, setOpenDeleteCart, setCategoriesInMenu, setKeySearch } = useContext(AppContext);
    const [filtter, setFilter] = useState(CATE_FITLER);
    // const [checked, setChecked] = useState(false);
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [isLoadingProduct, setIsLoadingProduct] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(true);
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
        if (mode === "2" || mode === "3") {
            getMenu(mode, filtter, 1, 10);
            setSlideData(Mdata2);
        }
        if (mode === "3") {
            setHeaderInfo({ isSearchHeader: false, title: "Chọn ngày giao hàng" });
        } else {
            console.log("chay");
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

    const loadMore = () => {
        // setPageIndex(pageIndex + 1);
        console.log({ listStore });
        let newStores = [];
        getListStoreInMenuByMode("1", pageIndex, 3)
            .then((res) => {
                if (res.data) {
                    const stores = res.data;

                    console.log({ stores });
                    newStores = [...listStore, ...stores];
                    console.log({ newStores });
                    setListStore([...listStore, ...stores]);
                } else {
                }
                setIsLoadingPage(false);
                setIsLoadingProduct(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoadingPage(false);
                setIsLoadingProduct(false);
            });
    };

    useEffect(() => {
        const handleScroll = (e) => {
            const scrollHeight = e.target.scrollHeight;
            let currentHeight = 0;
            if (mobileMode) {
                currentHeight = Math.ceil(e.target.scrollTop + window.innerHeight);
            } else {
                currentHeight = Math.ceil(e.target.scrollTop + window.innerHeight * (90 / 100));
            }
            if (currentHeight === scrollHeight && !isFull) {
                setIsLoadingMore(true);

                getListStoreInMenuByMode("1", pageIndex, 3)
                    .then((res) => {
                        if (res.data) {
                            const stores = res.data;
                            if (stores.length > 0) {
                                setListStore([...listStore, ...stores]);
                                setIsLoadingMore(false);
                                setPageIndex(pageIndex + 1);
                                console.log(pageIndex);
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
        main.addEventListener("scroll", handleScroll);
        return () => {
            main.removeEventListener("scroll", handleScroll);
        };
    }, [listStore, mobileMode, pageIndex]);

    const checkCartInMenu = (menuId) => {
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME))) {
            localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify([]));
            setCart([]);
            setisCartMain(false);
        } else {
            const CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME));
            if (CartList.length > 0 && CartList[0].menuId !== menuId.toString()) {
                setOpenDeleteCart(true);
            }
        }
    };
    const getMenuByModeId = (mode) => {
        if (mode !== "0") {
            Promise.all([getMenuByMode(mode), getListStoreInMenuByMode(mode, pageIndex, 3), getListStoreCategory(mode, 5, 8)])
                .then((res) => {
                    if (res.length > 0) {
                        const menu = res[0].data;
                        const stores = res[1].data;
                        const storesCategory = res[2].data;

                        checkCartInMenu(menu.id);
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
    const getMenu = (menu, filtter, pageInd, size) => {
        // setMenuCategory([]);
        if (menu !== "0") {
            getMenuByModeGroupBy(menu, filtter, pageInd, size)
                .then((res) => {
                    if (res.data) {
                        const menu = res.data;
                        checkCartInMenu(menu.id);
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
        // getMenu(mode, filtter, 1, 100);
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
                    rows: 1,
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
                        <div className="container-padding f_flex" style={{ alignItems: "end" }}>
                            <span style={{ padding: "40px 15px 10px 15px", fontWeight: 700, fontSize: 16, color: "rgb(100, 100, 100)" }}>Quán ngon gần bạn</span>
                        </div>
                        <ShopList data={listStore.length > 0 && [...listStore]} isStore={true} />{" "}
                        {isLoadingMore && !isFull && (
                            <div style={{ width: "100%", paddingTop: 15, paddingBottom: 15 }} className="center_flex">
                                <BallTriangle stroke="var(--primary)" style={{ width: 40 }} />
                                {/* <span>Đang tải</span> */}
                            </div>
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
                {!isLoadingPage && !isLoadingProduct && mode === "3" && <DurationList />}
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
                                <img src="/images/fish-bones.png" style={{ width: 50 }} alt="" />
                                <span style={{ fontSize: "1rem" }}>Hiện không có sản phẩm nào!!</span>
                            </div>
                        </div>
                    </section>
                )}
            </section>
        </>
    );
};
