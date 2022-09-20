import React from "react";

const Cart = ({ product }) => {
    return (
        <>
            <div className="box" key={product.id}>
                <div className="img">
                    <img src={product.cover} alt="" />
                </div>
                <h4 style={{ fontSize: 15, color: "#666" }}>{product.shop}</h4>
                <h3 style={{ fontWeight: 600 }}>{product.name}</h3>
                <span style={{ fontWeight: 600, color: "#e94560" }}>{product.price}.000đ</span>
            </div>
        </>
    );
};

export default Cart;
