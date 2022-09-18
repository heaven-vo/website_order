import React, { useContext, useEffect, useState } from "react";
import { caculatorVND } from "../../constants/Caculator";
import { LOCALSTORAGE_NAME } from "../../constants/Variable";
import { AppContext } from "../../context/AppProvider";
import "./style.css";
import { Link } from "react-router-dom";
import Rodal from "rodal";

const Cart = ({}) => {
    const { Cart, setCart, listProducts, setlistProducts } = useContext(AppContext);
    const [totalPrice, setTotalPrice] = useState(0);
    const [CartList, setCartList] = useState([]);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        var total = 0;
        Cart?.map((item) => {
            return (total = item.price * item.quantityCart + total);
        });
        setTotalPrice(total);
        setCartList(Cart);
    }, [Cart]);

    // Tăng số lượng sản phẩm trong giỏ hàng
    const increaseQty = (id) => {
        // Tạo 1 giỏ hàng mới và tăng số lượng sản phẩm dựa theo ID
        let newCarts = CartList?.map((item) => {
            if (item.id === id) {
                item.quantityCart = item.quantityCart + 1;
            }
            return item;
        });
        // Tạo 1 mảng sản phẩm mới từ mảng cũ kèm theo tăng số lượng sản phẩm theo ID
        let newProduts = listProducts?.map((item) => {
            if (item.id === id) {
                item.quantityCart = item.quantityCart + 1;
            }
            return item;
        });
        // Cập nhật lại Giỏ hàng ở Provider
        setCart([...newCarts]);
        // Cập nhật giỏ hàng ỏ local storage
        localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify([...newCarts]));
        // Cập nhật lại danh sách sản phẩm hiện tại với số lượng vừa được cập nhật
        setlistProducts([...newProduts]);
    };

    // Giảm số lượng sản phẩm trong giỏ hàng
    const decreaseQty = (id) => {
        let isDelete = false;
        let newCarts = CartList?.map((item) => {
            if (item.id === id && item.quantityCart > 1) {
                item.quantityCart = item.quantityCart - 1;
            } else if (item.id === id && item.quantityCart <= 1) {
                deleteCartItem(item.id);
                isDelete = true;
            }
            return item;
        });
        let newProduts = listProducts?.map((item) => {
            if (item.id === id) {
                item.quantityCart = item.quantityCart - 1;
            }
            return item;
        });
        // Cập nhật lại danh sách sản phẩm hiện tại với số lượng vừa được cập nhật
        setlistProducts([...newProduts]);
        if (!isDelete) {
            setCart([...newCarts]);
            localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify([...newCarts]));
        }
    };

    const deleteCartItem = (id) => {
        let newCarts = CartList?.filter((item) => item.id !== id);
        let newProduts = listProducts?.filter((item) => item.id !== id);
        // Cập nhật lại danh sách sản phẩm hiện tại với số lượng vừa được cập nhật
        setlistProducts([...newProduts]);
        setCart([...newCarts]);
        localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify([...newCarts]));
    };
    return (
        <>
            <section className="cart-items">
                <div className="container center_flex">
                    {CartList.length === 0 && (
                        <>
                            <div>
                                <h1 className=" " style={{ textAlign: "center", height: 60, fontSize: 20 }}>
                                    Giỏ Hàng Hiện Đang Trống
                                </h1>
                                <Link to="/">
                                    <div style={{ textAlign: "center", width: "100%", height: 50, borderRadius: "0.375rem", alignItems: "center" }} className="center_flex btn-hover">
                                        <span onClick={() => {}} style={{ fontWeight: 600, fontSize: 16 }}>
                                            Quay lại
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
                <div className="container d_flex cart-mobile">
                    <div className="cart-details">
                        {CartList.map((item) => {
                            const productQty = item.price * item.quantityCart;

                            return (
                                <div className="cart-list product d_flex" key={item.id}>
                                    <div className="img">
                                        <img src={item.cover} alt="" />
                                    </div>
                                    <div className="cart-details">
                                        <div style={{ paddingLeft: 30 }}>
                                            <h3>{item.name}</h3>
                                            <span style={{ fontSize: 15, color: "rgb(160,160,160)" }}>{item.shop}</span>
                                            <h4>
                                                {item.price}.000đ * {item.quantityCart}
                                                <span>=</span>
                                                <span>{productQty}.000đ</span>
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="cart-items-function">
                                        <div className="removeCart">
                                            <button className="removeCart cusor" onClick={() => deleteCartItem(item.id)}>
                                                <i className="fa-solid fa-xmark"></i>
                                            </button>
                                        </div>

                                        <div className="cartControl d_flex">
                                            <button className="incCart" onClick={() => increaseQty(item.id)}>
                                                <i className="fa-solid fa-plus"></i>
                                            </button>
                                            <button className="desCart" onClick={() => decreaseQty(item.id)}>
                                                <i className="fa-solid fa-minus"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="cart-item-price"></div>
                                </div>
                            );
                        })}
                    </div>

                    {CartList.length !== 0 && (
                        <div className="cart-total product" style={{ marginBottom: 50 }}>
                            <div style={{ marginBottom: 50 }}>
                                <h2>Tổng Tiền Hàng</h2>
                                <div className=" d_flex" style={{ marginBottom: 10 }}>
                                    <h4>Tiền Hàng :</h4>
                                    <span style={{ fontSize: 18, fontWeight: 600 }}>{caculatorVND(totalPrice)}.000đ</span>
                                </div>
                                <div className=" d_flex" style={{ marginBottom: 10 }}>
                                    <h4>Phí Giao Hàng :</h4>
                                    <span style={{ fontSize: 18, fontWeight: 600 }}>10.000đ</span>
                                </div>
                                <div className=" d_flex">
                                    <h4>Tổng Cộng :</h4>
                                    <h3>{caculatorVND(totalPrice + 10)}.000đ</h3>
                                </div>
                            </div>
                            <div style={{ textAlign: "center", width: "100%", height: 50, borderRadius: "0.375rem", alignItems: "center" }} className="center_flex btn-hover">
                                <span onClick={() => {}} style={{ fontWeight: 600, fontSize: 16 }}>
                                    Thanh Toán
                                </span>
                            </div>
                            <div>
                                <Rodal height={150} visible={visible} onClose={() => setVisible(false)}>
                                    <div>
                                        <span style={{ fontSize: 16 }}>Bạn Có Chắc Muốn Xóa Sản Phẩm Này Khỏi Giỏ Hàng</span>
                                    </div>
                                </Rodal>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default Cart;
