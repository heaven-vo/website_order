import React, { useEffect, useState } from "react";
import Pdata from "../components/products/Pdata";
import { LOCALSTORAGE_NAME } from "../constants/Variable";

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
    const [listProducts, setlistProducts] = useState([]);
    const [mobileMode, setMobileMode] = useState(window.innerWidth < 700 ? true : false);
    const [Cart, setCart] = useState([]);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const { shopItems } = Pdata;
    useEffect(() => {
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME))) {
            localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify([]));
            setCart([]);
        } else {
            const CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME));
            setCart([...CartList]);
            for (let index = 0; index < CartList.length; index++) {
                const ind = shopItems.findIndex((obj) => {
                    return obj.id === CartList[index].id;
                });
                shopItems[ind].quantityCart = CartList[index].quantityCart;
            }
        }
        // getListCategory().then((res) => {});

        setlistProducts(shopItems);
    }, [shopItems]);

    return (
        <AppContext.Provider
            value={{
                listProducts,
                setlistProducts,
                Cart,
                setCart,
                mobileMode,
                setMobileMode,
                isOpenDrawer, setIsOpenDrawer
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
