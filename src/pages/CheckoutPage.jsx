import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { caculatorVND } from "../constants/Caculator";
import { IMAGE_NOTFOUND } from "../constants/Variable";
import { AppContext } from "../context/AppProvider";

export const CheckoutPage = () => {
    const { setIsHeaderOrder, Cart } = useContext(AppContext);
    const [CartList, setCartList] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [paymentType, setpaymentType] = useState(1);
    let history = useHistory();
    const handleSubmit = () => {};
    const handleChangePaymentType = (type) => {
        setpaymentType(type);
    };
    useEffect(() => {
        setIsHeaderOrder(false);
        // setIsHeader(false);
    }, [setIsHeaderOrder]);

    useEffect(() => {
        var total = 0;
        Cart?.map((item) => {
            return (total = item.pricePerPack * item.quantityCart + total);
        });
        setTotalPrice(total / 1000);
        setCartList(Cart);
    }, [Cart]);
    const hanldeSubmit = () => {
        console.log("123");
    };
    return (
        <>
            <section className="cart-items">
                <div className="container d_flex cart-mobile" style={{ gap: 10 }}>
                    <div className="checkout-total">
                        {CartList.length !== 0 && (
                            <>
                                <div className="product" style={{ marginBottom: 30 }}>
                                    <div>
                                        <h2 style={{ marginBottom: 7 }}>Khi Hết Hàng, Bạn Muốn...</h2>
                                        <div className="checkout-total-info">
                                            <select type="text" name="" id="">
                                                <option value="1">Bỏ sản phẩm nếu không có hàng.</option>
                                                <option value="3">Gọi để xác nhận sản phẩm thay thế. Thời gian giao hàng sẽ bị lùi lại.</option>
                                                <option value="4">Xem ghi chứ</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="product" style={{ margin: "0 10px 15px 10px" }}>
                                    <div>
                                        <h2>Thông Tin Nhận Hàng</h2>
                                        <div className=" d_flex" style={{ marginBottom: 10 }}></div>
                                    </div>
                                    <div className="checkout-total-info">
                                        <h3>Họ Và Tên</h3>
                                        <input type="text" name="" id="" />
                                    </div>
                                    <div className="checkout-total-info">
                                        <h3>Số Điện Thoại</h3>
                                        <input type="text" name="" id="" required />
                                    </div>
                                    <div className="checkout-total-info">
                                        <h3>Tòa Nhà</h3>
                                        <select type="text" name="" id="">
                                            <i class="fa-solid fa-arrow-left-long "></i>
                                            <option value="1">S001</option>
                                            <option value="2">S002</option>
                                            <option value="3">S003</option>
                                            <option value="4">S004</option>
                                            <option value="5">S005</option>
                                        </select>
                                    </div>
                                    {/* <div className="checkout-total-info">
                                        <h3>Phòng</h3>
                                        <input type="text" name="" id="" />
                                    </div> */}
                                    <div className="checkout-total-info">
                                        <h3>Ghi Chú</h3>
                                        <textarea type="text" name="" id="" />
                                    </div>
                                </div>
                                <div className="c_flex mobile-active">
                                    <div
                                        onClick={() => history.push("/cart")}
                                        style={{ textAlign: "center", margin: "0 10px 0 10px", width: "calc(100% - 20px)", height: 50, borderRadius: "0.5rem", alignItems: "center" }}
                                        className="f_flex btn-hover-none"
                                    >
                                        <i class="fa-solid fa-arrow-left-long"></i>
                                        <span style={{ fontWeight: 600, fontSize: 16 }}>Quay Lại Giỏ Hàng</span>
                                    </div>
                                    <div
                                        onClick={() => hanldeSubmit()}
                                        style={{ textAlign: "center", margin: "0 10px 0 10px", width: "calc(100% - 20px)", height: 50, borderRadius: "0.5rem", alignItems: "center" }}
                                        className="center_flex btn-hover"
                                    >
                                        <span style={{ fontWeight: 700, fontSize: 16 }}>Thanh Toán</span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="checkout-product product" style={{ padding: 0 }}>
                        <div>
                            <div style={{ padding: "20px 0 5px 20px" }}>
                                <h2 style={{ fontSize: 20 }}>Giỏ Hàng</h2>
                            </div>
                            {CartList.map((item) => {
                                const productQty = item.pricePerPack * item.quantityCart;

                                return (
                                    <div className="checkout-list  d_flex" key={item.id}>
                                        <div className="img">
                                            <img src={item.image || IMAGE_NOTFOUND} alt="" />
                                        </div>
                                        <div className="cart-details" style={{ width: "90%" }}>
                                            <div className="cart-details-info" style={{ paddingLeft: 10 }}>
                                                <div>
                                                    <h3>{item.name}</h3>
                                                    <span style={{ fontSize: 14, color: "rgb(160,160,160)" }}>{item.storeName}</span>
                                                </div>
                                                <h4>
                                                    {item.pricePerPack + "đ"} * {item.quantityCart}
                                                    {/* <span>=</span> */}
                                                    {/* <span>{productQty / 1000 + ".000đ"}</span> */}
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            <div className="checkout-list " style={{ marginTop: 25, marginBottom: 25, border: "none" }}>
                                <div className=" d_flex" style={{ marginBottom: 10 }}>
                                    <h4 style={{ fontWeight: 400, color: "#717171" }}>Tiền Hàng :</h4>
                                    <span style={{ fontSize: 16, fontWeight: 400, color: "#717171" }}>{caculatorVND(totalPrice + ".000đ")}</span>
                                </div>
                                <div className=" d_flex" style={{ marginBottom: 25 }}>
                                    <h4 style={{ fontWeight: 400, color: "#717171" }}>Phí Giao Hàng :</h4>
                                    <span style={{ fontSize: 16, fontWeight: 400, color: "#717171" }}>10.000đ</span>
                                </div>
                                <div className=" d_flex" style={{ borderTop: "1px solid rgb(220,220,220)", paddingTop: 25 }}>
                                    <h4 style={{ fontSize: 18 }}>Tổng Cộng :</h4>
                                    <h4 style={{ fontSize: 20, fontWeight: 700 }}>{caculatorVND(totalPrice + 10 + ".000đ")}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="c_flex mobile-inactive">
                        <div
                            onClick={() => history.push("/cart")}
                            style={{ textAlign: "center", margin: "0 10px 0 10px", width: "calc(100% - 20px)", height: 50, borderRadius: "0.5rem", alignItems: "center" }}
                            className="f_flex btn-hover-none"
                        >
                            <i class="fa-solid fa-arrow-left-long"></i>
                            <span style={{ fontWeight: 600, fontSize: 16 }}>Quay Lại Giỏ Hàng</span>
                        </div>
                        <div
                            onClick={() => hanldeSubmit()}
                            style={{ textAlign: "center", margin: "0 10px 0 10px", width: "calc(100% - 20px)", height: 50, borderRadius: "0.5rem", alignItems: "center" }}
                            className="center_flex btn-hover"
                        >
                            <span style={{ fontWeight: 700, fontSize: 16 }}>Thanh Toán</span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
