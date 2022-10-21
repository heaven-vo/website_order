import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Rodal from "rodal";
import { LOCALSTORAGE_CART_NAME } from "../../constants/Variable";
import { AppContext } from "../../context/AppProvider";

export const ModalDeleteCart = () => {
    const { openDeleteCart, setOpenDeleteCart, mobileMode, setCart, setisCartMain } = useContext(AppContext);
    let history = useHistory();
    return (
        <Rodal
            height={mobileMode ? 300 : 330}
            width={mobileMode ? 350 : 400}
            visible={openDeleteCart}
            showCloseButton={false}
            onClose={() => {
                // setOpentModalSuccess(false);
            }}
            style={{ borderRadius: 10 }}
        >
            <div class="modal-delete-cart">
                <div class="modal-delete-cart-img">
                    <img class="" src="/images/delete-cart.jpg" alt="" />
                </div>
                <div style={{ textAlign: "center" }} className="modal-delete-cart-title">
                    <span style={{}}>Bạn muốn đổi thực đơn?</span>
                </div>
                <div style={{ textAlign: "center" }} className="modal-delete-cart-content">
                    <span className="">Nhưng những món bạn đã chọn từ cửa hàng trước sẽ bị xóa khỏi giỏ hàng nhé.</span>
                </div>
            </div>
            <div className="f_flex rodal-delet-cart" style={{ width: " 100%", justifyContent: "space-between", paddingTop: 20, gap: 10 }}>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setOpenDeleteCart(false);
                        history.push("/");
                    }}
                    style={{
                        flex: 1,
                        padding: 14,
                        fontSize: "1em",
                        height: 50,
                        cursor: "pointer",
                        fontWeight: 700,
                        borderRadius: 10,
                        background: "#aab2bd",
                        color: "#fff",
                        transition: "0.3s all",
                        WebkitTransition: "0.3s all",
                    }}
                >
                    Quay lại
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setOpenDeleteCart(false);
                        localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify([]));
                        setCart([]);
                        setisCartMain(false);
                    }}
                    style={{
                        flex: 1,
                        padding: 14,
                        fontSize: "1em",
                        height: 50,
                        cursor: "pointer",
                        fontWeight: 700,
                        borderRadius: 10,
                        background: "var(--primary)",
                        color: "#fff",
                        transition: "0.3s all",
                        WebkitTransition: "0.3s all",
                    }}
                >
                    Đồng ý
                </button>
            </div>
        </Rodal>
    );
};
