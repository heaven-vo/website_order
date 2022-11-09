import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Slider from "react-slick";
import { LOCALSTORAGE_MODE } from "../constants/Variable";
import { AppContext } from "../context/AppProvider";

const HomePage = ({ productItems, shopItems }) => {
    const { userInfo, setIsHeaderHome, setVisiblePopupInfo, mobileMode, mode, setMode, setisCartMain1, setisCartMain2, setisCartMain3, Cart1, Cart2, Cart3 } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(true);
    let history = useHistory();
    useEffect(() => {
        setIsLoading(true);
        setIsHeaderHome(true);
        setisCartMain1(false);
        setisCartMain2(false);
        setisCartMain3(false);
        setTimeout(() => {
            setIsLoading(false);
        }, 200);
        return () => {
            setIsHeaderHome(false);
            if (Cart1?.length > 0) {
                setisCartMain1(true);
            }
            if (Cart2?.length > 0) {
                setisCartMain2(true);
            }
            if (Cart3?.length > 0) {
                setisCartMain3(true);
            }
        };
    }, [Cart1, Cart2, Cart3, setIsHeaderHome, setisCartMain1, setisCartMain2, setisCartMain3]);

    const banner = [
        {
            id: 1,
            title: "50% Off For Your First Shopping",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
            cover: "https://firebasestorage.googleapis.com/v0/b/deliveryfood-9c436.appspot.com/o/icon%2Fvinid-highlandcofffee-750x422.png?alt=media&token=ce734032-2d0e-46f9-a931-2ced9b55d2c7",
        },
        {
            id: 2,
            title: "50% Off For Your First Shopping",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
            cover: "https://firebasestorage.googleapis.com/v0/b/deliveryfood-9c436.appspot.com/o/icon%2FSagano-tmdt-bach-hoa-online-01.jpg?alt=media&token=db23cb1f-86ab-44a1-8231-30fdba04fc47",
        },
        // {
        //     id: 3,
        //     title: "50% Off For Your First Shopping",
        //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
        //     cover: "https://minhvumedia.vn/wp-content/uploads/banner-khai-truong-nha-hang-min.jpg",
        // },
    ];
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: mobileMode ? 1 : 2,
        slidesToScroll: 1,
        autoplay: false,

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
    // const setMenuLocalStorage = (modeid) => {
    //     if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_MODE))) {
    //         localStorage.setItem(LOCALSTORAGE_MODE, JSON.stringify(modeid));
    //     } else {
    //         localStorage.setItem(LOCALSTORAGE_MODE, JSON.stringify(modeid));
    //     }
    // };
    return (
        <>
            <div className={`loading-spin ${!isLoading && "loading-spin-done"}`}></div>
            <div className="container" style={{ background: "var(--primary)" }}>
                <section className="background container back-white home-menu" style={{ padding: "30px 15px 50px 15px" }}>
                    <div className="f_flex" style={{ gap: 15, width: "100%", flexWrap: "wrap" }}>
                        <div
                            style={{}}
                            className="home-menu-item"
                            onClick={() => {
                                setMode(1);
                                if (userInfo.building && userInfo.fullName && userInfo.phone) {
                                    setVisiblePopupInfo(false);
                                    history.push(`/mode/${1}`);
                                } else {
                                    setVisiblePopupInfo(true);
                                }
                            }}
                        >
                            <div className="home-menu-item-icon">
                                <img src="./images/icons/hamburger.png" alt="" />
                            </div>
                            <span>Gọi đồ ăn</span>
                        </div>
                        <div
                            style={{}}
                            className="home-menu-item"
                            onClick={() => {
                                setMode(2);

                                if (userInfo.building && userInfo.fullName && userInfo.phone) {
                                    setVisiblePopupInfo(false);
                                    history.push(`/mode/${2}`);
                                } else {
                                    setVisiblePopupInfo(true);
                                }
                            }}
                        >
                            <div className="home-menu-item-icon">
                                <img src="./images/icons/groceries.png" alt="" />
                            </div>
                            <span>Giao hàng</span>
                        </div>
                        <div
                            style={{}}
                            className="home-menu-item"
                            onClick={() => {
                                setMode(3);
                                // localStorage.setItem(LOCALSTORAGE_MODE, JSON.stringify("3"));
                                if (userInfo.building && userInfo.fullName && userInfo.phone) {
                                    setVisiblePopupInfo(false);
                                    history.push(`/mode/${3}`);
                                } else {
                                    setVisiblePopupInfo(true);
                                }
                            }}
                        >
                            <div className="home-menu-item-icon">
                                <img src="./images/icons/food-delivery.png" alt="" />
                            </div>
                            <span>Đặt Hàng</span>
                        </div>
                    </div>
                    <section className="TopCate  " style={{ width: "100%" }}>
                        <div className="container" style={{ padding: 0 }}>
                            <Slider {...settings}>
                                {banner.map((value, index) => {
                                    return (
                                        <>
                                            <div
                                                className=""
                                                key={index}
                                                style={{
                                                    padding: mobileMode ? "30px 0" : "30px 5px 0 5px",
                                                    background: "none",
                                                    boxShadow: "none",
                                                    margin: 0,
                                                    borderRadius: "0.5rem",
                                                    transition: "1s all",
                                                    WebkitTransition: "1s all",
                                                }}
                                            >
                                                <div className="slide-img" style={{ borderRadius: 5, height: 200 }}>
                                                    <img src={value.cover} alt="" style={{ objectFit: "cover", width: "100%", height: "100%", borderRadius: "0.5rem" }} />
                                                </div>
                                            </div>
                                        </>
                                    );
                                })}
                            </Slider>
                        </div>
                    </section>
                </section>
            </div>
        </>
    );
};

export default HomePage;
