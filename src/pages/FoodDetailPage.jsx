import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Rodal from "rodal";
import { getProductDetail } from "../apis/apiService";
import Loading from "../common/Loading/Loading";
import Pdata from "../components/products/Pdata";
import { IMAGE_NOTFOUND, LOCALSTORAGE_CART_NAME, LOCALSTORAGE_MODE } from "../constants/Variable";
import { AppContext } from "../context/AppProvider";

export const FoodDetailPage = () => {
    const { setCart, mobileMode, setHeaderInfo, setisCartMain, menu } = useContext(AppContext);
    const [countQuantity, setcountQuantity] = useState(1);
    const [isLoadingCircle, setIsLoadingCircle] = useState(true);
    const [product, setProduct] = useState({});
    const [visiblePopupQuantity, setVisiblePopupQuantity] = useState(false);
    const [visiblePopupOutOfStore, setVisiblePopupOutOfStore] = useState(false);
    const [productRodalQuantity, setProductRodalQuantity] = useState(0);
    const [isProductCart, setisProductCart] = useState(true);
    const { shopItems } = Pdata;
    let history = useHistory();
    let location = useLocation();
    useEffect(() => {
        // setIsHeader(false);
        setHeaderInfo({ isSearchHeader: false, title: "Chi tiết sản phẩm" });
        setIsLoadingCircle(true);
        let productId = location.pathname.trim().split("/")[3];
        if (productId) {
            getProductDetail(productId)
                .then((res) => {
                    if (res.data) {
                        const product = res.data;
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
                        setProduct({ ...newProduct });

                        setIsLoadingCircle(false);
                    } else {
                        setProduct({});
                        setIsLoadingCircle(false);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setProduct({});
                    setIsLoadingCircle(false);
                });
        }

        return () => {};
    }, [location, setCart, setIsLoadingCircle]);

    useEffect(() => {
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

        // for (let index = 0; index < CartList.length; index++) {
        //     console.log(CartList[index].id);
        //     console.log(product.id);
        //     if (CartList[index].id === product.id) {

        //         return;
        //     }
        // }
        if (include) {
            setisProductCart(true);
        } else {
            setisProductCart(false);
        }
        return () => {};
    }, [product]);

    useEffect(() => {
        if (!isLoadingCircle) {
            document.body.style.overflow = "auto";
            document.body.style.touchAction = "auto";
        } else {
            document.body.style.overflow = "hidden";
            document.body.style.touchAction = "none";
        }

        return () => {};
    }, [isLoadingCircle]);
    const increaseQty = (id) => {
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
    // Giảm số lượng sản phẩm trong giỏ hàng
    const decreaseQty = (id) => {
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
    // const AddCart = () => {
    //     let isQuantity = false;
    //     if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME))) {
    //         localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify([]));
    //     }
    //     const CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME));
    //     const carts = [
    //         ...CartList,
    //         {
    //             ...product,
    //             quantityCart: 1,
    //         },
    //     ];
    //     setisCartMain(true);
    //     setProductRodalQuantity(productRodalQuantity + 1);
    //     setCart(carts);
    //     localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify([...carts]));
    // };
    const AddCartOutOfStore = () => {
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME))) {
            localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify([]));
        }
        // const CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME));
        const carts = [
            {
                ...product,
                quantityCart: 1,
                menuId: menu,
            },
        ];
        setVisiblePopupOutOfStore(false);

        setisProductCart(true);
        setProductRodalQuantity(1);
        // itemsRef.current[indexRodal].isQuantity();
        setCart(carts);
        localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify([...carts]));
        // reLoad();
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
                    menuId: menu,
                },
            ];
            setisProductCart(true);
            setisCartMain(true);
            setProductRodalQuantity(productRodalQuantity + 1);
            setCart(carts);
            localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify([...carts]));
            localStorage.setItem(LOCALSTORAGE_MODE, JSON.stringify(menu));
        } else {
            setVisiblePopupOutOfStore(true);
            // openRodalOutOfStore({ rodal: true, product: product, index });
            console.log("khac store");
        }
    };
    const deleteCartItem = () => {
        const CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME));
        let newCarts = CartList?.filter((item) => item.id !== product.id);
        setCart([...newCarts]);
        localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify([...newCarts]));
        setVisiblePopupQuantity(false);
        setisProductCart(false);
        setProductRodalQuantity(0);

        if (newCarts.length === 0) {
            setisCartMain(false);
        }
    };
    return (
        <>
            <Loading isLoading={isLoadingCircle} />
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

                <div className="f_flex rodal-delet-cart" style={{ width: " 100%", justifyContent: "space-between", paddingTop: 20, gap: 10 }}>
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
                            AddCartOutOfStore();

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
                height={165}
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
                        {product.name}
                    </span>
                </div>

                <div className="f_flex rodal-delet-cart" style={{ width: " 100%", justifyContent: "space-between", paddingTop: 20, gap: 10 }}>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setVisiblePopupQuantity(false);
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
                        OK
                    </button>
                </div>
            </Rodal>
            <div className={`loading-spin ${!isLoadingCircle && "loading-spin-done"}`}></div>
            {!isLoadingCircle && product && (
                <section className="" style={{ paddingTop: 60, paddingBottom: 100, background: "#fff", transition: "1s all", WebkitTransition: "1s all" }}>
                    <div className="container non-radius" style={{ borderRadius: 0, height: "100%" }}>
                        <div className="d_flex food-detail" style={{ padding: "10px 25px", flexDirection: "column" }}>
                            <div className="food-detail-left" style={{}}>
                                <img src={product.image || IMAGE_NOTFOUND} alt="" />
                            </div>
                            <div className="food-detail-right">
                                {/* <div className="rate" style={{ color: "#e94560", marginBottom: 10 }}>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star" style={{ color: "rgb(102, 102, 102)" }}></i>
                            </div> */}
                                <h3>{product.name}</h3>
                                {/* <h4 style={{ fontWeight: 500, color: "rgb(102, 102, 102)" }}>{product.id}</h4> */}
                                <div style={{ color: "var(--primary)", fontSize: "1.5rem", marginTop: 10, marginBottom: 5, fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
                                    {product.pricePerPack?.toLocaleString()}
                                    <span style={{ fontSize: "1.2rem" }}>₫</span>
                                </div>

                                <h4 style={{ marginBottom: 15, fontSize: 14, fontWeight: 400, color: "#666666" }}>{product.packDescription}</h4>
                                <h4 style={{ marginBottom: 15, fontSize: 15, fontWeight: 500, color: "#4db856", textTransform: "uppercase" }}>Giao nhanh 30 phút</h4>
                                <div
                                    className="d_flex food-detail-info"
                                    style={{
                                        justifyContent: "start",
                                        // marginRight: 150,
                                        padding: "10px 0 10px 0",
                                        gap: 15,
                                        borderTop: "1px solid rgb(230,230,230)",
                                        borderBottom: "1px solid rgb(230,230,230)",
                                    }}
                                >
                                    <div className="food-detail-shop" style={{ width: 140, height: 50 }} onClick={() => history.push("/shop-detail")}>
                                        <img
                                            width={"100%"}
                                            height={"100%"}
                                            style={{ objectFit: "contain" }}
                                            src={product.storeImage || "https://cdn-icons-png.flaticon.com/512/123/123403.png"}
                                            alt=""
                                        />
                                    </div>
                                    <div style={{}} className="center_flex">
                                        <h3 style={{ fontSize: 18, fontWeight: 600 }}>{product.storeName}</h3>
                                        <span style={{ color: "rgb(160,160,160)", fontWeight: 400, fontSize: 15 }}>{product.slogan}</span>
                                    </div>
                                </div>
                                <p style={{ color: "#666666", padding: "20px 0", fontSize: "15px" }}>{product.description}</p>
                                <div className="" style={{ paddingBottom: "15px" }}>
                                    {isProductCart ? (
                                        <div className="center_flex cart-quantity" style={{ width: " 100%", boxShadow: "0 4px 5px rgb(0 0 0 / 13%)" }}>
                                            <div
                                                style={{ color: productRodalQuantity > 0 ? "" : "rgba(0,0,0,.25)" }}
                                                className="center_flex cart-quantity-minus"
                                                onClick={() => {
                                                    if (productRodalQuantity > 1) {
                                                        decreaseQty(product.id);
                                                    } else {
                                                        setVisiblePopupQuantity(true);
                                                    }
                                                }}
                                            >
                                                <i className="fa-solid fa-minus"></i>
                                            </div>
                                            <div className="center_flex cart-quantity-text">
                                                <span>{productRodalQuantity}</span>
                                            </div>
                                            <div className="center_flex cart-quantity-plus" onClick={() => increaseQty(product.id)}>
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
                                {/* <div className="f_flex food-detail-btn" style={{ gap: 20, marginBottom: 25 }}>
                                    <div style={{ border: "1px solid rgb(160,160,160)", textAlign: "center", width: 170, height: 50, borderRadius: "0.5rem", alignItems: "center" }} className="f_flex">
                                        <div
                                            onClick={() => setcountQuantity(countQuantity - (product.minimumDeIn || 1))}
                                            style={{ width: "6rem", borderRight: "1px solid rgb(160,160,160)", height: "100%" }}
                                            className="center_flex hover"
                                        >
                                            <i className="fa fa-minus"></i>
                                        </div>
                                        <span style={{ width: "6rem", fontWeight: 600, fontSize: 14 }}>
                                            {countQuantity}
                                            {" " + product.unit}
                                        </span>
                                        <div
                                            onClick={() => setcountQuantity(countQuantity + (product.minimumDeIn || 1))}
                                            style={{ width: "6rem", borderLeft: "1px solid rgb(160,160,160)", height: "100%" }}
                                            className="center_flex hover"
                                        >
                                            <i className="fa fa-plus"></i>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: "center", width: 300, height: 50, borderRadius: "0.5rem", alignItems: "center" }} className="center_flex btn-hover">
                                        <span onClick={() => AddCart()} style={{ fontWeight: 600, fontSize: 16 }}>
                                            Thêm Giỏ Hàng
                                        </span>
                                    </div>
                                </div> */}

                                <table>
                                    <tbody>
                                        <tr className="">
                                            <td className="food-detail-label">Loại Thực Phẩm: </td>
                                            <td>
                                                <div className="cusor" style={{}}>
                                                    <span className="food-detail-text" style={{}}>
                                                        {product.productCategory}
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                        {/* <tr className="">
                                        <td className="food-detail-label">Xuất Xứ: </td>
                                        <td className="food-detail-text">Việt Nam</td>
                                    </tr> */}
                                        <tr className="">
                                            <td className="food-detail-label">Đóng Gói: </td>
                                            <td className="food-detail-text">
                                                {product.packNetWeight}
                                                {" " + product.unit}
                                            </td>
                                        </tr>
                                        <tr className="">
                                            <td className="food-detail-label">Tối Thiểu: </td>
                                            <td className="food-detail-text">
                                                {product.minimumQuantity + " "}
                                                {product.unit}
                                            </td>
                                        </tr>
                                        <tr className="">
                                            <td className="food-detail-label">Tối Đa: </td>
                                            <td className="food-detail-text">
                                                {product.maximumQuantity + " "}
                                                {product.unit}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            )}
            {/* <section className="shop background">
                <div className="container">
                    <div className="heading d_flex">
                        <div className="heading f_flex">
                            <h1 style={{ marginTop: 3 }}>Sẩn Phẩm Tương Tự</h1>
                        </div>
                        <div className="heading-right row">
                            <span>Xem tất cả</span>
                            <i className="fa-solid fa-caret-right"></i>
                        </div>
                    </div>
                    <RecommendProduct />
                </div>
            </section> */}
        </>
    );
};
