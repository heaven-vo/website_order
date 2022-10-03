import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { getProductDetail } from "../apis/apiService";
import Loading from "../common/Loading/Loading";
import Pdata from "../components/products/Pdata";
import { IMAGE_NOTFOUND, LOCALSTORAGE_NAME } from "../constants/Variable";
import { AppContext } from "../context/AppProvider";

export const FoodDetailPage = () => {
    const { setCart, setIsHeader } = useContext(AppContext);
    const [countQuantity, setcountQuantity] = useState(1);
    const [isLoadingCircle, setIsLoadingCircle] = useState(true);
    const [product, setProduct] = useState({});
    const { shopItems } = Pdata;
    let history = useHistory();
    let location = useLocation();
    useEffect(() => {
        setIsHeader(false);
        setIsLoadingCircle(true);
        let productId = location.pathname.trim().split("/")[3];
        if (productId) {
            getProductDetail(productId)
                .then((res) => {
                    if (res.data) {
                        const product = res.data;
                        let newProduct = { ...product, quantityCart: 0 };
                        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME))) {
                            localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify([]));
                            setCart([]);
                        } else {
                            const CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME));
                            for (let index = 0; index < CartList.length; index++) {
                                if (CartList[index].id === newProduct.id) {
                                    newProduct = { ...newProduct, quantityCart: CartList[index].quantityCart };
                                }
                            }
                        }
                        setProduct({ ...newProduct });
                        setTimeout(() => {
                            setIsLoadingCircle(false);
                        }, 1000);
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

        return () => {
            setIsHeader(true);
            setIsHeader(false);
        };
    }, [setIsHeader, location, setCart, setIsLoadingCircle]);

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

    const AddCart = () => {
        let isQuantity = false;
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME))) {
            localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify([]));
        }
        const CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME));
        let newCarts = CartList?.map((item) => {
            if (item.id === product.id) {
                item.quantityCart = item.quantityCart + countQuantity;
                // if (item.quantity > getCountQuantity()) {
                //     item.quantity = getCountQuantity();
                // }
                isQuantity = true;
            }
            return item;
        });
        if (!isQuantity) {
            const carts = [
                ...CartList,
                {
                    ...product,
                },
            ];
            setCart(carts);
            localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify([...carts]));
        } else {
            setCart([...newCarts]);
            localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify([...newCarts]));
        }
    };

    return (
        <>
            <Loading isLoading={isLoadingCircle} />
            {!isLoadingCircle && product && (
                <section className="background">
                    <div className="container non-radius" style={{ background: "#fff", borderRadius: 10 }}>
                        <div className="d_flex food-detail" style={{ padding: "10px 25px" }}>
                            <div className="food-detail-left" style={{ padding: 50 }}>
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
                                <h2>{product.name}</h2>
                                <h4 style={{ fontWeight: 500, color: "rgb(102, 102, 102)" }}>{product.id}</h4>
                                <h3 style={{ color: "var(--primary)", marginTop: 15 }}>{product.pricePerPack / 1000 + ".000đ"}</h3>
                                <h4 style={{ marginBottom: 20, fontSize: 14, fontWeight: 400, color: "#666666" }}>{product.packDescription}</h4>
                                <div
                                    className="d_flex food-detail-info"
                                    style={{
                                        justifyContent: "start",
                                        marginRight: 150,
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
                                    <div>
                                        <h3 style={{ fontSize: 18 }}>{product.storeName}</h3>
                                        <span style={{ color: "rgb(160,160,160)", fontWeight: 400, fontSize: 15 }}>{product.slogan}</span>
                                    </div>
                                </div>
                                <p style={{ color: "#666666", padding: "20px 0" }}>{product.description}</p>

                                <div className="f_flex food-detail-btn" style={{ gap: 40, marginBottom: 25 }}>
                                    <div
                                        style={{ border: "1px solid rgb(160,160,160)", textAlign: "center", width: 170, height: 50, borderRadius: "0.375rem", alignItems: "center" }}
                                        className="f_flex"
                                    >
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
                                    <div style={{ textAlign: "center", width: 300, height: 50, borderRadius: "0.375rem", alignItems: "center" }} className="center_flex btn-hover">
                                        <span onClick={() => AddCart()} style={{ fontWeight: 600, fontSize: 16 }}>
                                            Thêm Giỏ Hàng
                                        </span>
                                    </div>
                                </div>

                                <table>
                                    <tbody>
                                        <tr className="">
                                            <td className="food-detail-label">Loại Thực Phẩm: </td>
                                            <td>
                                                <div className="cusor" style={{ borderRadius: 20, background: "#f7e9c7", padding: "6px 14px" }}>
                                                    <span style={{ fontSize: 14, fontWeight: 700 }}>{product.productCategory}</span>
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
