import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getListProductByCateId } from "../apis/apiService";
import Loading from "../common/Loading/Loading";
import { ProductList } from "../components/products/ProductList";
import { AppContext } from "../context/AppProvider";

export const ViewAllProductCatePage = () => {
    const { setHeaderInfo } = useContext(AppContext);
    const [isLoadingCircle, setIsLoadingCircle] = useState(true);
    const [products, setProducts] = useState(null);
    const [title, setTitle] = useState("");
    const [reload, setReload] = useState(false);
    const [img, setImg] = useState("");
    let location = useLocation();
    useEffect(() => {
        let cateId = location.pathname.trim().split("/")[4];
        let menuId = location.pathname.trim().split("/")[2];
        setIsLoadingCircle(true);
        // setIsHeader(false);
        getListProductByFilter(menuId, cateId);
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
        <div>
            <Loading isLoading={isLoadingCircle} />
            <div className={`loading-spin ${!isLoadingCircle && "loading-spin-done"}`}></div>
            <ProductList
                data={products !== null ? products : []}
                filter={1}
                reLoad={() => {
                    hanldeReLoad();
                }}
            />
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
