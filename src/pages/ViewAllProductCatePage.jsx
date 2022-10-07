import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getListProductByCateId } from "../apis/apiService";
import Loading from "../common/Loading/Loading";
import { ProductList } from "../components/products/ProductList";
import { AppContext } from "../context/AppProvider";

export const ViewAllProductCatePage = () => {
    const { setHeaderInfo } = useContext(AppContext);
    const [isLoadingCircle, setIsLoadingCircle] = useState(true);
    const [products, setProducts] = useState([]);
    const [title, setTitle] = useState("");
    const [img, setImg] = useState("");
    let location = useLocation();
    useEffect(() => {
        let cateId = location.pathname.trim().split("/")[4];
        let menuId = location.pathname.trim().split("/")[2];
        setIsLoadingCircle(true);
        // setIsHeader(false);
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
        return () => {
            setIsLoadingCircle(false);
            setHeaderInfo({});
        };
    }, [location.pathname, setHeaderInfo]);

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
            <ProductList data={products || []} />
            {/* {!isLoadingCircle && <ProductGrid data={products || []} label={title || ""} cateId={""} labelImg={img || IMAGE_NOTFOUND} isViewAll={false} />} */}
        </div>
    );
};
