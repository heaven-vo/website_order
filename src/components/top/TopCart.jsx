import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Tdata from "./Tdata";

const TopCart = () => {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        // autoplay: true,
        responsive: [
            {
                breakpoint: 950,
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
        ],
    };
    return (
        <>
            <Slider {...settings}>
                {Tdata.map((value, index) => {
                    return (
                        <>
                            <div className="box product" key={index} style={{ padding: 0, background: "none", boxShadow: "none" }}>
                                <div className="nametop d_flex">
                                    {/* <span className="tleft">{value.para}</span>
                                    <span className="tright">{value.desc}</span> */}
                                </div>
                                <div className="img boxShadow">
                                    <img src={value.cover} alt="" />
                                </div>
                                <div>
                                    <h4 className="product_category">{value.name}</h4>
                                </div>
                            </div>
                        </>
                    );
                })}
            </Slider>
        </>
    );
};

export default TopCart;
