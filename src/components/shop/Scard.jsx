import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Sdata from "./Sdata";
import "../newarrivals/style.css";

const Scard = () => {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        rows: 2,
        responsive: [
          
            {
                breakpoint: 950,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
        autoplay: true,
    };
    return (
        <>
            <Slider {...settings}>
                {Sdata.map((value, index) => {
                    return (
                        <>
                            <div className="box product" key={index}>
                                <div className="img">
                                    <img src={value.cover} alt="" width="100%" />
                                </div>
                                <h4 style={{ textAlign: "center", marginTop: 15 }}>{value.name}</h4>
                                {/* <span>{value.price}</span> */}
                            </div>
                        </>
                    );
                })}
            </Slider>
        </>
    );
};

export default Scard;
