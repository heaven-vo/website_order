import React, { useContext, useEffect, useImperativeHandle, useState } from "react";
import { useHistory } from "react-router-dom";
import { IMAGE_NOTFOUND, LOCALSTORAGE_CART_NAME, LOCALSTORAGE_MODE } from "../../constants/Variable";
import { AppContext } from "../../context/AppProvider";

export const ProductCart = React.forwardRef(({ product, openRodal, index, openRodalOutOfStore }, ref) => {
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
    const { setCart, menuIdProvider, setisCartMain, mode } = useContext(AppContext);
    const [productRodalQuantity, setProductRodalQuantity] = useState(0);
    const [isProductCart, setisProductCart] = useState(true);
    // const [isOutOfStore, setisOutOfStore] = useState(false);
    // const [count, setCount] = useState(0);
    const [pro, setPro] = useState({});
    let history = useHistory();
    useEffect(() => {
        let newProduct = { ...product, quantityCart: 0 };
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME))) {
            localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify([]));
            setCart([]);
        } else {
            const CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME));
            for (let index = 0; index < CartList.length; index++) {
                if (CartList[index].id === newProduct.id) {
                    newProduct = { ...newProduct, quantityCart: CartList[index].quantityCart };
                }
            }
        }

        setPro({ ...newProduct });
        return () => {};
    }, [product, setCart]);

    useEffect(() => {
        // console.log({ product });
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
                    menuId: menuIdProvider,
                },
            ];
            setisProductCart(true);
            setisCartMain(true);
            setProductRodalQuantity(productRodalQuantity + 1);
            setCart(carts);
            localStorage.setItem(LOCALSTORAGE_MODE, JSON.stringify(mode));
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
            <div className="box" key={pro.id} style={{ width: 150 }}>
                <div className="product mtop" style={{ margin: 5 }}>
                    {/* <Link to="/food-detail"> */}
                    <div
                        className="img"
                        onClick={() => {
                            // setIsHeader(false);
                            history.push(`/mode/${mode}/${product.id}`);
                        }}
                    >
                        {/* <span className="discount">{item.discount}% Off</span> */}
                        <img
                            src={product.image || IMAGE_NOTFOUND}
                            alt=""
                            style={{
                                height: "100%",
                                width: "100%",
                                objectFit: "cover",
                                borderRadius: "0.5rem",
                            }}
                        />
                    </div>
                    {/* </Link> */}
                    <div className="product-details" style={{ lineHeight: "1.4em" }}>
                        <span style={{ fontSize: 12, color: "#666" }}>{pro.storeName}</span>

                        <h3
                            style={{ fontSize: 14, cursor: "pointer", fontWeight: 600, lineHeight: 1.5 }}
                            onClick={() => {
                                // setIsHeader(false);
                                history.push(`/mode/${mode}/${product.id}`);
                            }}
                        >
                            {pro.name}
                        </h3>

                        <div className="price">
                            <h4 style={{ fontSize: 16, lineHeight: 1.5, display: "flex", alignItems: "center", gap: 3 }}>
                                {product.pricePerPack?.toLocaleString()}
                                <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>₫</span>
                            </h4>
                        </div>
                        <div className="" style={{ paddingBottom: "0" }}>
                            {isProductCart ? (
                                <div className="center_flex cart-quantity" style={{ width: " 100%", boxShadow: "0 4px 5px rgb(0 0 0 / 13%)", minWidth: "unset" }}>
                                    <div
                                        style={{ color: productRodalQuantity > 0 ? "" : "rgba(0,0,0,.25)" }}
                                        className="center_flex cart-quantity-minus"
                                        onClick={() => {
                                            if (productRodalQuantity > 1) {
                                                decreaseQty(1);
                                            } else {
                                                openRodal({ rodal: true, product: product, index });
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
                                <div className="center_flex cart-quantity" style={{ width: " 100%", minWidth: "unset" }}>
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
                        {/* <div className="price">
                            <span style={{ color: "#666", fontSize: 14 }}>{product.weight} </span>
                            <button onClick={() => AddCart(product)}>
                                <i className="fa fa-plus"></i>
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
});

// export default ProductCart;
