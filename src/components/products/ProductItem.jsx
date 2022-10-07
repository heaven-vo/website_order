import { useContext } from "react";
import { useState } from "react";
import { useImperativeHandle } from "react";
import React, { useEffect } from "react";
import { LOCALSTORAGE_CART_NAME } from "../../constants/Variable";
import { AppContext } from "../../context/AppProvider";

export const ProductItem = React.forwardRef(({ product, openRodal, index }, ref) => {
    useImperativeHandle(ref, () => ({
        resetQuantity() {
            setisProductCart(false);
            setProductRodalQuantity(0);
        },
    }));
    const { setCart, setisCartMain } = useContext(AppContext);
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

    const AddCart = () => {
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME))) {
            localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify([]));
        }
        const CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME));
        const carts = [
            ...CartList,
            {
                ...product,
                quantityCart: 1,
            },
        ];
        setisCartMain(true);
        setProductRodalQuantity(productRodalQuantity + 1);
        setCart(carts);
        localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify([...carts]));
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
                    <div className="product-list-img">
                        <img src="https://dl.airtable.com/a1H2V0kzS7275gkh6Zvd_soda%20schweppes-thumbnail%402x.jpg?ts=1659609262&userId=usrk5orn56sTujaim&cs=d0b00a38348c7490" alt="" />
                    </div>
                    <div className="product-list-name">
                        <span>{product.name} </span>
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
                                            setisProductCart(true);
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
                    <span>{product.pricePerPack / 1000 + ".000đ"}</span>
                </div>
            </div>
        </>
    );
});

// export const ProductItem = ({ product, openRodal }) => {
//     const { setCart, mobileMode, setHeaderInfo } = useContext(AppContext);
//     const [productRodalQuantity, setProductRodalQuantity] = useState(0);
//     const [isProductCart, setisProductCart] = useState(true);
//     const [visiblePopupQuantity, setVisiblePopupQuantity] = useState(false);

//     useEffect(() => {
//         console.log({ product });
//         if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME))) {
//             localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify([]));
//         }
//         const CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME));
//         let include = false;
//         CartList?.map((item) => {
//             if (item.id === product.id) {
//                 setProductRodalQuantity(item.quantityCart);
//                 include = true;
//                 return;
//             }
//         });
//         if (include) {
//             setisProductCart(true);
//         } else {
//             setisProductCart(false);
//         }
//         return () => {};
//     }, [product]);

//     const decreaseQty = () => {
//         setProductRodalQuantity(productRodalQuantity - 1);
//         if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME))) {
//             localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify([]));
//         }
//         const CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME));
//         let newCarts = CartList?.map((item) => {
//             if (item.id === product.id) {
//                 item.quantityCart = item.quantityCart - 1;
//             }
//             return item;
//         });
//         setCart([...newCarts]);
//         localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify([...newCarts]));
//     };
//     function resetQuantity() {
//         console.log("dc ne");
//     }
//     const AddCart = () => {
//         let isQuantity = false;
//         if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME))) {
//             localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify([]));
//         }
//         const CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME));
//         const carts = [
//             ...CartList,
//             {
//                 ...product,
//                 quantityCart: 1,
//             },
//         ];
//         setProductRodalQuantity(productRodalQuantity + 1);
//         setCart(carts);
//         localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify([...carts]));
//     };

//     const increaseQty = () => {
//         setProductRodalQuantity(productRodalQuantity + 1);
//         if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME))) {
//             localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify([]));
//         }
//         const CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME));
//         let newCarts = CartList?.map((item) => {
//             if (item.id === product.id) {
//                 item.quantityCart = item.quantityCart + 1;
//             }
//             return item;
//         });
//         setCart([...newCarts]);
//         localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify([...newCarts]));
//     };
//     return (
//         <>
//             <div key={product.id} className="c_flex" style={{ borderBottom: "1px solid #f0f0f0", width: "100%", padding: "12px 0" }}>
//                 <div className="product-list-info">
//                     <div className="product-list-img">
//                         <img src="https://dl.airtable.com/a1H2V0kzS7275gkh6Zvd_soda%20schweppes-thumbnail%402x.jpg?ts=1659609262&userId=usrk5orn56sTujaim&cs=d0b00a38348c7490" alt="" />
//                     </div>
//                     <div className="product-list-name">
//                         <span>{product.name} </span>
//                         <div className="" style={{ paddingBottom: "0" }}>
//                             {isProductCart ? (
//                                 <div className="center_flex cart-quantity" style={{ width: " 100%" }}>
//                                     <div
//                                         style={{ color: productRodalQuantity > 0 ? "" : "rgba(0,0,0,.25)", height: 35 }}
//                                         className="center_flex cart-quantity-minus"
//                                         onClick={() => {
//                                             if (productRodalQuantity > 1) {
//                                                 decreaseQty(1);
//                                             } else {
//                                                 openRodal({ rodal: true, product: product });
//                                                 setVisiblePopupQuantity(true);
//                                             }
//                                         }}
//                                     >
//                                         <i className="fa-solid fa-minus"></i>
//                                     </div>
//                                     <div className="center_flex cart-quantity-text">
//                                         <span>{productRodalQuantity}</span>
//                                     </div>
//                                     <div className="center_flex cart-quantity-plus" onClick={() => increaseQty(1)} style={{ height: 35 }}>
//                                         <i className="fa-solid fa-plus"></i>
//                                     </div>
//                                 </div>
//                             ) : (
//                                 <div className="center_flex cart-quantity" style={{ width: " 100%" }}>
//                                     <div
//                                         className="center_flex cart-quantity-add"
//                                         onClick={() => {
//                                             AddCart();
//                                             setisProductCart(true);
//                                         }}
//                                     >
//                                         Thêm
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//                 <div className="product-list-price">
//                     <span>{product.pricePerPack / 1000 + ".000đ"}</span>
//                 </div>
//             </div>
//         </>
//     );
// };
