import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Countdown from "react-countdown";
import Skeleton from "react-loading-skeleton";
import Slider from "react-slick";
import Mdata from "../components/MainPage/Mdata";
import Pdata from "../components/products/Pdata";
import { ProductGrid } from "../components/products/ProductGrid";
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
    // {
    //     id: 1,
    //     categoryName: "Mì-Bún-Phở",
    //     img: "https://thumbs.dreamstime.com/b/vietnamese-pho-soup-illustration-97217112.jpg",
    // },
    // {
    //     id: 2,
    //     categoryName: "Cơm",
    //     img: "https://luabbq.com/upload/sanpham/abc-removebg-preview-1531.png",
    // },
    // {
    //     id: 1,
    //     categoryName: "Mì-Bún-Phở",
    //     img: "https://thumbs.dreamstime.com/b/vietnamese-pho-soup-illustration-97217112.jpg",
    // },
    // {
    //     id: 2,
    //     categoryName: "Cơm",
    //     img: "https://luabbq.com/upload/sanpham/abc-removebg-preview-1531.png",
    // },
];

export const MenuPage = () => {
    // let date = new Date();
    // let timeEnd1 = 13.54;
    // let timeEnd2 = 13.55;
    // let timeEnd3 = 13.56;
    const { menu, mobileMode, setIsHeaderOrder, setIsHeader } = useContext(AppContext);
    const [isActive, setIsActive] = useState(1);
    const [checked, setChecked] = useState(false);
    const [isLoadingPage, setIsLoadingPage] = useState(false);
    const [widthScreen, setWidthScreen] = useState(window.innerWidth - 100);
    useEffect(() => {
        setIsHeaderOrder(false);
        setIsHeader(true);
        axios
            .get(`https://deliveryvhgp-webapi.azurewebsites.net/api/v1/storeCategories?pageIndex=1&pageSize=10`)
            .then((res) => {
                const persons = res.data;
                console.log(persons);
            })
            .catch((error) => console.log(error));
    }, [setIsHeaderOrder, setIsHeader]);

    useEffect(() => {
        function handleResize() {
            console.log(widthScreen);
            setWidthScreen(window.innerWidth - 100);
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [widthScreen]);
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

    const { shopItems } = Pdata;

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
        slidesToShow: mobileMode ? 1 : 2,
        slidesToScroll: 1,
        autoplay: true,

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

    const settingCaategory = {
        dots: false,
        infinite: false,
        slidesToShow: 8,
        slidesToScroll: 8,
        autoplay: false,
        appendDots: (dots) => {
            return <ul style={{ margin: "0px" }}>{dots}</ul>;
        },
        responsive: [
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    slidesPerRow: 1,
                    dots: true,
                    // infinite: true,
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
                            background: "var(--secondary)",
                            color: "#fff",
                            fontWeight: 600,
                            fontSize: "0.9rem",
                            padding: "2px 4px",
                            transition: "all 0.3s",
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

                    <div className="center_flex" style={{ gap: 15, justifyContent: "space-between", width: "100%" }}>
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
                    </div>
                    <section className="TopCate  " style={{ width: "100%" }}>
                        <div className="container" style={{ padding: 0 }}>
                            {isLoadingPage ? (
                                <div style={{ height: "100%" }}>
                                    <Skeleton borderRadius={5} height={177} />
                                </div>
                            ) : (
                                <Slider {...settings}>
                                    {Mdata.map((value, index) => {
                                        return (
                                            <>
                                                <div className="box product" key={index} style={{ padding: 0, background: "none", boxShadow: "none", margin: 0 }}>
                                                    <div className="nametop d_flex"></div>
                                                    <div className="slide-img" style={{ height: 600, borderRadius: 5 }}>
                                                        <img src={value.cover} alt="" style={{ objectFit: "cover", width: "100%", borderRadius: 5 }} />
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
    return (
        <>
            <section className="shop background back-white" style={{ padding: "5px 0" }}>
                <div className="container d_flex" style={{ padding: "10px 10px", flexDirection: "column", gap: 15 }}>
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
                    <div className="cateogry-menu">
                        <Slider {...settingCaategory}>
                            {categorys.map((cate, index) => {
                                return (
                                    <div key={index} className="cateogry-menu-wrapper ">
                                        <div className="cateogry-menu-img">
                                            <img src={cate.img} alt="" />
                                        </div>
                                        <span className="cateogry-menu-text">{cate.categoryName}</span>
                                    </div>
                                );
                            })}
                        </Slider>
                    </div>
                    <div className="c_flex" style={{ gap: 10, marginTop: 0, width: "100%" }}>
                        <div style={{ width: "100%" }}>
                            <div className="search-menu" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <div style={{ height: "100%" }}>
                                    <i class="fa-solid fa-magnifying-glass" style={{ fontSize: 20, marginTop: 3 }}></i>
                                </div>
                                <input type="search" name="" id="" style={{ flex: 1 }} placeholder="Tìm sản phẩm" />
                            </div>
                            {isLoadingPage ? (
                                <Skeleton borderRadius={5} height={37} />
                            ) : (
                                <div className=" f_flex category-list" style={{ marginBottom: 0, display: "flex", alignItems: "center", gap: 10 }}>
                                    <h4 for="1" style={{ fontSize: 18 }}>
                                        Lọc Theo:
                                    </h4>
                                    <div className="f_flex" style={{ gap: 0, justifyContent: "start" }}>
                                        <div
                                            className={`${isActive === 1 ? "menu-item-active" : "menu-item "} cusor center_flex `}
                                            style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10, gap: 10 }}
                                        >
                                            <input type="radio" name="filter" id="1" value={"1"} onClick={() => setIsActive(1)} checked={isActive === 1} />
                                            <label for="1" onClick={() => setIsActive(1)}>
                                                Danh Mục
                                            </label>
                                        </div>
                                        <div
                                            className={`${isActive === 2 ? "menu-item-active" : "menu-item "} cusor center_flex `}
                                            style={{ borderTopRightRadius: 10, borderBottomRightRadius: 10, gap: 10 }}
                                        >
                                            <input type="radio" name="filter" id="2" value={"2"} onClick={() => setIsActive(2)} checked={isActive === 2} />
                                            <label for="2" onClick={() => setIsActive(2)}>
                                                Cửa Hàng
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
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
                <ProductGrid data={shopItems} isLoading={isLoadingPage} label="Mì-Bún-Phở" labelImg="https://thumbs.dreamstime.com/b/vietnamese-pho-soup-illustration-97217112.jpg" />
                <ProductGrid data={shopItems} isLoading={!isLoadingPage} label="Cơm" labelImg="https://luabbq.com/upload/sanpham/abc-removebg-preview-1531.png" />
            </section>
        </>
    );
};
