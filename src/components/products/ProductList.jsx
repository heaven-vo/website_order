import React, { useContext, useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import Rodal from "rodal";
import { LOCALSTORAGE_CART_NAME, LOCALSTORAGE_MODE } from "../../constants/Variable";
import { AppContext } from "../../context/AppProvider";
import { ProductItem } from "./ProductItem";

export const ProductList = ({ data, filter, reLoad }) => {
    const { setCart, mobileMode, setisCartMain, menu } = useContext(AppContext);
    const [visiblePopupQuantity, setVisiblePopupQuantity] = useState(false);
    const [visiblePopupOutOfStore, setVisiblePopupOutOfStore] = useState(false);
    const [productRodal, setProductRodal] = useState({});
    const [indexRodal, setIndexRodal] = useState({});
    const itemsRef = useRef([]);

    const hanldeRodal = (child) => {
        console.log(child);
        setVisiblePopupQuantity(child.rodal);
        setProductRodal(child.product);
        setIndexRodal(child.index);
    };

    useEffect(() => {
        itemsRef.current = itemsRef.current.slice(0, data.length);
    }, [data]);
    const deleteCartItem = () => {
        // console.log(productRodal);
        const CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME));
        let newCarts = CartList?.filter((item) => item.id !== productRodal.id);
        setCart([...newCarts]);
        localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify([...newCarts]));
        setVisiblePopupQuantity(false);
        itemsRef.current[indexRodal].resetQuantity();

        setProductRodal({});
        if (newCarts.length === 0) {
            setisCartMain(false);
        }
    };
    const AddCart = () => {
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME))) {
            localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify([]));
        }
        // const CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME));
        const carts = [
            {
                ...productRodal,
                quantityCart: 1,
            },
        ];
        // setisProductCart(true);
        // setisCartMain(true);
        // setProductRodalQuantity(productRodalQuantity + 1);
        setVisiblePopupOutOfStore(false);
        itemsRef.current[indexRodal].isQuantity();
        setCart(carts);
        localStorage.setItem(LOCALSTORAGE_MODE, JSON.stringify(menu));
        localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify([...carts]));
        reLoad();
    };
    const hanldeRodalOutOfStore = (child) => {
        console.log(child);
        setVisiblePopupOutOfStore(child.rodal);
        setProductRodal(child.product);
        setIndexRodal(child.index);
    };
    return (
        <>
            <Rodal
                height={200}
                width={mobileMode ? 350 : 400}
                visible={visiblePopupOutOfStore}
                onClose={() => {
                    setVisiblePopupOutOfStore(false);
                }}
                style={{ borderRadius: 10 }}
            >
                <div style={{ paddingBottom: "10px", textAlign: "center", paddingTop: 12 }}>
                    <span style={{ fontSize: 17, fontWeight: 700 }}>Bạn muốn đặt món ở cửa hàng này?</span>
                </div>
                <div style={{ padding: "10px 0 5px 0", textAlign: "center" }}>
                    <span className="" style={{ fontSize: 15, fontWeight: 500, textAlign: "center", color: "rgb(150,150,150)" }}>
                        Nhưng những món bạn đã chọn từ cửa hàng trước sẽ bị xóa khỏi giỏ hàng nhé.
                    </span>
                </div>

                <div className="f_flex" style={{ width: " 100%", justifyContent: "space-between", paddingTop: 20, gap: 10 }}>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setVisiblePopupOutOfStore(false);
                        }}
                        style={{
                            flex: 1,
                            padding: 14,
                            fontSize: "1.1em",
                            height: 45,
                            cursor: "pointer",
                            fontWeight: 700,
                            borderRadius: 10,
                            background: "#aab2bd",
                            color: "#fff",
                            transition: "0.3s all",
                            WebkitTransition: "0.3s all",
                        }}
                    >
                        Hủy
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            AddCart();
                            // setisProductCartRodal(false);
                            // setIsOpenRodal(false);
                            // deleteCartItem();
                        }}
                        style={{
                            flex: 1,
                            padding: 14,
                            fontSize: "1.1em",
                            height: 45,
                            cursor: "pointer",
                            fontWeight: 700,
                            borderRadius: 10,
                            background: "var(--primary)",
                            color: "#fff",
                            transition: "0.3s all",
                            WebkitTransition: "0.3s all",
                        }}
                    >
                        Tiếp tục
                    </button>
                </div>
            </Rodal>
            <Rodal
                height={180}
                width={mobileMode ? 350 : 400}
                visible={visiblePopupQuantity}
                onClose={() => {
                    setVisiblePopupQuantity(false);
                }}
                style={{ borderRadius: 10 }}
            >
                <div style={{ paddingBottom: "10px", textAlign: "center" }}>
                    <span style={{ fontSize: 16, fontWeight: 700 }}>Bạn có chắc muốn xóa</span>
                </div>
                <div style={{ padding: "10px 0 5px 0", textAlign: "center" }}>
                    <span className="cart-quantity-name" style={{ fontSize: 20, fontWeight: 700, textAlign: "center", color: "rgb(82, 182, 91)" }}>
                        {productRodal.name}
                    </span>
                </div>

                <div className="f_flex" style={{ width: " 100%", justifyContent: "space-between", paddingTop: 20, gap: 10 }}>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setVisiblePopupQuantity(false);
                        }}
                        style={{
                            flex: 1,
                            padding: 14,
                            fontSize: "1.2em",
                            cursor: "pointer",
                            fontWeight: 700,
                            borderRadius: 10,
                            background: "#aab2bd",
                            color: "#fff",
                            transition: "0.3s all",
                            WebkitTransition: "0.3s all",
                        }}
                    >
                        Không
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            deleteCartItem();
                        }}
                        style={{
                            flex: 1,
                            padding: 14,
                            fontSize: "1.2em",
                            cursor: "pointer",
                            fontWeight: 700,
                            borderRadius: 10,
                            background: "var(--primary)",
                            color: "#fff",
                            transition: "0.3s all",
                            WebkitTransition: "0.3s all",
                        }}
                    >
                        OK
                    </button>
                </div>
            </Rodal>
            <div className="product-list-wrapper" style={{ paddingTop: 55, paddingBottom: 100, background: "#fff" }}>
                <div className="back-white c_flex" style={{ padding: "0px 15px", alignItems: "self-start", flexDirection: "column" }}>
                    {data.map((item, index) => {
                        let isBorderBottom = true;
                        if (index === 0 || index === data.length - 1) {
                            isBorderBottom = false;
                        }
                        return (
                            <ProductItem
                                ref={(el) => (itemsRef.current[index] = el)}
                                product={item}
                                index={index}
                                openRodalOutOfStore={(e) => hanldeRodalOutOfStore(e)}
                                openRodal={(e) => hanldeRodal(e)}
                                key={index}
                                filter={filter}
                                isBorderBottom={isBorderBottom}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
};
