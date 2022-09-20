import React, { useEffect, useState } from "react";
import Sdata from "./Sdata";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SlideCard = () => {
    const [dot, setDot] = useState(true);
    const settings = {
        dots: dot,
        infinite: true,
        centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        // autoplay: true,
        appendDots: (dots) => {
            return <ul style={{ margin: "0px" }}>{dots}</ul>;
        },
    };

    const hasWindow = typeof window !== "undefined";
    useEffect(() => {
        if (hasWindow) {
            function handleResize() {
                if (window.innerWidth > 1440) {
                    setDot(true);
                } else if (window.innerWidth <= 700) {
                    setDot(false);
                }
            }

            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);
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
