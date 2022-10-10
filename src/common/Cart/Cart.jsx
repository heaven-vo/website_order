import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { caculatorVND } from "../../constants/Caculator";
import { IMAGE_NOTFOUND, LOCALSTORAGE_CART_NAME } from "../../constants/Variable";
import { AppContext } from "../../context/AppProvider";
import Rodal from "rodal";
import Select from "react-select";
import "./style.css";
import Loading from "../Loading/Loading";
import { postOrder } from "../../apis/apiService";
import { CountDown } from "./CountDown";

const Cart = ({}) => {
    const { Cart, setCart, setHeaderInfo, setIsHeaderOrder, mobileMode, setisCartMain, auth, userInfo, setUserInfo } = useContext(AppContext);
    const [totalPrice, setTotalPrice] = useState(0);
    const [CartList, setCartList] = useState([]);
    const [visible, setVisible] = useState(false);
    const [visiblePopupInfo, setVisiblePopupInfo] = useState(false);
    const [visiblePopupQuantity, setVisiblePopupQuantity] = useState(false);
    const [visiblePopupComfirm, setVisiblePopupComfirm] = useState(false);
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [building, setBuilding] = useState("");
    const [productRodal, setProductRodal] = useState("");
    const [productRodalQuantity, setProductRodalQuantity] = useState(1);
    const [isValidFullName, setIsValidFullname] = useState(false);
    const [isValidPhone, setIsValidPhone] = useState(false);
    const [isValidBuilding, setIsValidBuilding] = useState(false);
    const [isLoadingOrder, setisLoadingOrder] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [payment, setPayment] = useState({});
    const [note, setNote] = useState("");
    const handleSubmit = () => {
        let isValid = true;
        if (fullName.length === 0 || phone.length === 0 || !building?.value) {
            isValid = false;
        }
        if (!fullName && fullName.length === 0) {
            setIsValidFullname(true);
        } else {
            setIsValidFullname(false);
        }
        if (!phone && phone.length === 0) {
            setIsValidPhone(true);
        } else {
            setIsValidPhone(false);
        }
        if (!building && building.length === 0) {
            setIsValidBuilding(true);
        } else {
            setIsValidBuilding(false);
        }
        if (isValid) {
            setUserInfo({ fullName, phone, building, note });
            setVisiblePopupInfo(false);
        }
    };
    const options = [
        { value: "b1", label: "S013" },
        { value: "b2", label: "S014" },
        { value: "b3", label: "S015" },
        { value: "b4", label: "S016" },
        { value: "b5", label: "S017" },
    ];
    let history = useHistory();
    const hanldeOrder = () => {
        setisLoadingOrder(true);
        let userId = auth.userId;
        let productOrders = Cart.map((item) => {
            return { productInMenuId: item.productMenuId, quantity: item.quantityCart.toString() };
        });
        let order = {
            customerId: userId,
            type: "",
            total: totalPrice + 15000,
            storeId: Cart.length > 0 && Cart[0].storeId,
            buildingId: building.value,
            note: note,
            fullName: fullName,
            phoneNumber: phone,
            shipCost: 15000,
            durationId: "1",
            orderDetail: [...productOrders],
            payments: [
                {
                    type: "Tiền mặt",
                },
            ],
        };
        console.log({ order });
        postOrder(order)
            .then((res) => {
                if (res.data) {
                    localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify([]));
                    setCart([]);
                    setisLoadingOrder(false);

                    history.push("/order");
                }
            })
            .catch((error) => {
                console.log(error);
                setisLoadingOrder(false);
            });
    };
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 100);
        // setUser(userInfo);
        setFullName(userInfo.fullName || "");
        setPhone(userInfo.phone || "");
        setBuilding(userInfo.building || "");
        setNote(userInfo.note || "");
    }, [userInfo]);
    useEffect(() => {
        setIsLoading(true);
        setIsHeaderOrder(false);
        setHeaderInfo({ isSearchHeader: false, title: "Đơn hàng của bạn" });
        setisCartMain(false);
        // setIsHeader(false);

        return () => {
            if (Cart.length > 0) {
                setisCartMain(true);
            }
        };
    }, [setIsHeaderOrder, setHeaderInfo, setisCartMain, Cart.length]);

    useEffect(() => {
        var total = 0;
        Cart?.map((item) => {
            return (total = item.pricePerPack * item.quantityCart + total);
        });
        setTotalPrice(total);
        setCartList(Cart);
    }, [Cart]);

    // Tăng số lượng sản phẩm trong giỏ hàng
    const increaseQty = (id) => {
        setProductRodalQuantity(productRodalQuantity + 1);
    };

    // Giảm số lượng sản phẩm trong giỏ hàng
    const decreaseQty = (id) => {
        setProductRodalQuantity(productRodalQuantity - 1);
    };
    const updateCart = (id) => {
        let newCarts = CartList?.map((item) => {
            if (item.id === id) {
                item.quantityCart = productRodalQuantity;
            }
            return item;
        });
        // Cập nhật lại Giỏ hàng ở Provider
        setCart([...newCarts]);
        // Cập nhật giỏ hàng ỏ local storage
        localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify([...newCarts]));
        setVisiblePopupQuantity(false);
    };
    const deleteCartItem = (id) => {
        let newCarts = CartList?.filter((item) => item.id !== id);
        // let newProduts = listProducts?.filter((item) => item.id !== id);
        // Cập nhật lại danh sách sản phẩm hiện tại với số lượng vừa được cập nhật
        // setlistProducts([...newProduts]);
        setCart([...newCarts]);
        localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify([...newCarts]));
        setVisiblePopupQuantity(false);
    };
    return (
        <>
            <div className={`loading-spin ${!isLoading && "loading-spin-done"}`}></div>
            <Rodal
                height={isValidFullName || isValidPhone ? 510 : 470}
                width={mobileMode ? 350 : 400}
                visible={visiblePopupInfo}
                onClose={() => {
                    setVisiblePopupInfo(false);
                    // setIsValid(true);
                    setIsValidBuilding(false);
                    setIsValidFullname(false);
                    setIsValidPhone(false);
                }}
                style={{ borderRadius: 10 }}
            >
                <div style={{ borderBottom: "1px solid rgb(220,220,220)", paddingBottom: "10px" }}>
                    <span style={{ fontSize: 16, fontWeight: 700 }}>Nơi nhận</span>
                </div>
                <div style={{ padding: "10px 0 10px 0" }}>
                    <span style={{ fontSize: 16, fontWeight: 700 }}>Building (Tòa nhà)</span>
                </div>
                <Select options={options} placeholder="Tòa nhà" onChange={(e) => setBuilding(e)} value={building} />
                {isValidBuilding && (
                    <div className="input-validate">
                        <span>Địa chỉ không được để trống</span>
                    </div>
                )}
                <div style={{ padding: "10px 0 10px 0" }}>
                    <span style={{ fontSize: 16, fontWeight: 700 }}>Tên người nhận</span>
                </div>
                <div style={{ width: " 100%" }}>
                    <input
                        onChange={(e) => {
                            setFullName(e.target.value);
                        }}
                        value={fullName}
                        type="text"
                        style={{ border: "1px solid rgb(200,200,200)", width: " 100%", borderRadius: 4, padding: "10px 10px", lineHeight: "1rem", fontSize: "1rem" }}
                    />
                </div>
                {isValidFullName && (
                    <div className="input-validate">
                        <span>Tên không được để trống</span>
                    </div>
                )}
                <div style={{ padding: "10px 0 10px 0" }}>
                    <span style={{ fontSize: 16, fontWeight: 700 }}>Số điện thoại nhận hàng</span>
                </div>
                <div style={{ width: " 100%" }}>
                    <input
                        onChange={(e) => {
                            setPhone(e.target.value);
                        }}
                        value={phone}
                        type="number"
                        style={{ border: "1px solid rgb(200,200,200)", width: " 100%", borderRadius: 4, padding: "10px 10px", lineHeight: "1rem", fontSize: "1rem" }}
                    />
                </div>
                {isValidPhone && (
                    <div className="input-validate">
                        <span>Số điện thoại không được để trống</span>
                    </div>
                )}
                <div style={{ padding: "10px 0 10px 0" }}>
                    <span style={{ fontSize: 16, fontWeight: 700 }}>Lưu ý đặc biệt</span>
                </div>
                <div style={{ width: " 100%" }}>
                    <input
                        onChange={(e) => {
                            setNote(e.target.value);
                        }}
                        value={note}
                        type="text"
                        placeholder="Ví dụ: Không hành ..."
                        style={{ border: "1px solid rgb(200,200,200)", width: " 100%", borderRadius: 4, padding: "10px 10px", lineHeight: "1rem", fontSize: "1rem" }}
                    />
                </div>
                <div className="f_flex" style={{ width: " 100%", justifyContent: "space-between", paddingTop: 25, gap: 15 }}>
                    <button
                        style={{ flex: 1, padding: 18, fontSize: "1rem", cursor: "pointer", fontWeight: 700, borderRadius: 10 }}
                        onClick={(e) => {
                            e.preventDefault();
                            setVisiblePopupInfo(false);
                        }}
                    >
                        Đóng
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                        style={{ flex: 1, padding: 18, fontSize: "1rem", cursor: "pointer", fontWeight: 700, borderRadius: 10, background: "var(--primary)" }}
                    >
                        OK
                    </button>
                </div>
            </Rodal>
            <Rodal
                height={250}
                width={mobileMode ? 350 : 400}
                visible={visiblePopupQuantity}
                onClose={() => {
                    setVisiblePopupQuantity(false);
                }}
                style={{ borderRadius: 10 }}
            >
                <div style={{ borderBottom: "1px solid rgb(220,220,220)", paddingBottom: "10px" }}>
                    <span style={{ fontSize: 16, fontWeight: 700 }}>Cập nhật giỏ hàng</span>
                </div>

                <div style={{ padding: "10px 0 5px 0", textAlign: "center" }}>
                    <span className="cart-quantity-name" style={{ fontSize: 16, fontWeight: 700, textAlign: "center", color: "rgb(82, 182, 91)" }}>
                        {productRodal.name}
                    </span>
                </div>
                <div style={{ padding: "0px 0 10px 0", textAlign: "center" }}>
                    <span style={{ fontSize: 16, fontWeight: 700, textAlign: "center", color: "rgb(82, 182, 91)", display: "flex", gap: 3, justifyContent: "center" }}>
                        {caculatorVND(productRodal.pricePerPack)}
                        <span style={{ fontSize: "0.9rem", fontWeight: 700 }}>₫</span>
                    </span>
                </div>

                <div className="center_flex ">
                    <div className="center_flex cart-quantity" style={{ width: " 100%" }}>
                        <div
                            style={{ color: productRodalQuantity > 0 ? "" : "rgba(0,0,0,.25)" }}
                            className="center_flex cart-quantity-minus"
                            onClick={() => {
                                if (productRodalQuantity > 0) {
                                    decreaseQty(productRodal.id);
                                }
                            }}
                        >
                            <i className="fa-solid fa-minus"></i>
                        </div>
                        <div className="center_flex cart-quantity-text">
                            <span>{productRodalQuantity}</span>
                        </div>
                        <div className="center_flex cart-quantity-plus" onClick={() => increaseQty(productRodal.id)}>
                            <i className="fa-solid fa-plus"></i>
                        </div>
                    </div>
                </div>

                <div className="f_flex" style={{ width: " 100%", justifyContent: "space-between", paddingTop: 20, gap: 15 }}>
                    {productRodalQuantity > 0 ? (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                updateCart(productRodal?.id);
                            }}
                            style={{
                                flex: 1,
                                padding: 14,
                                fontSize: mobileMode ? "1.1em" : "1.2em",
                                cursor: "pointer",
                                fontWeight: 700,
                                borderRadius: 10,
                                background: "var(--primary)",
                                transition: "0.3s all",
                            }}
                        >
                            Cập nhật giỏ hàng
                        </button>
                    ) : (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                deleteCartItem(productRodal?.id);
                            }}
                            style={{
                                flex: 1,
                                padding: 14,
                                fontSize: mobileMode ? "1.1em" : "1.2em",
                                cursor: "pointer",
                                fontWeight: 700,
                                borderRadius: 10,
                                background: "var(--red)",
                                color: "#fff",
                                transition: "0.3s all",
                            }}
                        >
                            Xóa
                        </button>
                    )}
                </div>
            </Rodal>
            <Rodal
                height={300}
                width={mobileMode ? 350 : 400}
                visible={visiblePopupComfirm}
                showCloseButton={false}
                onClose={() => {
                    setVisiblePopupComfirm(false);
                }}
                style={{ borderRadius: 10 }}
            >
                <div style={{ padding: "5px 0 10px 0", textAlign: "center", display: "flex", flexDirection: "column" }}>
                    <span className="" style={{ fontSize: mobileMode ? 20 : 23, fontWeight: 700, textAlign: "center", color: "rgb(82, 182, 91)" }}>
                        Đơn hàng sẽ được gửi đi trong
                    </span>
                    <span className="" style={{ fontSize: mobileMode ? 20 : 23, fontWeight: 700, textAlign: "center", color: "rgb(82, 182, 91)" }}>
                        {visiblePopupComfirm ? (
                            <CountDown
                                callbackOrder={() => {
                                    hanldeOrder();
                                    setVisiblePopupComfirm(false);
                                }}
                            />
                        ) : (
                            ""
                        )}{" "}
                        giây...
                    </span>
                </div>
                <div style={{ padding: "5px 0" }}>
                    <span style={{ fontSize: mobileMode ? 16 : 17, fontWeight: 600 }}>Địa chỉ giao hàng:</span>
                    <span style={{ fontSize: mobileMode ? 16 : 17, fontWeight: 400 }}> Building S102 Vinhomes Grand Park</span>
                </div>
                <div style={{ padding: "5px 0" }}>
                    <span style={{ fontSize: mobileMode ? 16 : 17, fontWeight: 600 }}>Thời gian giao hàng dự kiến:</span>
                    <span style={{ fontSize: mobileMode ? 16 : 17, fontWeight: 400 }}> 22:30 - 23:00</span>
                </div>
                <div style={{ padding: "5px 0" }}>
                    <span style={{ fontSize: mobileMode ? 16 : 17, fontWeight: 600 }}>Tổng tiền đơn hàng:</span>
                    <span style={{ fontSize: mobileMode ? 16 : 17, fontWeight: 400 }}> 96.000</span>
                </div>
                <div className="f_flex" style={{ width: " 100%", justifyContent: "space-between", paddingTop: 20, gap: 15 }}>
                    <button
                        style={{ flex: 1, padding: 18, fontSize: "1rem", cursor: "pointer", fontWeight: 700, borderRadius: 10, background: "rgb(220,220,220)" }}
                        onClick={(e) => {
                            e.preventDefault();
                            setVisiblePopupComfirm(false);
                        }}
                    >
                        Quay lại
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            hanldeOrder();
                            setVisiblePopupComfirm(false);
                        }}
                        style={{ flex: 1, padding: 18, fontSize: "1rem", cursor: "pointer", fontWeight: 700, borderRadius: 10, background: "var(--primary)" }}
                    >
                        OK
                    </button>
                </div>
            </Rodal>
            <Loading isLoading={isLoadingOrder} />
            <div className="cart-main" style={{ position: "relative" }}>
                <div className="cart-main" style={{}}>
                    <section className="cart-items" style={{}}>
                        <div className="">
                            <div style={{ margin: "15px 15px 5px 15px" }}>
                                <span style={{ color: "rgba(0,0,0,.4)", fontWeight: 700 }}>Giao đến</span>
                            </div>
                            <div className="checkout-content">
                                <div className="checkout-content-item">
                                    <h2>{userInfo.building?.label || ""} Vinhomes GP </h2>
                                </div>
                                <div className="checkout-content-item">
                                    <span>Thời gian giao hàng</span>
                                    <span>Giao nhanh 30 phút</span>
                                </div>
                                <div className="checkout-content-item">
                                    <span>Thời gian giao hàng dự kiến</span>
                                    <span>17:59 - 18:09</span>
                                </div>
                                <div className="checkout-content-item">
                                    <span>Được giao từ</span>
                                    <span>{Cart.length > 0 ? Cart[0].storeName : "Không có"}</span>
                                </div>
                            </div>
                            <div className="c_flex" style={{ margin: "15px 15px 5px 15px" }}>
                                <span style={{ color: "rgba(0,0,0,.4)", fontWeight: 700 }}>Thông tin người nhận</span>
                                {!auth.isLogin && (
                                    <span onClick={() => history.push("/login")} style={{ color: "#1890ff", fontWeight: 700, cursor: "pointer", fontSize: 15 }}>
                                        Đăng nhập
                                    </span>
                                )}
                            </div>
                            <div
                                className="checkout-content"
                                onClick={() => {
                                    setVisiblePopupInfo(true);
                                    setFullName(userInfo.fullName || "");
                                    setPhone(userInfo.phone || "");
                                    setBuilding(userInfo.building || "");
                                    setIsValidBuilding(false);
                                    setIsValidFullname(false);
                                    setIsValidPhone(false);
                                }}
                            >
                                <div className="f_flex checkout-content-icon-wrapper" style={{ alignItems: "center", gap: 15 }}>
                                    <div className="checkout-content-icon">
                                        <i class="fa-solid fa-user"></i>
                                    </div>
                                    <div className="checkout-content-item">
                                        <h4>Tên người nhận</h4>
                                        <span>{userInfo.fullName}</span>
                                    </div>
                                </div>
                                <div className="f_flex checkout-content-icon-wrapper" style={{ alignItems: "center", gap: 15 }}>
                                    <div className="checkout-content-icon">
                                        <i class="fa-solid fa-mobile-screen-button"></i>
                                    </div>
                                    <div className="checkout-content-item">
                                        <h4>Số điện thoại nhận hàng</h4>
                                        <span>{userInfo.phone}</span>
                                    </div>
                                </div>
                                <div className="f_flex checkout-content-icon-wrapper" style={{ alignItems: "center", gap: 15 }}>
                                    <div className="checkout-content-icon">
                                        <i class="fa-regular fa-clipboard"></i>
                                    </div>
                                    <div className="checkout-content-item">
                                        <h4>Lưu ý đặc biệt</h4>
                                        <span>{userInfo.note?.length > 0 ? userInfo.note : "Không có"}</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{ margin: "15px 15px 5px 15px" }}>
                                <span style={{ color: "rgba(0,0,0,.4)", fontWeight: 700 }}>Tóm tắt đơn hàng</span>
                            </div>
                            <div className="checkout-content">
                                {Cart.map((item) => (
                                    <div className="checkout-product-cart" key={item.id}>
                                        <div className="c_flex">
                                            <div className="checkout-product-image">
                                                <img src={IMAGE_NOTFOUND} alt="" />
                                            </div>
                                            <div
                                                className="center_flex checkout-product-quantity-count"
                                                onClick={() => {
                                                    setVisiblePopupQuantity(true);
                                                    setProductRodalQuantity(item.quantityCart);
                                                    setProductRodal(item);
                                                }}
                                            >
                                                <span>{item.quantityCart}x</span>
                                            </div>
                                            <div className="checkout-product-info">
                                                <div className="checkout-product-name">{item.name}</div>
                                                <div className="checkout-product-quantity">
                                                    <div
                                                        className="cartControl "
                                                        onClick={() => {
                                                            setVisiblePopupQuantity(true);
                                                            setProductRodal(item);
                                                            setProductRodalQuantity(item.quantityCart);
                                                        }}
                                                    >
                                                        <p className="cusor">Chỉnh sửa</p>
                                                        {/* <button className="desCart" onClick={() => decreaseQty(item.id)}>
                                                    <i className="fa-solid fa-minus"></i>
                                                </button>
                                                <span>{item.quantityCart}</span>
                                                <button className="incCart" onClick={() => increaseQty(item.id)}>
                                                    <i className="fa-solid fa-plus"></i>
                                                </button> */}
                                                    </div>
                                                    {/* <div>-</div>
                                        <div>1</div>
                                        <div>+</div> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="checkout-product-price">
                                            <span style={{ display: "flex", gap: 3 }}>
                                                {caculatorVND(item.pricePerPack)}
                                                <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>₫</span>
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                <div className="c_flex">
                                    <span>Tiền hàng</span>
                                    <span style={{ fontWeight: 600, display: "flex", gap: 3 }}>
                                        {caculatorVND(Cart.length > 0 ? totalPrice : 0)}
                                        <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>₫</span>
                                    </span>
                                </div>
                                <div className="c_flex">
                                    <span>Phí giao hàng</span>
                                    <span style={{ fontWeight: 600, display: "flex", gap: 3 }}>
                                        {caculatorVND(Cart.length > 0 ? 15000 : 0)}
                                        <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>₫</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="header-white container cart-footer" style={{}}>
                        <div className="container checkout-container" style={{ padding: "", display: "flex", flexDirection: "column" }}>
                            <div className=" " style={{}}>
                                <div className="f_flex" style={{ flexDirection: "row" }}>
                                    <div className="checkout-text-payment" style={{ padding: 0 }}>
                                        <img src="/images/money.png" alt="" />
                                        <span>Tiền Mặt</span>
                                    </div>
                                </div>
                                <div className="c_flex" style={{ flexDirection: "row", gap: 2, width: "100%" }}>
                                    <div className="f_flex" style={{ flexDirection: "column", gap: 2 }}>
                                        <div className="checkout-text" style={{ padding: 0 }}>
                                            <span style={{ fontSize: mobileMode ? "1rem" : "1.2rem" }}>Tổng cộng:</span>
                                        </div>
                                        {!auth.isLogin && (
                                            <div className="checkout-text-require" style={{ padding: 0 }}>
                                                <span>Đăng nhập để đặt hàng</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="checkout-text-price">
                                        <span style={{ display: "flex", gap: 3, alignItems: "center" }}>
                                            {caculatorVND(totalPrice + 15000)}
                                            <span style={{ fontSize: "1rem", fontWeight: 700 }}>₫</span>
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        setVisiblePopupComfirm(true);
                                    }}
                                    type="button"
                                    disabled={!auth.isLogin || isLoadingOrder}
                                    style={{
                                        textAlign: "center",
                                        width: "100%",
                                        height: 45,
                                        borderRadius: "0.5rem",
                                        alignItems: "center",
                                        backgroundColor: !auth.isLogin || isLoadingOrder ? "#f5f5f5" : "var(--primary)",
                                    }}
                                    className="center_flex checkout-btn"
                                >
                                    <span style={{ fontWeight: 700, fontSize: 18 }}>Đặt hàng</span>
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default Cart;
