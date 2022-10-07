import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../context/AppProvider";

export const CartMain = () => {
    const { userInfo, setIsOpenDrawer, Cart, headerInfo } = useContext(AppContext);
    let history = useHistory();
    useEffect(() => {
        return () => {};
    }, [Cart]);

    return (
        <>
            <section className=" container cart-main-wrapper">
                <div className="container cart-main-container ">
                    <div className="">
                        <div
                            className="cart-main-item"
                            onClick={() => {
                                history.push("/checkout");
                            }}
                        >
                            <i className="fa-solid fa-cart-shopping" style={{ fontSize: 25, flex: 1 }}></i>
                            <span>{Cart.length === 0 ? "0" : Cart.length}</span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
