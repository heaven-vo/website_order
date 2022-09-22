import React, { useContext } from "react";
import { AppContext } from "../../context/AppProvider";
import Cart from "./Cart";
import Ndata from "./Ndata";
import "./style.css";

const NewArrivals = () => {
    const { mobileMode } = useContext(AppContext);
    return (
        <>
            <section className="NewArrivals background">
                <div className="container">
                    <div className="heading d_flex">
                        <div className="heading-left   f_flex">
                            <img src="https://img.icons8.com/glyph-neue/64/26e07f/new.png" />
                            <h2>Bán Chạy </h2>
                        </div>
                        <div className="heading-right  ">
                            <span>Xem Tất Cả</span>
                            <i className="fa-solid fa-caret-right"></i>
                        </div>
                    </div>
                    <div className="content grid6 product best-sale">
                        {Ndata.map((val, index) => {
                            // if (mobileMode ) {
                            //     return true;
                            // }
                            return <Cart product={val} key={index} />;
                        })}
                    </div>
                </div>
            </section>
        </>
    );
};

export default NewArrivals;
