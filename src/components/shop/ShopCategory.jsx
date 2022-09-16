import React from "react";
import { Link } from "react-router-dom";

export const ShopCategory = ({ data, title }) => {
    return (
        <>
            <section className="background ">
                <div className="container">
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 30 }}>
                        <div>
                            <h2>{title}</h2>
                        </div>
                    </div>
                    <div className="grid6-shop">
                        {data.map((value, index) => {
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
