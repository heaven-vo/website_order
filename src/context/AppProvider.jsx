import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { LOCALSTORAGE_CART_NAME, LOCALSTORAGE_USER_NAME } from "../constants/Variable";

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
    const [listProducts, setlistProducts] = useState([]);
    const [menu, setMenu] = useState("0");
    const [menuOrder, setMenuOrder] = useState(1);
    const [mobileMode, setMobileMode] = useState(window.innerWidth < 700 ? true : false);
    const [Cart, setCart] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isHeaderHome, setIsHeaderHome] = useState(false);
    const [isHeaderOrder, setIsHeaderOrder] = useState(false);
    const [visiblePopupInfo, setVisiblePopupInfo] = useState(false);
    const [isCartMain, setisCartMain] = useState(true);
    const [headerInfo, setHeaderInfo] = useState({});
    const [isLogin, setisLogin] = useState(false);
    let location = useLocation();
    let history = useHistory();
    // const { productItems } = Data;
    useEffect(() => {
        let menuId = location.pathname.trim().split("/")[2];
        setMenu(menuId);
    }, [location.pathname]);
    useEffect(() => {
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_USER_NAME))) {
            localStorage.setItem(LOCALSTORAGE_USER_NAME, JSON.stringify([]));
            setUserInfo({});
            history.push("/");
        } else {
            const user = JSON.parse(localStorage.getItem(LOCALSTORAGE_USER_NAME));
            if (Object.keys(user).length === 0) {
                history.push("/");
            }
            setUserInfo(user);
        }
        return () => {};
    }, [history]);

    useEffect(() => {
        const checkout = location.pathname.trim().split("/")[1];
        console.log({ checkout });
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME))) {
            localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify([]));
            setCart([]);
            setisCartMain(false);
        } else {
            const CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME));
            if (checkout !== "" && checkout !== "order" && checkout !== "login") {
                if (CartList.length === 0) {
                    setisCartMain(false);
                } else if (CartList.length > 0) {
                    setisCartMain(true);
                }
            } else {
                console.log("ok");
                setisCartMain(false);
            }
            if (checkout === "checkout") {
                if (CartList.length === 0) {
                    history.push("/");
                }
            }
            setCart([...CartList]);
        }
    }, [history, location]);

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
                // isHeader,
                // setIsHeader,
                isHeaderOrder,
                setIsHeaderOrder,
                menuOrder,
                setMenuOrder,
                userInfo,
                setUserInfo,
                visiblePopupInfo,
                setVisiblePopupInfo,
                isHeaderHome,
                setIsHeaderHome,
                headerInfo,
                setHeaderInfo,
                isCartMain,
                setisCartMain,
                isLogin,
                setisLogin,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
