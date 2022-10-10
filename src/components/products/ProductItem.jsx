import { useContext } from "react";
import { useState } from "react";
import { useImperativeHandle } from "react";
import React, { useEffect } from "react";
import { LOCALSTORAGE_CART_NAME } from "../../constants/Variable";
import { AppContext } from "../../context/AppProvider";
import { useHistory } from "react-router-dom";
import { caculatorVND } from "../../constants/Caculator";

export const ProductItem = React.forwardRef(({ product, openRodal, index, filter, openRodalOutOfStore }, ref) => {
    useImperativeHandle(ref, () => ({
        resetQuantity() {
            setisProductCart(false);
            setProductRodalQuantity(0);
        },
        isQuantity() {
            setisProductCart(true);
            setProductRodalQuantity(1);
        },
    }));
    let history = useHistory();

    const { setCart, setisCartMain, menu, mobileMode } = useContext(AppContext);
    const [productRodalQuantity, setProductRodalQuantity] = useState(0);
    const [isProductCart, setisProductCart] = useState(true);
    // const [visiblePopupQuantity, setVisiblePopupQuantity] = useState(false);

    useEffect(() => {
        console.log({ product });
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME))) {
            localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify([]));
        }
        const CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME));
        let include = false;
        CartList?.map((item) => {
            if (item.id === product.id) {
                setProductRodalQuantity(item.quantityCart);
                include = true;
                return;
            }
        });
        if (include) {
            setisProductCart(true);
        } else {
            setisProductCart(false);
        }
        return () => {};
    }, [product]);

    const decreaseQty = () => {
        setProductRodalQuantity(productRodalQuantity - 1);
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME))) {
            localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify([]));
        }
        const CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME));
        let newCarts = CartList?.map((item) => {
            if (item.id === product.id) {
                item.quantityCart = item.quantityCart - 1;
            }
            return item;
        });
        setCart([...newCarts]);
        localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify([...newCarts]));
    };
    const checkOutOfStore = (product) => {
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME))) {
            localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify([]));
        }
        const CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME));

        if (CartList.length > 0) {
            if (CartList[0].storeId === product.storeId) {
                return false;
            } else {
                return true;
            }
        }
        return false;
    };
    const AddCart = () => {
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME))) {
            localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify([]));
        }
        const CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME));
        if (!checkOutOfStore(product)) {
            const carts = [
                ...CartList,
                {
                    ...product,
                    quantityCart: 1,
                },
            ];
            setisProductCart(true);
            setisCartMain(true);
            setProductRodalQuantity(productRodalQuantity + 1);
            setCart(carts);
            localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify([...carts]));
        } else {
            openRodalOutOfStore({ rodal: true, product: product, index });
            console.log("khac store");
        }
    };

    const increaseQty = () => {
        setProductRodalQuantity(productRodalQuantity + 1);
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME))) {
            localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify([]));
        }
        const CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME));
        let newCarts = CartList?.map((item) => {
            if (item.id === product.id) {
                item.quantityCart = item.quantityCart + 1;
            }
            return item;
        });
        setCart([...newCarts]);
        localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify([...newCarts]));
    };
    return (
        <>
            <div key={product.id} className="c_flex" style={{ borderBottom: "1px solid #f0f0f0", width: "100%", padding: "12px 0" }}>
                <div className="product-list-info">
                    <div
                        className="product-list-img"
                        onClick={() => {
                            // setIsHeader(false);
                            history.push(`/menu/${menu}/${product.id}`);
                        }}
                        style={{ fontWeight: 500, cursor: "pointer" }}
                    >
                        <img src="https://dl.airtable.com/a1H2V0kzS7275gkh6Zvd_soda%20schweppes-thumbnail%402x.jpg?ts=1659609262&userId=usrk5orn56sTujaim&cs=d0b00a38348c7490" alt="" />
                    </div>
                    <div className="product-list-name">
                        <span
                            onClick={() => {
                                // setIsHeader(false);
                                history.push(`/menu/${menu}/${product.id}`);
                            }}
                            style={{ fontWeight: 500, cursor: "pointer" }}
                        >
                            {product.name}{" "}
                        </span>
                        <span style={{ fontSize: 13, color: "rgb(110,110,150)" }}>{product.storeName} </span>
                        <div className="" style={{ paddingBottom: "0" }}>
                            {isProductCart ? (
                                <div className="center_flex cart-quantity" style={{ width: " 100%", boxShadow: "0 4px 5px rgb(0 0 0 / 13%)" }}>
                                    <div
                                        style={{ color: productRodalQuantity > 0 ? "" : "rgba(0,0,0,.25)" }}
                                        className="center_flex cart-quantity-minus"
                                        onClick={() => {
                                            if (productRodalQuantity > 1) {
                                                decreaseQty(1);
                                            } else {
                                                openRodal({ rodal: true, product: product, index });
                                                // setVisiblePopupQuantity(true);
                                            }
                                        }}
                                    >
                                        <i className="fa-solid fa-minus"></i>
                                    </div>
                                    <div className="center_flex cart-quantity-text">
                                        <span>{productRodalQuantity}</span>
                                    </div>
                                    <div className="center_flex cart-quantity-plus" onClick={() => increaseQty(1)} style={{}}>
                                        <i className="fa-solid fa-plus"></i>
                                    </div>
                                </div>
                            ) : (
                                <div className="center_flex cart-quantity" style={{ width: " 100%" }}>
                                    <div
                                        className="center_flex cart-quantity-add"
                                        onClick={() => {
                                            AddCart();
                                        }}
                                    >
                                        Thêm
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="product-list-price">
                    <span style={{ display: "flex", gap: 3, fontSize: mobileMode ? "15px" : "16px" }}>
                        {caculatorVND(product.pricePerPack)}
                        <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>₫</span>
                    </span>
                </div>
            </div>
        </>
    );
});
