import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Slider from "react-slick";
import { AppContext } from "../../context/AppProvider";
import { ShopCart } from "./ShopItem";

export const SampleNextArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="control-btn" onClick={onClick}>
            <button className="next">
                <i className="fa-solid fa-arrow-right"></i>
            </button>
        </div>
    );
};
export const SamplePrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="control-btn" onClick={onClick}>
            <button className="prev">
                <i className="fa-solid fa-arrow-left"></i>
            </button>
        </div>
    );
};
export const ShopSlide = ({ filtter, label, data, labelImg, cateId, isLoading, isViewAll, reLoad }) => {
    const { setCart, setisCartMain, mobileMode, menu } = useContext(AppContext);
    const [visiblePopupQuantity, setVisiblePopupQuantity] = useState(false);
    const [visiblePopupOutOfStore, setVisiblePopupOutOfStore] = useState(false);
    const [productRodal, setProductRodal] = useState({});
    const [indexRodal, setIndexRodal] = useState({});
    const [slideShow, setslideShow] = useState(1);
    const itemsRef = useRef([]);
    useEffect(() => {
        if (data.length > 5) {
            setslideShow(5);
        } else {
            setslideShow(1);
        }

        return () => {};
    }, [data, slideShow]);

    const ShopSlide = {
        dots: false,
        infinite: false,
        slidesToShow: slideShow,
        slidesToScroll: 4,
        autoplay: false,
        swipeToSlide: false,
        swipe: false,
        rows: 1,
        variableWidth: true,
        appendDots: (dots) => {
            return <ul style={{ margin: "0px" }}>{dots}</ul>;
        },
        nextArrow: slideShow >= 5 && <SampleNextArrow />,
        prevArrow: slideShow >= 5 && <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: data.length >= 2 ? 2 : 1,
                    slidesToScroll: 1,
                    swipeToSlide: true,
                    // slidesPerRow: 1,
                    swipe: true,
                    nextArrow: "",
                    prevArrow: "",
                    rows: 1,
                },
            },
        ],
    };
    let history = useHistory();
    return (
        <>
            <section className="shop product-slide" style={{ padding: "0px 0px 0px 0px" }}>
                <div className="container d_flex">
                    <div className="contentWidth" style={{ marginLeft: 0 }}>
                        <div style={{}}>
                            <div className="f_flex" style={{ padding: "30px 15px 10px 15px", alignItems: "center", gap: 10, background: "rgb(246, 249, 252)" }}>
                                {/* {isLoading ? (
                                        <div style={{ marginRight: 5 }}>
                                            <Skeleton height={45} width={45} borderRadius={50} />
                                        </div>
                                    ) : (
                                        <div style={{ width: 45, height: 45, borderRadius: 50, marginLeft: 5 }}>
                                            <img style={{ borderRadius: 50, objectFit: "cover", width: "100%", height: "100%" }} src={labelImg} alt="" />
                                        </div>
                                    )}
                                    {isLoading ? <Skeleton height={43} width={150} borderRadius={8} style={{ margin: 0 }} /> : <h2>{label ? label : ""}</h2>} */}
                                {/* <div style={{ width: 40, height: 40, borderRadius: 50, marginLeft: 5 }}>
                                    <img style={{ borderRadius: 50, objectFit: "cover", width: "100%", height: "100%" }} src={labelImg} alt="" />
                                </div> */}
                                <h3 style={{ color: "rgb(100, 100, 100)", fontSize: 16 }}>{label}</h3>
                                <div
                                    className="heading-right  "
                                    style={{ display: label ? "block" : "none", color: "rgb(100, 100, 100)" }}
                                    onClick={() => {
                                        history.push(`/menu/${menu}/${filtter}/${cateId}`);
                                    }}
                                >
                                    {/* <span>Xem tất cả</span> */}
                                    <i class="fa-solid fa-chevron-right" style={{ fontSize: 18, marginTop: 5, marginLeft: 30 }}></i>
                                </div>
                            </div>
                            <div className="shop-slide" style={{ padding: "15px 15px 15px 15px" }}>
                                <Slider {...ShopSlide}>
                                    {data.map((value, index) => {
                                        return <ShopCart ref={(el) => (itemsRef.current[index] = el)} index={index} product={value} key={index} />;
                                    })}
                                    {slideShow > 3 && (
                                        <div className="" style={{}}>
                                            <div className="center_flex " style={{ flexDirection: "column", height: 150, marginLeft: 10 }}>
                                                <div
                                                    className="center_flex cusor"
                                                    onClick={() => {
                                                        history.push(`/menu/${menu}/${filtter}/${cateId}`);
                                                    }}
                                                    style={{ borderRadius: 50, border: "1px solid rgb(220,220,220)", width: 50, height: 50 }}
                                                >
                                                    <i class="fa-solid fa-chevron-right" style={{ fontSize: 18 }}></i>
                                                </div>
                                                <span
                                                    onClick={() => {
                                                        history.push(`/menu/${menu}/${filtter}/${cateId}`);
                                                    }}
                                                    className="cusor"
                                                >
                                                    Xem tất cả
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
