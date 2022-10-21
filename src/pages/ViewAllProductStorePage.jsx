import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { getListProductByStoreId } from "../apis/apiService";
import Loading from "../common/Loading/Loading";
import { ProductList } from "../components/products/ProductList";
import { AppContext } from "../context/AppProvider";

export const ViewAllProductStorePage = () => {
    const { setHeaderInfo, menuIdProvider, modeType, setModeType } = useContext(AppContext);
    const [isLoadingCircle, setIsLoadingCircle] = useState(true);
    const [products, setProducts] = useState(null);
    const [title, setTitle] = useState("");

    const [img, setImg] = useState("");
    let location = useLocation();
    let history = useHistory();
    useEffect(() => {
        let modeId = location.pathname.trim().split("/")[2];
        if (menuIdProvider === "0") {
            history.push(`/mode/${modeId}`);
        } else {
            let storeId = location.pathname.trim().split("/")[4];
            setIsLoadingCircle(true);
            getListProductByStoreId(menuIdProvider, storeId, 1, 100)
                .then((res) => {
                    if (res.data) {
                        const category = res.data;
                        const productList = category.listProducts || [];
                        const title = category.name;
                        setTitle(title);
                        const image = category.image;
                        setImg(image);

                        // let newProduct =
                        // if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME))) {
                        //     localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify([]));
                        // } else {
                        //     const CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME));
                        //     for (let index = 0; index < CartList.length; index++) {
                        //         if (CartList[index].id === newProduct.id) {
                        //             newProduct = { ...newProduct, quantityCart: CartList[index].quantityCart };
                        //         }
                        //     }
                        // }
                        setProducts(productList);
                        setHeaderInfo({ isSearchHeader: false, title: title });
                        setIsLoadingCircle(false);
                    } else {
                        setIsLoadingCircle(false);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setIsLoadingCircle(false);
                    setProducts([]);
                });
        }

        return () => {
            setIsLoadingCircle(false);
        };
    }, [history, location.pathname, menuIdProvider, setHeaderInfo]);

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
    return (
        <div>
            <Loading isLoading={isLoadingCircle} />
            <div className={`loading-spin ${!isLoadingCircle && "loading-spin-done"}`}></div>
            <div className="store-wrapper">
                <div className="store-image-background">
                    <div className="store-name">
                        <h3 style={{ paddingBottom: 5 }}> {title}</h3>
                        <span className="store-building">
                            <i class="fa-solid fa-location-dot" style={{ color: "var(--primary)", paddingRight: 7 }}></i>
                            <span>Tòa S6.03, Rainbow, Vinhomes Grand Park</span>
                        </span>
                        <span className="store-building" style={{}}>
                            <i class="fa-regular fa-clock" style={{ color: "var(--primary)", paddingRight: 7 }}></i>
                            <span>Giờ mở cửa: 07:00 | Giờ đóng cửa: 22:00</span>
                        </span>

                        <span className="store-building" style={{ color: "green" }}>
                            <i class="fa-solid fa-clock-rotate-left" style={{ color: "green", paddingRight: 7 }}></i>
                            <span>{modeType}</span>
                        </span>
                    </div>
                </div>
            </div>
            {products?.length > 0 && <ProductList data={[...products] || []} filter={2} />}
            {products?.length === 0 && (
                <section className="shop" style={{ padding: "25px 0 40px 0" }}>
                    <div className="container center_flex">
                        <div className="contentWidth  center_flex" style={{ marginLeft: 0, flexDirection: "column", gap: 10 }}>
                            <img src="/images/fish-bones.png" style={{ width: 50 }} alt="" />
                            <span style={{ fontSize: "1.1rem" }}>Hiện không có sản phẩm nào!!</span>
                        </div>
                    </div>
                </section>
            )}
            {/* {!isLoadingCircle && <ProductGrid data={products || []} label={title || ""} cateId={""} labelImg={img || IMAGE_NOTFOUND} isViewAll={false} />} */}
        </div>
    );
};
