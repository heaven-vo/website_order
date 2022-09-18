import React from "react";
import TopCate from "../top/TopCate";
import SlideCard from "./SlideCard";

const SliderHome = () => {
    return (
        <>
            <section className="homeSlide contentWidth" style={{ width: "80%" }}>
                <div className="container" >
                    <SlideCard />
                </div>
            </section>
            
        </>
    );
};

export default SliderHome;
