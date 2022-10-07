import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Slider from "react-slick";
import Rodal from "rodal";
import { LOCALSTORAGE_CART_NAME } from "../../constants/Variable";
import { AppContext } from "../../context/AppProvider";
import { SampleNextArrow, SamplePrevArrow } from "../flashDeals/FlashCard";
import { ProductCart } from "./ProductCart";

export const ProductSlide = ({ filtter, label, data, labelImg, cateId, isLoading, isViewAll }) => {
    const { setCart, setisCartMain, mobileMode, menu } = useContext(AppContext);
    const [visiblePopupQuantity, setVisiblePopupQuantity] = useState(false);
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
    const hanldeRodal = (child) => {
        console.log(child);
        setVisiblePopupQuantity(child.rodal);
        setProductRodal(child.product);
        setIndexRodal(child.index);
    };
    const deleteCartItem = () => {
        // console.log(productRodal);
        const CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME));
        let newCarts = CartList?.filter((item) => item.id !== productRodal.id);
        setCart([...newCarts]);
        localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify([...newCarts]));
        setVisiblePopupQuantity(false);
        itemsRef.current[indexRodal].resetQuantity();

        setProductRodal({});
        if (newCarts.length === 0) {
            setisCartMain(false);
        }
    };
    const settingProductSlide = {
        dots: false,
        infinite: false,
        slidesToShow: slideShow,
        slidesToScroll: 4,
        autoplay: false,
        swipeToSlide: false,
        swipe: false,
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
                    // slidesToScroll: data.length,
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
            <Rodal
                height={180}
                width={mobileMode ? 350 : 400}
                visible={visiblePopupQuantity}
                onClose={() => {
                    setVisiblePopupQuantity(false);
                }}
                style={{ borderRadius: 10 }}
            >
                <div style={{ paddingBottom: "10px", textAlign: "center" }}>
                    <span style={{ fontSize: 16, fontWeight: 700 }}>Bạn có chắc muốn xóa</span>
                </div>
                <div style={{ padding: "10px 0 5px 0", textAlign: "center" }}>
                    <span className="cart-quantity-name" style={{ fontSize: 20, fontWeight: 700, textAlign: "center", color: "rgb(82, 182, 91)" }}>
                        {productRodal?.name}
                    </span>
                </div>

                <div className="f_flex" style={{ width: " 100%", justifyContent: "space-between", paddingTop: 20, gap: 10 }}>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setVisiblePopupQuantity(false);
                        }}
                        style={{
                            flex: 1,
                            padding: 14,
                            fontSize: "1.1em",
                            height: 45,
                            cursor: "pointer",
                            fontWeight: 700,
                            borderRadius: 10,
                            background: "#aab2bd",
                            color: "#fff",
                            transition: "0.3s all",
                        }}
                    >
                        Không
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            // setisProductCartRodal(false);
                            // setIsOpenRodal(false);
                            deleteCartItem();
                        }}
                        style={{
                            flex: 1,
                            padding: 14,
                            fontSize: "1.1em",
                            height: 45,
                            cursor: "pointer",
                            fontWeight: 700,
                            borderRadius: 10,
                            background: "var(--primary)",
                            color: "#fff",
                            transition: "0.3s all",
                        }}
                    >
                        OK
                    </button>
                </div>
            </Rodal>
            <section className="shop product-slide" style={{ padding: "15px 15px 0px 15px" }}>
                <div className="container d_flex">
                    <div className="contentWidth" style={{ marginLeft: 0 }}>
                        <div style={{ marginBottom: 20 }}>
                            <div className="f_flex" style={{ alignItems: "center", marginBottom: 10, gap: 10 }}>
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
                                <div style={{ width: 40, height: 40, borderRadius: 50, marginLeft: 5 }}>
                                    <img style={{ borderRadius: 50, objectFit: "cover", width: "100%", height: "100%" }} src={labelImg} alt="" />
                                </div>
                                <h3 style={{}}>{label}</h3>
                                <div
                                    className="heading-right  "
                                    style={{ display: label ? "block" : "none" }}
                                    onClick={() => {
                                        history.push(`/menu/${menu}/${filtter}/${cateId}`);
                                    }}
                                >
                                    {/* <span>Xem tất cả</span> */}
                                    <i class="fa-solid fa-chevron-right" style={{ fontSize: 18, marginTop: 5, marginLeft: 30 }}></i>
                                </div>
                            </div>
                            <Slider {...settingProductSlide}>
                                {data.map((value, index) => {
                                    return <ProductCart ref={(el) => (itemsRef.current[index] = el)} index={index} openRodal={(e) => hanldeRodal(e)} product={value} key={index} />;
                                })}
                                {slideShow > 3 && (
                                    <div className="">
                                        <div className="center_flex " style={{ flexDirection: "column", height: 220, marginLeft: 10 }}>
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
            </section>
        </>
    );
};