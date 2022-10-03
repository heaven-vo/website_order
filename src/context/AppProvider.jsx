import React, { useEffect, useState } from "react";
import Data from "../components/Data";
import { LOCALSTORAGE_NAME } from "../constants/Variable";

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
    const [listProducts, setlistProducts] = useState([]);
    const [menu, setMenu] = useState(1);
    const [menuOrder, setMenuOrder] = useState(1);
    const [mobileMode, setMobileMode] = useState(window.innerWidth < 700 ? true : false);
    const [Cart, setCart] = useState([]);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isHeader, setIsHeader] = useState(true);
    const [isHeaderOrder, setIsHeaderOrder] = useState(false);
    // const { productItems } = Data;
    useEffect(() => {
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME))) {
            localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify([]));
            setCart([]);
        } else {
            const CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME));
            setCart([...CartList]);
            // for (let index = 0; index < CartList.length; index++) {
            //     const ind = productItems.findIndex((obj) => {
            //         return obj.id === CartList[index].id;
            //     });
            //     productItems[ind].quantityCart = CartList[index].quantityCart;
            // }
        }
        // getListCategory().then((res) => {});

        // setlistProducts(productItems);
    }, []);

    return (
        <AppContext.Provider
            value={{
                listProducts,
                setlistProducts,
                Cart,
                setCart,
                mobileMode,
                setMobileMode,
                isOpenDrawer,
                setIsOpenDrawer,
                menu,
                setMenu,
                isHeader,
                setIsHeader,
                isHeaderOrder,
                setIsHeaderOrder,
                menuOrder,
                setMenuOrder,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
