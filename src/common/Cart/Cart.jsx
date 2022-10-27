import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { validatePhoneNumber, hanldeGetTime } from "../../constants/Caculator";
import { IMAGE_NOTFOUND, LOCALSTORAGE_CART_NAME, LOCALSTORAGE_MODE, LOCALSTORAGE_USER_NAME } from "../../constants/Variable";
import { AppContext } from "../../context/AppProvider";
import Rodal from "rodal";
import Select from "react-select";
import "./style.css";
import Loading from "../Loading/Loading";
import { getApartment, postOrder, putOrder } from "../../apis/apiService";
import { CountDown } from "./CountDown";

const Cart = ({}) => {
    const {
        Cart,
        setCart,
        setHeaderInfo,
        setIsHeaderOrder,
        mobileMode,
        setisCartMain,
        userInfo,
        setUserInfo,
        areaProvider,
        menuIdProvider,
        modeType,
        setMenuIdProvider,
        setOpentModalSuccess,
        setOpentModalError,
    } = useContext(AppContext);
    const [totalPrice, setTotalPrice] = useState(0);
    const [CartList, setCartList] = useState([]);
    const [total, setTotal] = useState("");
    const [visiblePopupInfo, setVisiblePopupInfo] = useState(false);
    const [visiblePopupQuantity, setVisiblePopupQuantity] = useState(false);
    const [visiblePopupComfirm, setVisiblePopupComfirm] = useState(false);
    const [visiblePopupNote, setVisiblePopupNote] = useState(false);
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [building, setBuilding] = useState("");
    const [area, setArea] = useState("");
    const [apartment, setApartment] = useState("");
    const [apartmentList, setApartmentList] = useState([]);
    const [buldingList, setBuldingList] = useState([]);
    const [productRodal, setProductRodal] = useState("");
    const [productRodalQuantity, setProductRodalQuantity] = useState(1);
    const [isValidFullName, setIsValidFullname] = useState(false);
    const [isValidPhone, setIsValidPhone] = useState(false);
    const [isValidBuilding, setIsValidBuilding] = useState(false);
    const [isLoadingOrder, setisLoadingOrder] = useState(true);
    const [isValidPhoneRegex, setIsValidPhoneRegex] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [payment, setPayment] = useState({});
    const [isValidArea, setIsValidArea] = useState(false);
    const [isValidApartment, setIsValidApartment] = useState(false);
    const [isValidNote, setIsValidNote] = useState(false);
    const [note, setNote] = useState("");

    useEffect(() => {
        setisLoadingOrder(true);
        document.getElementById("main").style.overflow = "hidden";
        document.getElementById("main").scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
        setTimeout(() => {
            setisLoadingOrder(false);
        }, 500);
        // document.getElementById("cart-main").scrollTo({
        //     bottom: 0,
        //     left: 0,
        //     behavior: "smooth",
        // });
        return () => {
            document.getElementById("main").style.overflow = "auto";
        };
    }, []);
    const hanldeschedule = () => {
        let productOrders = Cart.map((item) => {
            return { productInMenuId: item.productMenuId, quantity: item.quantityCart.toString(), productName: item.name, price: item.pricePerPack };
        });
        let order = {
            customerId: "1",
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
        history.push("/schedule", { order });
    };
    const handleSubmit = () => {
        let isValid = true;
        if (fullName.length === 0 || phone.length === 0 || !building?.value || !validatePhoneNumber(phone)) {
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
        if (!apartment && apartment.length === 0) {
            setIsValidApartment(true);
        } else {
            setIsValidApartment(false);
        }
        if (!area && area.length === 0) {
            setIsValidArea(true);
        } else {
            setIsValidArea(false);
        }
        if (validatePhoneNumber(phone)) {
            setIsValidPhoneRegex(true);
        } else {
            setIsValidPhoneRegex(false);
        }
        if (isValid) {
            setUserInfo({ fullName, phone, building, note, area, apartment });
            localStorage.setItem(LOCALSTORAGE_USER_NAME, JSON.stringify({ fullName, phone, building, area, note, apartment }));
            setVisiblePopupInfo(false);
        }
    };

    useEffect(() => {
        if (area) {
            getApartment(area.value)
                .then((res) => {
                    if (res.data) {
                        const apart = res.data;
                        setApartmentList(apart.listCluster);
                        if (apartment) {
                            for (let index = 0; index < apart.listCluster.length; index++) {
                                const element = apart.listCluster[index];
                                if (element.id === apartment.value) {
                                    setBuldingList(element.listBuilding);
                                }
                            }
                        }
                    } else {
                        setApartmentList([]);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setApartmentList([]);
                });
        }
    }, [apartment, area]);
    const optionsBuilding = buldingList.map((building) => {
        return { value: building.id, label: building.name };
    });
    const optionsApartment = apartmentList.map((building) => {
        return { value: building.id, label: building.name };
    });
    const optionArea = areaProvider.map((area) => {
        return { value: area.id, label: area.name };
    });
    let history = useHistory();
    const hanldeOrder = () => {
        setisLoadingOrder(true);
        let productOrders = Cart.map((item) => {
            return { productInMenuId: item.productMenuId, quantity: item.quantityCart.toString(), price: item.pricePerPack };
        });
        let order = {
            id: "",
            type: "",
            total: totalPrice + 15000,
            storeId: Cart.length > 0 && Cart[0].storeId,
            buildingId: building.value,
            menuId: menuIdProvider,
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
                    setOpentModalSuccess(true);
                    setisLoadingOrder(false);
                }
            })

            .catch((error) => {
                console.log(error);
                setOpentModalError(true);
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
        setApartment(userInfo.apartment || "");
        setArea(userInfo.area || "");
    }, [userInfo]);

    useEffect(() => {
        setIsHeaderOrder(false);
        setHeaderInfo({ isSearchHeader: false, title: "Đơn hàng của bạn" });
        setisCartMain(false);
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
        if (Cart && Cart?.length > 0) {
            setMenuIdProvider(Cart[0].menuId);
        }
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
        setIsLoading(false);
        localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify([...newCarts]));
        setVisiblePopupQuantity(false);
    };

    return (
        <>
            <div className={`loading-spin ${isLoading === false ? "loading-spin-done" : ""}`}></div>
            <Rodal
                // height={isValidFullName || isValidPhone || isValidBuilding || isValidApartment || isValidArea ? (mobileMode ? 620 : 650) : mobileMode ? 500 : 540}
                height={isValidFullName || isValidPhone || isValidBuilding || isValidApartment || isValidArea || !isValidPhoneRegex ? (mobileMode ? 550 : 590) : mobileMode ? 500 : 540}
                // height={mobileMode ? 535 : 575}
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
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                    <div>
                        <div style={{ borderBottom: "1px solid rgb(220,220,220)", paddingBottom: "10px" }}>
                            <span style={{ fontSize: 16, fontWeight: 700 }}>Nơi nhận</span>
                        </div>
                        <div className="rodal-title" style={{ padding: "10px 0 10px 0" }}>
                            <span style={{ fontSize: 16, fontWeight: 700 }}>
                                Khu vực <span style={{ color: "red", fontSize: 14 }}> *</span>
                            </span>
                        </div>
                        <div className={`${isValidArea && "error-select"}`}>
                            <Select
                                options={optionArea}
                                placeholder="Khu vực"
                                onChange={(e) => {
                                    setArea(e);
                                    setApartment("");
                                    setBuilding("");
                                }}
                                value={area}
                            />
                        </div>

                        <div className="rodal-title" style={{ padding: "10px 0 10px 0" }}>
                            <span style={{ fontSize: 16, fontWeight: 700 }}>
                                Cụm tòa nhà<span style={{ color: "red", fontSize: 14 }}> *</span>
                            </span>
                        </div>
                        <div className={`${isValidApartment && "error-select"}`}>
                            <Select
                                options={optionsApartment}
                                placeholder="Tòa nhà"
                                onChange={(e) => {
                                    setApartment(e);
                                    setBuilding("");
                                    for (let index = 0; index < apartmentList.length; index++) {
                                        const element = apartmentList[index];
                                        if (element.id === e.value) {
                                            setBuldingList(element.listBuilding);
                                        }
                                    }
                                }}
                                value={apartment}
                            />
                        </div>

                        <div className="rodal-title" style={{ padding: "10px 0 10px 0" }}>
                            <span style={{ fontSize: 16, fontWeight: 700 }}>
                                Building (Tòa nhà)<span style={{ color: "red", fontSize: 14 }}> *</span>
                            </span>
                        </div>
                        <div className={`${isValidBuilding && "error-select"}`}>
                            <Select options={optionsBuilding} placeholder="Tòa nhà" onChange={(e) => setBuilding(e)} value={building} />
                        </div>

                        <div className="rodal-title" style={{ padding: "10px 0 10px 0" }}>
                            <span style={{ fontSize: 16, fontWeight: 700 }}>
                                Tên người nhận<span style={{ color: "red", fontSize: 14 }}> *</span>
                            </span>
                        </div>
                        <div className="rodal-title" style={{ width: " 100%" }}>
                            <input
                                onChange={(e) => {
                                    setFullName(e.target.value);
                                }}
                                value={fullName}
                                type="text"
                                style={{
                                    border: !isValidFullName ? "1px solid rgb(200,200,200)" : "1px solid red",
                                    width: " 100%",
                                    borderRadius: 4,
                                    padding: "10px 10px",
                                    lineHeight: "1rem",
                                    fontSize: "1rem",
                                }}
                            />
                        </div>

                        <div className="rodal-title" style={{ padding: "10px 0 10px 0" }}>
                            <span style={{ fontSize: 16, fontWeight: 700 }}>
                                Số điện thoại nhận hàng<span style={{ color: "red", fontSize: 14 }}> *</span>
                            </span>
                        </div>
                        <div className="rodal-title" style={{ width: " 100%" }}>
                            <input
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                }}
                                value={phone}
                                type="number"
                                style={{
                                    border: !isValidPhone ? "1px solid rgb(200,200,200)" : "1px solid red",
                                    width: " 100%",
                                    borderRadius: 4,
                                    padding: "10px 10px",
                                    lineHeight: "1rem",
                                    fontSize: "1rem",
                                }}
                            />
                        </div>
                    </div>
                    {(isValidFullName || isValidPhone || isValidBuilding || isValidApartment || isValidArea || !validatePhoneNumber) && (
                        <div className="input-validate-form">
                            <span>Vui lòng điền đủ thông tin</span>
                        </div>
                    )}
                    {!(isValidFullName || isValidPhone || isValidBuilding || isValidApartment || isValidArea) && !isValidPhoneRegex && (
                        <div className="input-validate-form">
                            <span>Số điện thoại không hơp lệ</span>
                        </div>
                    )}
                    <div className="f_flex rodal-delet-cart" style={{ width: " 100%", justifyContent: "space-between", paddingTop: 5, gap: 15 }}>
                        <button
                            style={{ flex: 1, padding: 14, fontSize: "1rem", cursor: "pointer", fontWeight: 700, borderRadius: 10, height: 50 }}
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
                            style={{ flex: 1, padding: 14, fontSize: "1rem", cursor: "pointer", fontWeight: 700, borderRadius: 10, background: "var(--primary)", color: "#fff", height: 50 }}
                        >
                            OK
                        </button>
                    </div>
                </div>
            </Rodal>
            <Rodal
                // height={isValidFullName || isValidPhone || isValidBuilding || isValidApartment || isValidArea ? (mobileMode ? 620 : 650) : mobileMode ? 500 : 540}
                height={mobileMode ? 170 : 200}
                // height={mobileMode ? 535 : 575}
                width={mobileMode ? 350 : 400}
                visible={visiblePopupNote}
                onClose={() => {
                    setVisiblePopupNote(false);
                    setIsValidNote(false);
                }}
                style={{ borderRadius: 10 }}
            >
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                    <div>
                        <div className="rodal-title" style={{ padding: "10px 0 10px 0" }}>
                            <span style={{ fontSize: 16, fontWeight: 700 }}>Lưu ý đặc biệt</span>
                        </div>
                        <div className="rodal-title" style={{ width: " 100%" }}>
                            <input
                                onChange={(e) => {
                                    setNote(e.target.value);
                                }}
                                value={note}
                                type="text"
                                style={{
                                    border: "1px solid rgb(200,200,200)",
                                    width: " 100%",
                                    borderRadius: 4,
                                    padding: "10px 10px",
                                    lineHeight: "1rem",
                                    fontSize: "1rem",
                                }}
                            />
                        </div>
                    </div>

                    <div className="f_flex rodal-delet-cart" style={{ width: " 100%", justifyContent: "space-between", paddingTop: 5, gap: 15 }}>
                        <button
                            style={{ flex: 1, padding: 14, fontSize: "1rem", cursor: "pointer", fontWeight: 700, borderRadius: 10, height: 50 }}
                            onClick={(e) => {
                                e.preventDefault();
                                setVisiblePopupNote(false);
                            }}
                        >
                            Đóng
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                // handleSubmit();
                                setUserInfo({ fullName, phone, building, note, area, apartment });
                                localStorage.setItem(LOCALSTORAGE_USER_NAME, JSON.stringify({ fullName, phone, building, area, note, apartment }));
                                setVisiblePopupNote(false);
                            }}
                            style={{ flex: 1, padding: 14, fontSize: "1rem", cursor: "pointer", fontWeight: 700, borderRadius: 10, background: "var(--primary)", color: "#fff", height: 50 }}
                        >
                            OK
                        </button>
                    </div>
                </div>
            </Rodal>
            <Rodal
                height={250}
                width={mobileMode ? 320 : 350}
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
                        {productRodal.pricePerPack?.toLocaleString()}
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

                <div className="f_flex rodal-delet-cart" style={{ width: " 100%", justifyContent: "space-between", paddingTop: 20, gap: 15 }}>
                    {productRodalQuantity > 0 ? (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                updateCart(productRodal?.id);
                            }}
                            style={{
                                flex: 1,
                                padding: 14,
                                fontSize: mobileMode ? "14px" : "16px",
                                cursor: "pointer",
                                height: 50,
                                fontWeight: 700,
                                borderRadius: 10,
                                background: "var(--primary)",
                                transition: "0.3s all",
                                WebkitTransition: "0.3s all",
                                color: "#fff",
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
                                WebkitTransition: "0.3s all",
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
                    <span className="" style={{ fontSize: mobileMode ? 18 : 20, fontWeight: 700, textAlign: "center", color: "rgb(82, 182, 91)" }}>
                        Đơn hàng sẽ được gửi đi trong
                    </span>
                    <span className="" style={{ fontSize: mobileMode ? 18 : 20, fontWeight: 700, textAlign: "center", color: "rgb(82, 182, 91)" }}>
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
                    <span style={{ fontSize: mobileMode ? 14 : 17, fontWeight: 600 }}>Địa chỉ giao hàng:</span>
                    <span style={{ fontSize: mobileMode ? 14 : 17, fontWeight: 400 }}> Building S102 Vinhomes Grand Park</span>
                </div>
                <div style={{ padding: "5px 0" }}>
                    <span style={{ fontSize: mobileMode ? 14 : 17, fontWeight: 600 }}>Thời gian giao hàng dự kiến: </span>
                    <span style={{ fontSize: mobileMode ? 14 : 17, fontWeight: 400 }}>{hanldeGetTime()}</span>
                </div>
                <div style={{ padding: "5px 0" }}>
                    <span style={{ fontSize: mobileMode ? 14 : 17, fontWeight: 600 }}>Tổng tiền đơn hàng:</span>
                    <span style={{ fontSize: mobileMode ? 14 : 17, fontWeight: 400 }}>{" " + (totalPrice + 15000).toLocaleString()}</span>
                </div>
                <div className="f_flex rodal-delet-cart" style={{ width: " 100%", justifyContent: "space-between", paddingTop: 20, gap: 15 }}>
                    <button
                        style={{ flex: 1, padding: 14, fontSize: "1rem", cursor: "pointer", fontWeight: 700, borderRadius: 10, background: "rgb(220,220,220)" }}
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
                        style={{ flex: 1, padding: 14, fontSize: "1rem", cursor: "pointer", fontWeight: 700, borderRadius: 10, background: "var(--primary)", color: "#fff" }}
                    >
                        Đồng ý
                    </button>
                </div>
            </Rodal>
            <Loading isLoading={isLoadingOrder} opacity={0.7} />
            <div id="cart-main" className="" style={{}}>
                <div className="cart-main" style={{}}>
                    <section className="cart-items" style={{}}>
                        <div className="">
                            <div style={{ margin: "15px 15px 5px 15px" }}>
                                <span style={{ color: "rgba(0,0,0,.4)", fontWeight: 700 }}>Giao đến</span>
                            </div>
                            <div className="checkout-content">
                                <div className="checkout-content-item">
                                    <h2>
                                        {userInfo.building?.label || ""}
                                        {", " + userInfo.area?.label} Vinhomes GP
                                    </h2>
                                </div>
                                <div className="checkout-content-item">
                                    <span>Thời gian giao hàng</span>
                                    <span>{modeType}</span>
                                </div>
                                <div className="checkout-content-item">
                                    <span>Thời gian giao hàng dự kiến</span>
                                    <span>{hanldeGetTime()}</span>
                                </div>
                                <div className="checkout-content-item">
                                    <span>Được giao từ</span>
                                    <span>{Cart.length > 0 ? Cart[0].storeName : "Không có"}</span>
                                </div>
                            </div>
                            <div className="c_flex" style={{ margin: "15px 15px 5px 15px" }}>
                                <span style={{ color: "rgba(0,0,0,.4)", fontWeight: 700 }}>Thông tin người nhận</span>
                                <span
                                    onClick={() => {
                                        setVisiblePopupInfo(true);
                                        setFullName(userInfo.fullName || "");
                                        setPhone(userInfo.phone || "");
                                        setBuilding(userInfo.building || "");
                                        setIsValidBuilding(false);
                                        setIsValidFullname(false);
                                        setIsValidPhone(false);
                                    }}
                                    style={{ color: "#1890ff", fontWeight: 700, cursor: "pointer", fontSize: 15 }}
                                >
                                    Thay đổi
                                </span>
                            </div>
                            <div
                                className="checkout-content"
                                onClick={() => {
                                    setVisiblePopupNote(true);
                                    // setFullName(userInfo.fullName || "");
                                    // setPhone(userInfo.phone || "");
                                    // setBuilding(userInfo.building || "");
                                    // setIsValidBuilding(false);
                                    // setIsValidFullname(false);
                                    // setIsValidPhone(false);
                                }}
                            >
                                <div className="f_flex checkout-content-icon-wrapper" style={{ alignItems: "center", gap: 15 }}>
                                    <div className="checkout-content-icon">
                                        <i className="fa-solid fa-user"></i>
                                    </div>
                                    <div className="checkout-content-item">
                                        <h4>Tên người nhận</h4>
                                        <span>{userInfo.fullName}</span>
                                    </div>
                                </div>
                                <div className="f_flex checkout-content-icon-wrapper" style={{ alignItems: "center", gap: 15 }}>
                                    <div className="checkout-content-icon">
                                        <i className="fa-solid fa-mobile-screen-button"></i>
                                    </div>
                                    <div className="checkout-content-item">
                                        <h4>Số điện thoại nhận hàng</h4>
                                        <span>{userInfo.phone}</span>
                                    </div>
                                </div>
                                <div className="f_flex checkout-content-icon-wrapper" style={{ alignItems: "center", gap: 15 }}>
                                    <div className="checkout-content-icon">
                                        <i className="fa-regular fa-clipboard"></i>
                                    </div>
                                    <div className="checkout-content-item">
                                        <h4>Lưu ý đặc biệt</h4>
                                        <span>{userInfo.note?.length > 0 ? userInfo.note : "Không có"}</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{ margin: "15px 15px 5px 15px" }}>
                                <span style={{ color: "rgba(0,0,0,.4)", fontWeight: 700, fontSize: mobileMode ? 14 : 16 }}>Tóm tắt đơn hàng</span>
                            </div>
                            <div className="checkout-content">
                                {[...Cart].map((item) => (
                                    <div className="checkout-product-cart" key={item.id}>
                                        <div className="c_flex" style={{ gap: 10 }}>
                                            <div className="checkout-product-image">
                                                <img src={item.image || IMAGE_NOTFOUND} alt="" style={{ borderRadius: "0.5rem" }} />
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
                                            <span style={{ display: "flex", gap: 3, fontSize: mobileMode ? 14 : 16 }}>
                                                {item.pricePerPack.toLocaleString()}
                                                <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>₫</span>
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                <div className="c_flex">
                                    <span style={{ fontSize: mobileMode ? 14 : 16 }}>Tiền hàng</span>
                                    <span style={{ fontWeight: 600, display: "flex", gap: 3, fontSize: mobileMode ? 14 : 16 }}>
                                        {Cart.length > 0 ? totalPrice.toLocaleString() : 0}
                                        <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>₫</span>
                                    </span>
                                </div>
                                <div className="c_flex">
                                    <span style={{ fontSize: mobileMode ? 14 : 16 }}>Phí giao hàng</span>
                                    <span style={{ fontWeight: 600, display: "flex", fontSize: mobileMode ? 14 : 16, gap: 3 }}>
                                        {"15.000"}
                                        <span style={{ fontSize: 15, fontWeight: 600 }}>₫</span>
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
                                            <span style={{ fontSize: mobileMode ? 15 : 18 }}>Tổng cộng:</span>
                                        </div>
                                        {/* {!auth.isLogin && (
                                            <div className="checkout-text-require" style={{ padding: 0 }}>
                                                <span>Đăng nhập để đặt hàng</span>
                                            </div>
                                        )} */}
                                    </div>
                                    <div className="checkout-text-price">
                                        <span style={{ display: "flex", gap: 3, alignItems: "center" }}>
                                            {(totalPrice + 15000).toLocaleString()}
                                            <span style={{ fontSize: "1rem", fontWeight: 700 }}>₫</span>
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        const Mode = JSON.parse(localStorage.getItem(LOCALSTORAGE_MODE));
                                        if (Mode === "1") {
                                            setVisiblePopupComfirm(true);
                                        } else if (Mode === "2" || Mode === "3") {
                                            hanldeschedule();
                                        }
                                    }}
                                    type="button"
                                    disabled={isLoadingOrder}
                                    style={{
                                        textAlign: "center",
                                        width: "100%",
                                        height: mobileMode ? 45 : 50,
                                        borderRadius: "0.5rem",
                                        alignItems: "center",
                                        backgroundColor: isLoadingOrder ? "#f5f5f5" : "var(--primary)",
                                        color: "#fff",
                                    }}
                                    className="center_flex checkout-btn"
                                >
                                    <span style={{ fontWeight: 700, fontSize: mobileMode ? 14 : 16 }}>Đặt hàng</span>
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
