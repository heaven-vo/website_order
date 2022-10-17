import React, { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useHistory } from "react-router-dom";
import Slider from "react-slick";
import { getMenuByMode } from "../apis/apiService";
import { ProductSlide, SampleNextArrow, SamplePrevArrow } from "../components/products/ProductSlide";
import { CATE_FITLER, IMAGE_NOTFOUND, STORE_FILTER } from "../constants/Variable";
import { AppContext } from "../context/AppProvider";

const categorys = [
    {
        id: 1,
        categoryName: "Top Brands",
        img: "https://cdn-icons-png.flaticon.com/512/5553/5553901.png",
    },
    {
        id: 1,
        categoryName: "Mì-Bún-Phở",
        img: "https://thumbs.dreamstime.com/b/vietnamese-pho-soup-illustration-97217112.jpg",
    },
    {
        id: 2,
        categoryName: "Cơm",
        img: "https://luabbq.com/upload/sanpham/abc-removebg-preview-1531.png",
    },
    {
        id: 1,
        categoryName: "Đồ Uống",
        img: "https://icons.iconarchive.com/icons/graphicloads/food-drink/256/drink-icon.png",
    },
    {
        id: 1,
        categoryName: "Món Á/ÂU",
        img: "https://firebasestorage.googleapis.com/v0/b/deliveryfood-9c436.appspot.com/o/icon%2Fvmlz_at5y_180428.jpg?alt=media&token=039c791a-b172-46bc-a0a2-e59c97d38a7e",
    },
    {
        id: 2,
        categoryName: "Thức Ăn Nhanh",
        img: "https://img.freepik.com/free-vector/french-fries-cartoon-icon-illustration-fast-food-icon-concept-isolated-flat-cartoon-style_138676-2923.jpg?w=2000",
    },

    {
        id: 2,
        categoryName: "Ăn Vặt",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL_BowaGaOh3Y3zrMOQ1vQQqFca3DqD27Csg&usqp=CAU",
    },
    {
        id: 2,
        categoryName: "Trà sữa",
        img: "https://nhuhoaphat.com/wp-content/uploads/2022/03/Tai-ngay-milk-tea-hinh-nen-tra-sua-cute-moi-nhat-2022.png",
    },
    {
        id: 2,
        categoryName: "Trà sữa",
        img: "https://nhuhoaphat.com/wp-content/uploads/2022/03/Tai-ngay-milk-tea-hinh-nen-tra-sua-cute-moi-nhat-2022.png",
    },
];
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
export default Mdata;
export const MenuPage = () => {
    // let date = new Date();
    // let timeEnd1 = 13.54;
    // let timeEnd2 = 13.55;
    // let timeEnd3 = 13.56;
    const { menu, mobileMode, setIsHeaderOrder, setHeaderInfo, setMenuIdProvider } = useContext(AppContext);
    const [filtter, setFilter] = useState(CATE_FITLER);
    // const [checked, setChecked] = useState(false);
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [isLoadingProduct, setIsLoadingProduct] = useState(false);
    const [menuProduct, setMenuProduct] = useState([]);
    const [menuCategory, setMenuCategory] = useState([]);
    const [menuEmpty, setMenuEmpty] = useState(false);
    // const [menuCategory, setMenuCategory] = useState([]);
    const [widthScreen, setWidthScreen] = useState(window.innerWidth - 100);
    let history = useHistory();
    useEffect(() => {
        setIsLoadingPage(true);
        setIsHeaderOrder(false);
        setTimeout(() => {
            getMenu(menu, filtter, 1, 10);
        }, 1);
    }, [setIsHeaderOrder, menu]);
    const hanldeChangeFilter = (fil) => {
        setFilter(fil);
        setIsLoadingProduct(true);
        getMenu(menu, fil, 1, 100);
    };
    // useEffect(() => {
    //     setIsLoadingProduct(true);

    //     getMenu(menu, filtter, 1, 10);
    // }, [filtter]);
    const getMenu = (menu, filtter, pageInd, size) => {
        // setMenuCategory([]);
        if (menu !== "0") {
            getMenuByMode(menu, filtter, pageInd, size)
                .then((res) => {
                    console.log(res);
                    if (res.data) {
                        const menu = res.data;
                        setMenuProduct(menu);
                        setMenuIdProvider(menu.id);
                        setMenuCategory(menu.listCategoryStoreInMenus);
                        if (menu.listCategoryStoreInMenus.length > 0) {
                            setMenuEmpty(false);
                        } else {
                            setMenuEmpty(true);
                        }
                    } else {
                        setMenuProduct([]);
                        setMenuCategory([]);
                        setMenuEmpty(true);
                        console.log("ok");
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
        setHeaderInfo({ isSearchHeader: true, title: "" });
        function handleResize() {
            setWidthScreen(window.innerWidth - 100);
        }

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            setHeaderInfo({});
        };
    }, [setHeaderInfo, widthScreen]);
    // const [timeEnd, setTimeEnd] = useState(timeEnd1);
    // const [timeCount, setTimeCount] = useState(1);
    // const [isStop, setIsStop] = useState(false);
    // const [result, setReuslt] = useState(1);

    // useEffect(() => {
    //     let hour = timeEnd - date.getHours() - 1;
    //     let minus = 60 - date.getMinutes();
    //     let second = 60 - date.getSeconds();
    //     let res = hour * 3600 + minus * 60 + second;
    //     setReuslt(res);
    // }, [date, timeEnd]);

    // const callApi = (time) => {
    //     if (time === 1) {
    //         setTimeEnd(timeEnd1);
    //         console.log("Call Api Sang");
    //     } else if (time === 2) {
    //         setTimeEnd(timeEnd2);
    //         console.log("Call Api Trua");
    //     } else if (time === 3) {
    //         setTimeEnd(timeEnd3);
    //         console.log("Call Api Chieu");
    //         setIsStop(true);
    //     }
    //     setTimeCount(time);
    //     // console.log("Xong");
    // };

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
        // responsive: [
        //     {
        //         breakpoint: 950,
        //         settings: {
        //             slidesToShow: 3,
        //             slidesToScroll: 1,
        //             infinite: true,
        //         },
        //     },
        //     {
        //         breakpoint: 700,
        //         settings: {
        //             slidesToShow: 1,
        //             slidesToScroll: 1,
        //             infinite: true,
        //         },
        //     },
        // ],
    };
    const hanldeReLoad = () => {
        getMenu(menu, filtter, 1, 100);
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
                            background: "var(--secondary)",
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
                            background: "var(--secondary)",
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
                            background: "var(--secondary)",
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
                            background: "var(--secondary)",
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
                            background: "var(--secondary)",
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
                            background: "var(--secondary)",
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
    const menuTitle = (title, description, time, isCoundown) => {
        return (
            <div className="c_flex" style={{ gap: 3, flexWrap: "wrap" }}>
                <div className="f_flex" style={{ gap: 5, width: "100%", alignItems: "start", justifyContent: "space-between", flexDirection: "column" }}>
                    {isLoadingPage ? <Skeleton height={mobileMode ? 18 : 21} width={mobileMode ? widthScreen : 380} /> : <span className="menu-text-detail">{description}</span>}

                    {/* <div className="center_flex" style={{ gap: 15, justifyContent: "space-between", width: "100%" }}>
                        {isLoadingPage ? <Skeleton height={mobileMode ? 30 : 38} width={230} /> : <h3 className="menu-text-title">{title}</h3>}
                        {isLoadingPage ? (
                            <Skeleton height={23} width={81} borderRadius={3} />
                        ) : (
                            isCoundown && (
                                <div className="">
                                    <Countdown
                                        renderer={renderer}
                                        // date={Date.now() + result * 1000}
                                        date={Date.now() + time}
                                        daysInHours={true}
                                        // overtime={true}

                                        onComplete={() => {
                                            // callApi(timeCount + 1);
                                        }}
                                    ></Countdown>
                                </div>
                            )
                        )}
                    </div> */}
                    <section className="TopCate  " style={{ width: "100%" }}>
                        <div className="container" style={{ padding: 0 }}>
                            {isLoadingPage ? (
                                <div style={{ height: "100%" }}>
                                    <Skeleton borderRadius={5} height={mobileMode ? 180 : 300} style={{ margin: "0 5px" }} />
                                </div>
                            ) : (
                                <Slider {...settings}>
                                    {Mdata.map((value, index) => {
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
        switch (menu) {
            case 1:
                return menuTitle("Điểm Tâm Sáng", "Gọi là có - nhận đơn và xử lý giao hàng ngay.", 950000, true);
            case 2:
                return menuTitle("Hôm Nay Nấu Gì?", "Thực phẩm tươi sống giao ngay trong ngày.", 0, false);
            case 3:
                return menuTitle("Đồ Ăn Cho Cả Tuần", "Đặt hàng và giao hàng trong 3 - 5 ngày", 0, false);

            default:
                return menuTitle("Điểm Tâm Sáng", "Gọi là có - nhận đơn và xử lý giao hàng ngay.", 950000, true);
        }
    };
    const hanldeViewAll = (cateId) => {
        history.push(`/menu/${menu}/${filtter}/${cateId}`);
    };
    return (
        <>
            <div className={`loading-spin ${!isLoadingPage && "loading-spin-done"}`}></div>
            <section className="shop background back-white" style={{}}>
                <div className="container d_flex back-white " style={{ padding: "10px 15px 20px 15px", flexDirection: "column", gap: 10 }}>
                    <div className="">{render()}</div>
                    {/* <div className="c_flex" style={{ gap: 3, flexWrap: "wrap" }}>
                        <div className="f_flex" style={{ gap: 15, width: "100%", alignItems: "center", justifyContent: "space-between" }}>
                            <h3 className="menu-text-title">Điểm Tâm Sáng</h3>
                            <div className="">
                                <Countdown
                                    renderer={renderer}
                                    // date={Date.now() + result * 1000}
                                    date={Date.now() + 9500000}
                                    daysInHours={true}
                                    // overtime={true}

                                    onComplete={() => {
                                        // callApi(timeCount + 1);
                                    }}
                                ></Countdown>
                            </div>
                        </div>
                        <span className="menu-text-detail">Gọi là có - nhận đơn và xử lý giao hàng ngay.</span>
                    </div> */}
                    <div className="c_flex" style={{ gap: 10, marginTop: 0, width: "100%" }}>
                        <div style={{ width: "100%" }}>
                            {/* {isLoadingPage ? (
                                <Skeleton borderRadius={5} height={50} style={{ marginTop: 10 }} />
                            ) : (
                                <div className="search-menu" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <div style={{ height: "100%" }}>
                                        <i class="fa-solid fa-magnifying-glass" style={{ fontSize: 20, marginTop: 3 }}></i>
                                    </div>
                                    <input type="search" name="" id="" style={{ flex: 1 }} placeholder="Tìm sản phẩm" />
                                </div>
                            )} */}
                            {isLoadingPage ? (
                                <Skeleton borderRadius={5} height={37} style={{ marginTop: 10 }} />
                            ) : (
                                <div className=" f_flex category-list" style={{ marginBottom: 0, display: "flex", alignItems: "center", gap: 10, paddingTop: 10 }}>
                                    <h4 htmlFor="1" style={{ fontSize: 18 }}>
                                        Lọc Theo:
                                    </h4>
                                    <div className="f_flex" style={{ gap: 0, justifyContent: "start" }}>
                                        <div
                                            className={`${filtter === 1 ? "menu-item-active" : "menu-item "} cusor center_flex `}
                                            style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10, gap: 10 }}
                                        >
                                            <input
                                                type="radio"
                                                name="filter"
                                                id="1"
                                                value={"1"}
                                                onClick={() => {
                                                    hanldeChangeFilter(CATE_FITLER);
                                                }}
                                                onChange={() => {}}
                                                checked={filtter === CATE_FITLER}
                                            />
                                            <label htmlFor="1" onClick={() => hanldeChangeFilter(CATE_FITLER)}>
                                                Danh Mục
                                            </label>
                                        </div>
                                        <div
                                            className={`${filtter === 2 ? "menu-item-active" : "menu-item "} cusor center_flex `}
                                            style={{ borderTopRightRadius: 10, borderBottomRightRadius: 10, gap: 10 }}
                                        >
                                            <input
                                                onChange={() => {}}
                                                type="radio"
                                                name="filter"
                                                id="2"
                                                value={"2"}
                                                onClick={() => hanldeChangeFilter(STORE_FILTER)}
                                                checked={filtter === STORE_FILTER}
                                            />
                                            <label htmlFor="2" onClick={() => hanldeChangeFilter(STORE_FILTER)}>
                                                Cửa Hàng
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {isLoadingPage ? (
                        <Skeleton borderRadius={5} height={122} style={{ marginBottom: 5 }} />
                    ) : menuCategory && menuCategory.length > 0 ? (
                        <div className="cateogry-menu">
                            <Slider {...settingCaategory}>
                                {menuCategory &&
                                    menuCategory.map((cate, index) => {
                                        return (
                                            <div key={index} className="cateogry-menu-wrapper ">
                                                <div className="cateogry-menu-img" onClick={() => hanldeViewAll(cate.id)}>
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
                {/* <div className="container d_flex" style={{ marginTop: 30 }}>
                    <div className="c_flex" style={{ gap: 10, flexWrap: "wrap" }}>
                        <div>
                            <Countdown
                                // date={Date.now() + result * 1000}
                                date={Date.now() + 10000}
                                daysInHours={true}
                                // overtime={true}
                                onComplete={() => {
                                    // callApi(timeCount + 1);
                                }}
                            ></Countdown>
                        </div>
                    </div>
                </div> */}

                {!isLoadingPage &&
                    !isLoadingProduct &&
                    menuProduct?.listCategoryStoreInMenus?.map((menu, index) => {
                        if (menu.listProducts.length > 0) {
                            return (
                                // <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                                //     <ProductGrid data={menu.listProducts || []} label={menu.name} labelImg={menu.img || IMAGE_NOTFOUND} />
                                // </ReactCSSTransitionGroup>

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
                                <img src="/images/fish-bones.png" style={{ width: 80 }} alt="" />
                                <span style={{ fontSize: "1.1rem" }}>Hiện không có sản phẩm nào!!</span>
                            </div>
                        </div>
                    </section>
                )}
            </section>
        </>
    );
};
