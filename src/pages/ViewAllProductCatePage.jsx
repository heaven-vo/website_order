import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { useHistory, useLocation } from "react-router-dom";
import { getListProductByCateId, getListStoreByCate } from "../apis/apiService";
import Loading from "../common/Loading/Loading";
import { ProductList } from "../components/products/ProductList";
import ShopList from "../components/products/ShopList";
import { AppContext } from "../context/AppProvider";

export const ViewAllProductCatePage = () => {
    const { setHeaderInfo, menuIdProvider, mobileMode, mode, categoriesInMenu } = useContext(AppContext);
    const [isLoadingCircle, setIsLoadingCircle] = useState(true);
    const [products, setProducts] = useState(null);
    const [stores, setStores] = useState(null);
    const [title, setTitle] = useState("");
    const [reload, setReload] = useState(false);
    const [category, setCategory] = useState("");
    const [img, setImg] = useState("");
    let location = useLocation();
    let history = useHistory();

    const getListStoreByCateId = (menuId, cateId) => {
        getListStoreByCate(menuId, cateId, 1, 100)
            .then((res) => {
                if (res.data) {
                    const storeData = res.data;
                    const storeList = storeData || [];
                    let { categoryName } = location.state;
                    console.log({ storeList });
                    if (categoryName) {
                        setStores(storeList);
                        setHeaderInfo({ isSearchHeader: false, title: categoryName });
                    }
                    setIsLoadingCircle(false);
                } else {
                    setIsLoadingCircle(false);
                }
            })
            .catch((error) => {
                console.log(error);
                setStores([]);
                setIsLoadingCircle(false);
            });
    };

    useEffect(() => {
        let modeId = location.pathname.trim().split("/")[2];
        if (menuIdProvider === "0") {
            history.push(`/mode/${modeId}`);
        } else {
            let cateId = location.pathname.trim().split("/")[4];
            // let menuId = location.pathname.trim().split("/")[2];
            setIsLoadingCircle(true);
            // setIsHeader(false);
            if (mode === "1") {
                console.log({ mode });

                getListStoreByCateId(menuIdProvider, cateId);
            } else if (mode === "2" || mode === "3") {
                getListProductByFilter(menuIdProvider, cateId);
            }
            // getListProductByFilter(menuIdProvider, cateId);
        }
        return () => {
            setIsLoadingCircle(false);
            setHeaderInfo({});
        };
    }, [location.pathname, setHeaderInfo, menuIdProvider]);
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
                    console.log({ productList });
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
    const colourStyles = {
        control: (styles) => ({
            ...styles,
            // width: 150,
            borderRadius: "1rem",
            padding: "0 5px",
            fontSize: mobileMode ? 14 : 16,
        }),
        menuList: (styles) => ({
            ...styles,
        }),
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

    const optionsBuilding = categoriesInMenu?.map((item) => {
        return { value: item.id, label: item.name };
    });
    return (
        <div style={{ background: "rgb(246, 249, 252)", height: "100%" }}>
            <Loading isLoading={isLoadingCircle} />
            <div className={`loading-spin ${!isLoadingCircle && "loading-spin-done"}`}></div>
            <div style={{ padding: "75px 15px 15px 15px", display: "flex", gap: 10, width: "100%" }}>
                <div style={{}} className="center_flex cusor filter-select-cate">
                    {/* <i className="fa-solid fa-utensils" style={{ fontSize: 14 }}></i> */}
                    <Select
                        options={categoriesInMenu.length > 0 ? optionsBuilding : null}
                        placeholder="Danh mục"
                        isSearchable={false}
                        onChange={(e) => {
                            setIsLoadingCircle(true);
                            if (mode === "1") {
                                getListStoreByCate(menuIdProvider, e.value, 1, 100)
                                    .then((res) => {
                                        if (res.data) {
                                            const storeData = res.data;
                                            const storeList = storeData || [];
                                            setStores(storeList);
                                            setHeaderInfo({ isSearchHeader: false, title: e.label });
                                            setIsLoadingCircle(false);
                                        } else {
                                            setIsLoadingCircle(false);
                                        }
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                        setStores([]);
                                        setIsLoadingCircle(false);
                                    });
                            } else {
                                getListProductByCateId(menuIdProvider, e.value, 1, 100)
                                    .then((res) => {
                                        if (res.data) {
                                            const category = res.data;
                                            const productList = category.listProducts || [];
                                            const title = category.name;
                                            setTitle(title);
                                            const image = category.image;
                                            setImg(image);

                                            console.log({ productList });
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
                            }
                        }}
                        styles={colourStyles}
                    />
                </div>
            </div>
            <div style={{ background: "#fff", height: "calc(100% - 130px)" }}>
                {mode === "1" && (
                    <ShopList
                        data={stores !== null ? stores : []}
                        // filter={1}
                        // reLoad={() => {
                        //     hanldeReLoad();
                        // }}
                    />
                )}
                {(mode === "2" || mode === "3") && (
                    <ProductList
                        data={products !== null ? products : []}
                        filter={1}
                        reLoad={() => {
                            hanldeReLoad();
                        }}
                    />
                )}
                {stores?.length === 0 ||
                    (products?.length === 0 && (
                        <section className="shop" style={{ padding: "25px 0 40px 0" }}>
                            <div className="container center_flex">
                                <div className="contentWidth  center_flex" style={{ marginLeft: 0, flexDirection: "column", gap: 20 }}>
                                    <img src="/images/fish-bones.png" style={{ width: 50, opacity: 0.7 }} alt="" />
                                    <span style={{ fontSize: "1rem", fontWeight: "lighter" }}>Hiện không có sản phẩm nào!!</span>
                                </div>
                            </div>
                        </section>
                    ))}
            </div>

            {/* {!isLoadingCircle && <ProductGrid data={products || []} label={title || ""} cateId={""} labelImg={img || IMAGE_NOTFOUND} isViewAll={false} />} */}
        </div>
    );
};
