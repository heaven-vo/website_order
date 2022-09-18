import React from "react";
import Sdata from "./Sdata";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SlideCard = () => {
    const settings = {
        dots: true,
        infinite: true,
        centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        appendDots: (dots) => {
            return <ul style={{ margin: "0px" }}>{dots}</ul>;
        },
    };
    return (
        <>
            <Slider {...settings}>
                {Sdata.map((value, index) => {
                    return (
                        <>
                            <div className="box center_flex" style={{ marginBottom: 50, marginTop: 20 }} key={index + 1}>
                                <div className="">
                                    <img src={value.cover} alt="" width={"100%"} />
                                </div>
                            </div>
                        </>
                    );
                })}
            </Slider>
        </>
    );
};

export default SlideCard;
