import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { getAreas, getBuildings, getListOrder } from "../apis/apiService";
import { LOCALSTORAGE_CART_NAME, LOCALSTORAGE_MODE, LOCALSTORAGE_USER_LOGIN, LOCALSTORAGE_USER_NAME } from "../constants/Variable";

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
    const [listProducts, setlistProducts] = useState([]);
    const [menu, setMenu] = useState("0");
    const [menuIdProvider, setMenuIdProvider] = useState("0");
    const [orderStatus, setOrderStatus] = useState("0");
    const [menuOrder, setMenuOrder] = useState(1);
    const [mobileMode, setMobileMode] = useState(window.innerWidth < 700 ? true : false);
    const [Cart, setCart] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isCartFooter, setIsCartFooter] = useState(false);
    const [isHeaderHome, setIsHeaderHome] = useState(false);
    const [opentModalSuccess, setOpentModalSuccess] = useState(false);
    const [opentModalError, setOpentModalError] = useState(false);
    const [isHeaderOrder, setIsHeaderOrder] = useState(false);
    const [visiblePopupInfo, setVisiblePopupInfo] = useState(false);
    const [isLoadingMain, setisLoadingMain] = useState(true);
    const [isCartMain, setisCartMain] = useState(true);
    const [headerInfo, setHeaderInfo] = useState({});
    const [apartmentProvider, setApartmentProvider] = useState([]);
    const [areaProvider, setAreaProvider] = useState([]);
    const [buildings, setBuildings] = useState([]);
    const [orderDrawer, setOrdersDrawer] = useState([]);
    const [auth, setAuth] = useState({});
    let location = useLocation();
    let history = useHistory();
    // const { productItems } = Data;
    useEffect(() => {
        getAreas(1, 100)
            .then((res) => {
                if (res.data) {
                    const area = res.data;
                    setAreaProvider(area);
                    setisLoadingMain(false);
                } else {
                    setAreaProvider([]);
                    setisLoadingMain(false);
                }
            })
            .catch((error) => {
                console.log(error);
                setAreaProvider([]);
                setisLoadingMain(false);
            });
    }, [location.pathname]);

    useEffect(() => {
        let menuId = location.pathname.trim().split("/")[2];
        if (location.pathname.trim().split("/") && location.pathname.trim().split("/")[1] === "menu") {
            setMenu(menuId);
        }
    }, [location.pathname]);
    useEffect(() => {
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_MODE))) {
            localStorage.setItem(LOCALSTORAGE_MODE, JSON.stringify(""));
        }
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
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_USER_LOGIN))) {
            setAuth({ userId: "", isLogin: false, userPhone: "" });
            localStorage.setItem(LOCALSTORAGE_USER_LOGIN, JSON.stringify({ userId: "", isLogin: false, userPhone: "" }));
        } else {
            const auth = JSON.parse(localStorage.getItem(LOCALSTORAGE_USER_LOGIN));
            setAuth({ ...auth });
            // getListOrder(auth.userId, 1, 3)
            //     .then((res) => {
            //         if (res.data) {
            //             let orders = res.data;
            //             orders = orders.filter((item) => item.statusId !== "4" || item.statusId !== "5");
            //             console.log(orders);
            //             setOrdersDrawer(orders || []);
            //         } else {
            //         }
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });
        }
        return () => {};
    }, [history]);

    useEffect(() => {
        const checkout = location.pathname.trim().split("/")[1];
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
                buildings,
                setBuildings,
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
                auth,
                setAuth,
                orderDrawer,
                setOrdersDrawer,
                areaProvider,
                setAreaProvider,
                apartmentProvider,
                setApartmentProvider,
                menuIdProvider,
                setMenuIdProvider,
                isCartFooter,
                setIsCartFooter,
                isLoadingMain,
                setisLoadingMain,
                opentModalSuccess,
                setOpentModalSuccess,
                opentModalError,
                setOpentModalError,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
