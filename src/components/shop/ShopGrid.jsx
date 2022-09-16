import React from "react";
import { Link } from "react-router-dom";
import Scard from "./Scard";
import Sdata from "./Sdata";
const ShopGrid = () => {
    return (
        <>
            <section className="Discount background ">
                <div className="container">
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 30 }}>
                        <div>
                            <h2>Cửa Hàng Nổi Bật</h2>
                        </div>
                    </div>
                    <div className="grid4">
                        {Sdata.map((value, index) => {
                            return (
                                <>
                                    <Link to="/shop-detail">
                                        <div className="box product" key={index}>
                                            <div className="img">
                                                <img src={value.cover} alt="" width="100%" />
                                            </div>
                                            <h4 style={{ textAlign: "center", marginTop: 15 }}>{value.name}</h4>
                                            {/* <span>{value.price}</span> */}
                                        </div>
                                    </Link>
                                </>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
};

export default ShopGrid;
