import React from "react";
import Ndata from "./Ndata";

const Cart = () => {
    return (
        <>
            <div className="content grid6 product">
                {Ndata.map((val, index) => {
                    return (
                        <div className="box" key={index}>
                            <div className="img">
                                <img src={val.cover} alt="" />
                            </div>
                            <h4 style={{ fontSize: 15, color: "#666" }}>{val.shop}</h4>
                            <h3 style={{ fontWeight: 600 }}>{val.name}</h3>
                            <span>{val.price}.000đ</span>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Cart;
