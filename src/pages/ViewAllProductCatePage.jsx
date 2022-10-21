import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { getListProductByCateId } from "../apis/apiService";
import Loading from "../common/Loading/Loading";
import { ProductList } from "../components/products/ProductList";
import ShopList from "../components/products/ShopList";
import { AppContext } from "../context/AppProvider";

export const ViewAllProductCatePage = () => {
    const { setHeaderInfo, menuIdProvider, mobileMode } = useContext(AppContext);
    const [isLoadingCircle, setIsLoadingCircle] = useState(true);
    const [products, setProducts] = useState(null);
    const [title, setTitle] = useState("");
    const [reload, setReload] = useState(false);
    const [img, setImg] = useState("");
    let location = useLocation();
    let history = useHistory();
    useEffect(() => {
        let modeId = location.pathname.trim().split("/")[2];
        if (menuIdProvider === "0") {
            history.push(`/mode/${modeId}`);
        } else {
            let cateId = location.pathname.trim().split("/")[4];
            // let menuId = location.pathname.trim().split("/")[2];
            setIsLoadingCircle(true);
            // setIsHeader(false);
            getListProductByFilter(menuIdProvider, cateId);
        }
        return () => {
            setIsLoadingCircle(false);
            setHeaderInfo({});
        };
    }, [location.pathname, setHeaderInfo]);
    //

    const getListProductByFilter = (menuId, cateId) => {
        getListProductByCateId(menuId, cateId, 1, 100)
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
                setProducts([]);
                setIsLoadingCircle(false);
            });
    };
    const hanldeReLoad = () => {
        let cateId = location.pathname.trim().split("/")[4];
        let menuId = location.pathname.trim().split("/")[2];
        getListProductByFilter(menuId, cateId, 1, 100);
    };
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
        <div style={{ background: "rgb(246, 249, 252)", height: "100%" }}>
            <Loading isLoading={isLoadingCircle} />
            <div className={`loading-spin ${!isLoadingCircle && "loading-spin-done"}`}></div>
            <div style={{ padding: "75px 15px 15px 15px", display: "flex", gap: 10 }}>
                <div
                    style={{ border: "1px solid rgb(230,230,230)", width: 135, height: 35, background: "#fff", borderRadius: "1rem", gap: 8, fontSize: mobileMode ? 14 : 16 }}
                    className="center_flex cusor"
                >
                    <i class="fa-solid fa-filter" style={{ fontSize: 14 }}></i> <span>Lọc nhanh</span>
                </div>
                <div
                    style={{ border: "1px solid rgb(230,230,230)", width: 135, height: 35, background: "#fff", borderRadius: "1rem", gap: 8, fontSize: mobileMode ? 14 : 16 }}
                    className="center_flex cusor"
                >
                    <i class="fa-solid fa-utensils" style={{ fontSize: 14 }}></i> <span>Danh mục</span>
                </div>
            </div>
            <div style={{ background: "#fff", height: "100%" }}>
                <ShopList
                    data={products !== null ? products : []}
                    filter={1}
                    reLoad={() => {
                        hanldeReLoad();
                    }}
                />
            </div>
            {products?.length === 0 && (
                <section className="shop" style={{ padding: "25px 0 40px 0" }}>
                    <div className="container center_flex">
                        <div className="contentWidth  center_flex" style={{ marginLeft: 0, flexDirection: "column", gap: 10 }}>
                            <img src="/images/fish-bones.png" style={{ width: 80 }} alt="" />
                            <span style={{ fontSize: "1.1rem" }}>Hiện không có sản phẩm nào!!</span>
                        </div>
                    </div>
                </section>
            )}
            {/* {!isLoadingCircle && <ProductGrid data={products || []} label={title || ""} cateId={""} labelImg={img || IMAGE_NOTFOUND} isViewAll={false} />} */}
        </div>
    );
};
