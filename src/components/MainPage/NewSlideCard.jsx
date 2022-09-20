import React from 'react'
import Slider from 'react-slick';
import Sdata from './Sdata';

export const NewSlideCard = () => {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
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
    return (
        <>
            <Slider {...settings}>
                {Sdata.map((value, index) => {
                    return (
                        <>
                            <div className="box product" key={index} style={{ padding: 0, background: "none", boxShadow: "none" }}>
                                <div className="nametop d_flex">
                                    {/* <span className="tleft">{value.para}</span>
                                    <span className="tright">{value.desc}</span> */}
                                </div>
                                <div className="img ">
                                    <img src={value.cover} alt="" />
                                </div>
                                
                            </div>
                        </>
                    );
                })}
            </Slider>
        </>
    );
}
