import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
const FlashCard = ({ productItems }) => {
    const [count, setCount] = useState(0);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 450,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    nextArrow: null,
                    prevArrow: null,
                },
            },
        ],
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    return (
        <>
            <Slider {...settings}>
                {productItems.map((productItems) => {
                    return (
                        <div className="" key={productItems.id} style={{ width: "100px !important" }}>
                            <div className="product mtop">
                                <div className="img">
                                    {/* <span className='discount'>{productItems.discount}% Off</span> */}
                                    <img style={{ width: "100%" }} src={productItems.cover} alt="" />
                                    <div className="product-count">
                                        <label>{count}</label> <br />
                                    </div>
                                    {/* <div className="product-like">{productItems.isLike ? <i className="fa-solid fa-heart like"></i> : <i className="fa-regular fa-heart"></i>}</div> */}
                                </div>
                                <div className="product-details">
                                    <span style={{ fontSize: 15, color: "#666" }}>{productItems.shop}</span>
                                    <h4>{productItems.name}</h4>
                                    {/* <div className="rate">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                    </div> */}
                                    <div className="price">
                                        <h4>{productItems.price}.000đ </h4>
                                        {/* step : 3  
                     if hami le button ma click garryo bahne 
                    */}
                                        <button
                                            onClick={() => {
                                                // addToCart(productItems);
                                                // increment();
                                            }}
                                        >
                                            <i className="fa fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </Slider>
        </>
    );
};

export default FlashCard;
