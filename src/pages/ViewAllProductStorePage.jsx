import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { getListProductByCateId, getListProductByStoreId } from "../apis/apiService";
import Loading from "../common/Loading/Loading";
import { ProductGrid } from "../components/products/ProductGrid";
import { IMAGE_NOTFOUND } from "../constants/Variable";
import { AppContext } from "../context/AppProvider";

export const ViewAllProductStorePage = () => {
    const { setIsHeader, menu } = useContext(AppContext);
    const [isLoadingCircle, setIsLoadingCircle] = useState(true);
    const [products, setProducts] = useState([]);
    let location = useLocation();
    useEffect(() => {
        let storeId = location.pathname.trim().split("/")[4];
        let menuId = location.pathname.trim().split("/")[2];
        setIsLoadingCircle(true);
        setIsHeader(false);
        getListProductByStoreId(menuId, storeId, 1, 100)
            .then((res) => {
                if (res.data) {
                    const productList = res.data;
                    // let newProduct =
                    // if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME))) {
                    //     localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify([]));
                    // } else {
                    //     const CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME));
                    //     for (let index = 0; index < CartList.length; index++) {
                    //         if (CartList[index].id === newProduct.id) {
                    //             newProduct = { ...newProduct, quantityCart: CartList[index].quantityCart };
                    //         }
                    //     }
                    // }
                    setProducts(productList);
                    setTimeout(() => {
                        setIsLoadingCircle(false);
                    }, 500);
                } else {
                    setIsLoadingCircle(false);
                }
            })
            .catch((error) => {
                console.log(error);
                setIsLoadingCircle(false);
            });
        return () => {
            setIsLoadingCircle(false);
        };
    }, [location.pathname, setIsHeader]);

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
            {!isLoadingCircle && <ProductGrid data={products || []} label={"Bánh Kẹo"} cateId={""} labelImg={IMAGE_NOTFOUND} isViewAll={false} />}
        </div>
    );
};
