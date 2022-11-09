import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Rodal from "rodal";
import Select from "react-select";
import "../common/Cart/style.css";
import { AppContext } from "../context/AppProvider";
import { hanldeGetTime, validatePhoneNumber } from "../constants/Caculator";
import { IMAGE_NOTFOUND, LOCALSTORAGE_CART_NAME1, LOCALSTORAGE_CART_NAME2, LOCALSTORAGE_CART_NAME3, LOCALSTORAGE_MODE, LOCALSTORAGE_ORDER, LOCALSTORAGE_USER_NAME } from "../constants/Variable";
import { getApartment, getTimeDurationList, postOrder } from "../apis/apiService";
import Loading from "../common/Loading/Loading";
import { CountDown } from "../common/Cart/CountDown";

const Cart = ({}) => {
    const {
        Cart1,
        Cart2,
        Cart3,
        setCart1,
        setCart2,
        setCart3,
        setMessError,
        setHeaderInfo,
        setOrdersDrawer,
        setOpentModalError,
        setOpentModalSuccess,
        setIsHeaderOrder,
        mobileMode,
        setisCartMain1,
        setisCartMain2,
        setisCartMain3,
        userInfo,
        setUserInfo,
        areaProvider,
        menuIdProvider,
        modeType,
        setMenuIdProvider,
        mode,
        setMode,
        deliveryDate,
        setorderIdSuccess,
    } = useContext(AppContext);
    const [totalPrice, setTotalPrice] = useState(0);
    const [CartList, setCartList] = useState([]);
    const [total, setTotal] = useState("");
    const [visiblePopupInfo, setVisiblePopupInfo] = useState(false);
    const [visiblePopupQuantity, setVisiblePopupQuantity] = useState(false);
    const [visiblePopupComfirm, setVisiblePopupComfirm] = useState(false);
    const [visiblePopupNote, setVisiblePopupNote] = useState(false);
    const [visiblePopupPayment, setVisiblePopupPayment] = useState(false);
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [building, setBuilding] = useState("");
    const [area, setArea] = useState("");
    const [apartment, setApartment] = useState("");
    const [optionTime, setOptionTime] = useState([]);
    const [hour, setHour] = useState("");
    const [apartmentList, setApartmentList] = useState([]);
    const [buldingList, setBuldingList] = useState([]);
    const [productRodal, setProductRodal] = useState("");
    const [productRodalQuantity, setProductRodalQuantity] = useState(1);
    const [isValidFullName, setIsValidFullname] = useState(false);
    const [isValidPhone, setIsValidPhone] = useState(false);
    const [isValidBuilding, setIsValidBuilding] = useState(false);
    const [isLoadingOrder, setisLoadingOrder] = useState(false);
    const [isLoadingWhite, setisLoadingWhite] = useState(true);
    const [isValidPhoneRegex, setIsValidPhoneRegex] = useState(true);
    const [storeName, setStoreName] = useState("");
    // const [isLoading, setIsLoading] = useState(true);
    const [paymentType, setPaymentType] = useState(0);
    const [isValidArea, setIsValidArea] = useState(false);
    const [isValidApartment, setIsValidApartment] = useState(false);
    const [isValidNote, setIsValidNote] = useState(false);
    const [note, setNote] = useState("");
    let date = new Date();
    let location = useLocation();
    useEffect(() => {
        let modeId = location.pathname.split("/")[2];
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME1))) {
            localStorage.setItem(LOCALSTORAGE_CART_NAME1, JSON.stringify([]));
        }
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME2))) {
            localStorage.setItem(LOCALSTORAGE_CART_NAME2, JSON.stringify([]));
        }
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME3))) {
            localStorage.setItem(LOCALSTORAGE_CART_NAME3, JSON.stringify([]));
        }
        if (modeId && (modeId === "1" || modeId === "2" || modeId === "3")) {
            setMode(modeId);
            let CartList = [];
            if (mode === "1") {
                CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME1));
            } else if (mode === "2") {
                CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME2));
            } else {
                CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME3));
            }
            console.log("ok");
            if (CartList.length === 0) {
                history.push("/");
            } else {
                setStoreName(CartList[0].storeName);
            }
        }
        setisLoadingWhite(true);

        document.getElementById("main").scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });

        // setTimeout(() => {
        //     document.getElementById("main").style.overflow = "hidden";
        //     setisLoadingWhite(false);
        // }, 500);
        // document.getElementById("cart-main").scrollTo({
        //     bottom: 0,
        //     left: 0,
        //     behavior: "smooth",
        // });
        return () => {
            document.getElementById("main").style.overflow = "auto";
        };
    }, [location.pathname]);
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
        let menuId = "13c699e4-7e19-4ecb-ac99-1df0661f0e61";
        // setisLoadingWhite(true);

        // document.getElementById("main").scrollTo({
        //     top: 0,
        //     left: 0,
        //     behavior: "smooth",
        // });

        if (area) {
            Promise.all([getTimeDurationList(menuId, 1, 100), getApartment(area.value)])
                .then((res) => {
                    if (res.length > 0) {
                        const duration = res[0].data;
                        const apart = res[1].data;
                        setApartmentList(apart.listCluster);
                        if (apartment) {
                            for (let index = 0; index < apart.listCluster.length; index++) {
                                const element = apart.listCluster[index];
                                if (element.id === apartment.value) {
                                    setBuldingList(element.listBuilding);
                                }
                            }
                        }
                        if (duration) {
                            let optionsHours = [];
                            if (mode === "2") {
                                duration.forEach((hour) => {
                                    if (parseInt(hour.fromHour) >= date.getHours() + 1) {
                                        optionsHours.push({ value: hour.id, label: hour.fromHour + " - " + hour.toHour });
                                    }
                                });
                            } else if (mode === "3") {
                                duration.forEach((hour) => {
                                    optionsHours.push({ value: hour.id, label: hour.fromHour + " - " + hour.toHour });
                                });
                            }

                            setOptionTime(optionsHours);
                        }

                        setTimeout(() => {
                            document.getElementById("main").style.overflow = "hidden";
                            setisLoadingWhite(false);
                        }, 400);
                    } else {
                        setApartmentList([]);
                        setisLoadingWhite(false);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setApartmentList([]);
                    setisLoadingWhite(false);
                });
        }
        return () => {
            document.getElementById("main").style.overflow = "auto";
        };
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
        let productOrders = CartList.map((item) => {
            return { productId: item.id, quantity: item.quantityCart.toString(), price: item.pricePerPack };
        });

        let order = {
            id: "",
            phoneNumber: phone,
            total: totalPrice + 15000,
            storeId: CartList.length > 0 && Cart[0].storeId,
            menuId: menuIdProvider,
            buildingId: building.value,
            note: note,
            fullName: fullName,
            shipCost: 10000,
            deliveryTimeId: mode === "1" ? "1" : hour.value,
            orderDetail: [...productOrders],
            payments: [
                {
                    type: paymentType === 0 ? "Tiền mặt" : "VN PAY",
                },
            ],
        };
        console.log({ order });
        postOrder(order)
            .then((res) => {
                if (res.data) {
                    const { statusCode } = res.data;
                    const { message } = res.data;
                    if (statusCode === "Fail") {
                        setMessError(message);
                        setOpentModalError(true);
                        setisLoadingOrder(false);
                    } else {
                        let orderId = "";
                        if (res.data.data) {
                            const { id } = res.data.data;
                            orderId = id;
                            const newOrder = res.data.data;
                            if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_ORDER))) {
                                localStorage.setItem(LOCALSTORAGE_ORDER, JSON.stringify([]));
                            } else {
                                const orderLocal = JSON.parse(localStorage.getItem(LOCALSTORAGE_ORDER));
                                setOrdersDrawer([...orderLocal, newOrder]);
                                localStorage.setItem(LOCALSTORAGE_ORDER, JSON.stringify([...orderLocal, newOrder]));
                            }
                        }
                        setorderIdSuccess(orderId);
                        setOpentModalSuccess(true);
                        setisLoadingOrder(false);
                        if (mode === "1") {
                            localStorage.setItem(LOCALSTORAGE_CART_NAME1, JSON.stringify([]));
                            setCart1([]);
                        } else if (mode === "2") {
                            localStorage.setItem(LOCALSTORAGE_CART_NAME2, JSON.stringify([]));
                            setCart2([]);
                        } else {
                            localStorage.setItem(LOCALSTORAGE_CART_NAME3, JSON.stringify([]));
                            setCart3([]);
                        }
                    }
                }
            })
            .catch((error) => {
                setMessError(null);
                console.log(error);
                setOpentModalError(true);
                setisLoadingOrder(false);
            });
    };

    useEffect(() => {
        setTimeout(() => {
            setisLoadingOrder(false);
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
        setisCartMain1(false);
        setisCartMain2(false);
        setisCartMain3(false);
        return () => {
            if (CartList.length > 0) {
                setisCartMain1(true);
                setisCartMain2(true);
                setisCartMain3(true);
            }
        };
    }, [setIsHeaderOrder, setHeaderInfo, setisCartMain1, setisCartMain2, setisCartMain3, CartList]);

    useEffect(() => {
        let modeId = location.pathname.split("/")[2];
        var total = 0;
        if (modeId && (modeId === "1" || modeId === "2" || modeId === "3")) {
            if (modeId === "1") {
                Cart1?.map((item) => {
                    return (total = item.pricePerPack * item.quantityCart + total);
                });
                if (Cart1 && Cart1?.length > 0) {
                    setMenuIdProvider(Cart1[0].menuId);
                }
                setTotalPrice(total);
                setCartList(Cart1);
            } else if (modeId === "2") {
                Cart2?.map((item) => {
                    return (total = item.pricePerPack * item.quantityCart + total);
                });
                if (Cart2 && Cart2?.length > 0) {
                    setMenuIdProvider(Cart2[0].menuId);
                }
                setTotalPrice(total);
                setCartList(Cart2);
            } else {
                Cart3?.map((item) => {
                    return (total = item.pricePerPack * item.quantityCart + total);
                });
                if (Cart3 && Cart3?.length > 0) {
                    setMenuIdProvider(Cart3[0].menuId);
                }
                setTotalPrice(total);
                setCartList(Cart3);
            }
        }
    }, [Cart1, Cart2, Cart3]);

    // Tăng số lượng sản phẩm trong giỏ hàng
    const increaseQty = (id) => {
        setProductRodalQuantity(productRodalQuantity + 1);
    };

    // Giảm số lượng sản phẩm trong giỏ hàng
    const decreaseQty = (id) => {
        setProductRodalQuantity(productRodalQuantity - 1);
    };
    const updateCart = (id) => {
        let newCarts = [];
        newCarts = CartList?.map((item) => {
            if (item.id === id) {
                item.quantityCart = productRodalQuantity;
            }
            return item;
        });
        if (mode === "1") {
            setCart1([...newCarts]);
            localStorage.setItem(LOCALSTORAGE_CART_NAME1, JSON.stringify([...newCarts]));
        } else if (mode === "2") {
            setCart2([...newCarts]);
            localStorage.setItem(LOCALSTORAGE_CART_NAME2, JSON.stringify([...newCarts]));
        } else {
            setCart3([...newCarts]);
            localStorage.setItem(LOCALSTORAGE_CART_NAME3, JSON.stringify([...newCarts]));
        }
        setVisiblePopupQuantity(false);
    };
    const deleteCartItem = (id) => {
        let newCarts = CartList?.filter((item) => item.id !== id);
        // let newProduts = listProducts?.filter((item) => item.id !== id);
        // Cập nhật lại danh sách sản phẩm hiện tại với số lượng vừa được cập nhật
        // setlistProducts([...newProduts]);
        if (mode === "1") {
            setCart1([...newCarts]);
            localStorage.setItem(LOCALSTORAGE_CART_NAME1, JSON.stringify([...newCarts]));
        } else if (mode === "2") {
            setCart2([...newCarts]);
            localStorage.setItem(LOCALSTORAGE_CART_NAME2, JSON.stringify([...newCarts]));
        } else {
            setCart3([...newCarts]);
            localStorage.setItem(LOCALSTORAGE_CART_NAME3, JSON.stringify([...newCarts]));
        }
        setisLoadingOrder(false);
        setVisiblePopupQuantity(false);
    };

    return (
        <>
            <div className={`loading-spin ${isLoadingWhite === false ? "loading-spin-done" : ""}`}></div>
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
                // height={isValidFullName || isValidPhone || isValidBuilding || isValidApartment || isValidArea ? (mobileMode ? 620 : 650) : mobileMode ? 500 : 540}
                height={mobileMode ? 200 : 210}
                // height={mobileMode ? 535 : 575}
                width={mobileMode ? 350 : 400}
                visible={visiblePopupPayment}
                onClose={() => {
                    setVisiblePopupPayment(false);
                }}
                style={{ borderRadius: 10 }}
            >
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                    <div className="rodal-title" style={{ padding: "10px 0 10px 0" }}>
                        <span style={{ fontSize: 16, fontWeight: 700 }}>Phương thức thanh toán</span>
                    </div>
                    <div className="rodal-title f_flex" style={{ width: " 100%", gap: 15, flexDirection: "column" }}>
                        <div
                            onClick={() => {
                                setPaymentType(0);
                                setVisiblePopupPayment(false);
                            }}
                            className={`f_flex ${paymentType === 0 && "payment-select"}`}
                            style={{ alignItems: "center", gap: 15, border: "1px solid rgb(230,230,230)", padding: 15, borderRadius: 10, cursor: "pointer" }}
                        >
                            <img src="/images/money.png" alt="" style={{ width: 25 }} />
                            <span>Thanh toán khi nhận hàng</span>
                        </div>
                        <div
                            onClick={() => {
                                setPaymentType(1);
                                setVisiblePopupPayment(false);
                            }}
                            className={`f_flex ${paymentType === 1 && "payment-select"}`}
                            style={{ alignItems: "center", gap: 15, border: "1px solid rgb(230,230,230)", padding: 15, borderRadius: 10, cursor: "pointer" }}
                        >
                            <img
                                src="data:image/png;base64,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"
                                alt=""
                                style={{ width: 25 }}
                            />
                            <span>VN Pay</span>
                        </div>
                    </div>
                </div>
            </Rodal>
            <Rodal
                height={280}
                width={mobileMode ? 320 : 350}
                visible={visiblePopupQuantity}
                onClose={() => {
                    setVisiblePopupQuantity(false);
                }}
                style={{ borderRadius: 10 }}
            >
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
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
                </div>

                <div className="f_flex rodal-delet-cart" style={{ width: " 100%", justifyContent: "space-between", paddingTop: 15, gap: 15 }}>
                    {productRodalQuantity > 0 ? (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                updateCart(productRodal?.id);
                            }}
                            style={{
                                flex: 1,
                                padding: 14,
                                fontSize: mobileMode ? "15px" : "16px",
                                cursor: "pointer",
                                height: 45,
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
                                fontSize: mobileMode ? "15px" : "16px",
                                cursor: "pointer",
                                fontWeight: 700,
                                borderRadius: 10,
                                height: 45,
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
            <Loading isLoading={isLoadingWhite} opacity={1} />
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
                                    <span>Được giao từ</span>
                                    <span style={{ fontWeight: 600 }}>{storeName}</span>
                                </div>
                                {mode === "3" ? (
                                    <div className="checkout-content-item">
                                        <span>Ngày giao hàng</span>
                                        <span style={{ fontSize: 15, fontWeight: 600, color: "#4db856", textTransform: "uppercase" }}>{deliveryDate}</span>
                                    </div>
                                ) : (
                                    <div className="checkout-content-item">
                                        <span>Hình thúc giao hàng</span>
                                        <span style={{ fontSize: 15, fontWeight: 600, color: "#4db856", textTransform: "uppercase" }}>{modeType}</span>
                                    </div>
                                )}
                                <div className="checkout-content-item">
                                    <span>{mode === "1" ? "Thời gian giao dự kiến" : "Khung giờ giao hàng"}</span>
                                    {mode === "1" ? (
                                        <span>{hanldeGetTime()}</span>
                                    ) : (
                                        <div style={{ width: "200px", paddingTop: 5 }}>
                                            <Select
                                                options={optionTime.length > 0 ? optionTime : []}
                                                placeholder={`${optionTime.length > 0 ? "Chọn khung giờ" : "Không có khung giờ phù hợp"} `}
                                                onChange={(e) => {
                                                    setHour(e);
                                                }}
                                                isSearchable={false}
                                                value={hour}
                                                styles={{
                                                    control: (styles) => ({
                                                        ...styles,
                                                        width: optionTime.length > 0 ? 200 : 280,
                                                    }),
                                                    menuList: (styles) => ({
                                                        ...styles,
                                                    }),
                                                }}
                                            />
                                        </div>
                                    )}
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
                                        <span>Tên người nhận</span>
                                        <h4>{userInfo.fullName}</h4>
                                    </div>
                                </div>
                                <div className="f_flex checkout-content-icon-wrapper" style={{ alignItems: "center", gap: 15 }}>
                                    <div className="checkout-content-icon">
                                        <i className="fa-solid fa-mobile-screen-button"></i>
                                    </div>
                                    <div className="checkout-content-item">
                                        <span>Số điện thoại nhận hàng</span>
                                        <h4>{userInfo.phone}</h4>
                                    </div>
                                </div>
                                <div className="f_flex checkout-content-icon-wrapper" style={{ alignItems: "center", gap: 15 }}>
                                    <div className="checkout-content-icon">
                                        <i className="fa-regular fa-clipboard"></i>
                                    </div>
                                    <div className="checkout-content-item">
                                        <span>Lưu ý đặc biệt</span>
                                        <h4>{userInfo.note?.length > 0 ? userInfo.note : "Không có"}</h4>
                                    </div>
                                </div>
                            </div>
                            <div style={{ margin: "15px 15px 5px 15px" }}>
                                <span style={{ color: "rgba(0,0,0,.4)", fontWeight: 700, fontSize: mobileMode ? 14 : 16 }}>Tóm tắt đơn hàng</span>
                            </div>
                            <div className="checkout-content">
                                {[...CartList].map((item) => (
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
                                        {CartList.length > 0 ? totalPrice.toLocaleString() : 0}
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
                                    <div
                                        className="checkout-text-payment"
                                        style={{ padding: 0 }}
                                        onClick={() => {
                                            setVisiblePopupPayment(true);
                                        }}
                                    >
                                        {paymentType === 0 ? (
                                            <>
                                                <img src="/images/money.png" alt="" />
                                                <span>{"Tiền mặt"}</span>
                                            </>
                                        ) : (
                                            <>
                                                <img
                                                    src="data:image/png;base64,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"
                                                    alt=""
                                                    style={{ width: 25 }}
                                                />
                                                <span>{"VN PAY"}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="c_flex" style={{ flexDirection: "row", gap: 2, width: "100%" }}>
                                    <div className="f_flex" style={{ flexDirection: "column", gap: 2 }}>
                                        <div className="checkout-text" style={{ padding: 0 }}>
                                            <span style={{ fontSize: mobileMode ? 15 : 18 }}>Tổng cộng:</span>
                                        </div>
                                        {mode !== "1" && !hour && (
                                            <div className="checkout-text-require" style={{ padding: 0 }}>
                                                <span>Chưa chọn khung giờ giao hàng</span>
                                            </div>
                                        )}
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
                                        setVisiblePopupComfirm(true);
                                    }}
                                    type="button"
                                    disabled={isLoadingOrder || (mode !== "1" && !hour)}
                                    style={{
                                        textAlign: "center",
                                        width: "100%",
                                        height: mobileMode ? 45 : 50,
                                        borderRadius: "0.5rem",
                                        alignItems: "center",
                                        backgroundColor: isLoadingOrder || (mode !== "1" && !hour) ? "#f5f5f5" : "var(--primary)",
                                        color: mode !== "1" && !hour ? "rgb(150,150,150)" : "#fff",
                                    }}
                                    className="center_flex checkout-btn"
                                >
                                    <span style={{ fontWeight: 700, fontSize: mobileMode ? 14 : 16 }}>{"Đặt hàng"}</span>
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
