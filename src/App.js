import { useContext, useEffect, useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { Route, Switch } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "../src/pages/responsive.css";
import "./App.css";
import { CartMain } from "./common/Cart/CartMain";
import Footer from "./common/footer/Footer";
import { DrawerContent } from "./common/header/Drawer";
import Header from "./common/header/Header";
import Loading from "./common/Loading/Loading";

import { ModalDeleteCart } from "./components/wrapper/ModalDeleteCart";
import { ErrorModal, SuccessModal } from "./components/wrapper/ModalOrder";
import { AppContext } from "./context/AppProvider";
import Cart from "./pages/CartPage";
import { FoodDetailPage } from "./pages/FoodDetailPage";
import HomePage from "./pages/HomePages";
import { LoginPage } from "./pages/LoginPage";
import { MenuPage } from "./pages/MenuPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { OrderDetailPage } from "./pages/OrderDetailPage";
import OrderLookupPage from "./pages/OrderLookupPage";
import SchedulePage from "./pages/SchedulePage";
import { SearchPage } from "./pages/SearchPage";

import { ViewAllProductCatePage } from "./pages/ViewAllProductCatePage";
import { ViewAllProductStorePage } from "./pages/ViewAllProductStorePage";
import "./util.css";
function App() {
    const { setMobileMode, isOpenDrawer, setIsOpenDrawer, isCartMain, isLoadingMain, mobileMode } = useContext(AppContext);
    const [vh, setVh] = useState(window.innerHeight);
    useEffect(() => {
        const updateVh = () => {
            setVh(window.innerHeight);
        };
        const documentHeight = () => {
            const doc = document.documentElement;
            doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
        };
        window.addEventListener("", documentHeight);
        documentHeight();

        return () => window.removeEventListener("resize", updateVh);
    }, []);
    useEffect(() => {
        function handleResize() {
            if (window.innerWidth <= 700) {
                setMobileMode(true);
            } else {
                setMobileMode(false);
            }
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [setMobileMode]);
    useEffect(() => {
        if (!isOpenDrawer) {
            document.body.style.overflow = "auto";
            document.body.style.touchAction = "auto";
        }
    }, [isOpenDrawer]);

    useEffect(() => {
        if (!isOpenDrawer) {
            document.body.style.overflow = "auto";
            document.body.style.touchAction = "auto";
        }
    }, [isCartMain]);
    const toggleDrawer = () => {
        setIsOpenDrawer((prevState) => !prevState);
    };

    return (
        <div className="root center_flex" style={{ height: mobileMode ? vh : null }}>
            {/* <MessengerCustomerChat pageId="100083337097834" appId="437264958531394" /> */}
            <div className="logo-backround">
                <img style={{ width: "100%", height: "100%", objectFit: "contain" }} src="/images/logo.jpg" alt="" />
            </div>
            <div className="main" id="main">
                {SuccessModal()}
                {ErrorModal()}
                <ModalDeleteCart />
                <Loading isLoading={isLoadingMain} />
                <Header />
                <Drawer size={300} open={isOpenDrawer} duration={300} onClose={toggleDrawer} zIndex={9999} direction="right" className="drawer__container">
                    <DrawerContent />
                </Drawer>
                <Switch>
                    <Route path="/" exact>
                        <HomePage />
                    </Route>
                    <Route path="/login" exact>
                        <LoginPage />
                    </Route>

                    <Route path="/mode/:modeId" exact>
                        <MenuPage />
                    </Route>

                    {/* <Route path="/categories/:id" exact>
                    <HomePage productItems={productItems} />
                </Route> */}
                    <Route path="/mode/:modeId/store/:storeId" exact>
                        <ViewAllProductStorePage />
                    </Route>
                    <Route path="/mode/:modeId/cate/:cateId" exact>
                        <ViewAllProductCatePage />
                    </Route>
                    <Route path="/order" exact>
                        <OrderLookupPage />
                    </Route>
                    <Route path="/order/:order" exact>
                        <OrderDetailPage />
                    </Route>
                    <Route path="/mode/:modeId/product/:id" exact>
                        <FoodDetailPage />
                    </Route>

                    <Route path="/checkout" exact>
                        <Cart />
                    </Route>
                    <Route path="/mode/:modeId/search" exact>
                        <SearchPage />
                    </Route>
                    <Route path="/mode/:id/schedule" exact>
                        <SchedulePage />
                    </Route>
                    {/* <Route path="/checkout2" exact>
                        <CheckoutPage />
                    </Route> */}
                    <Route path="*">
                        <NotFoundPage />
                    </Route>
                </Switch>
                {isCartMain && <CartMain />}
                <Footer />
            </div>
        </div>
    );
}

export default App;
