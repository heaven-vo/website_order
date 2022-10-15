import { useContext, useEffect } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { Route, Switch } from "react-router-dom";
import "../src/pages/responsive.css";
import "./App.css";
import Cart from "./common/Cart/Cart";
import { CartMain } from "./common/Cart/CartMain";
import Footer from "./common/footer/Footer";
import { DrawerContent } from "./common/header/Drawer";
import Header from "./common/header/Header";
import Data from "./components/Data";
import Pdata from "./components/products/Pdata";
import { AppContext } from "./context/AppProvider";
import { FoodDetailPage } from "./pages/FoodDetailPage";
import HomePage from "./pages/HomePages";
import { LoginPage } from "./pages/LoginPage";
import { MenuPage } from "./pages/MenuPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { OrderDetailPage } from "./pages/OrderDetailPage";
import { OrderPage } from "./pages/OrderPage";
import { ShopDetailPage } from "./pages/ShopDetailPage";
import { ViewAllProductCatePage } from "./pages/ViewAllProductCatePage";
import { ViewAllProductStorePage } from "./pages/ViewAllProductStorePage";
import "./util.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MessengerCustomerChat from "react-messenger-customer-chat/lib/MessengerCustomerChat";
function App() {
    const { productItems } = Data;
    const { shopItems } = Pdata;
    const { setMobileMode, isOpenDrawer, setIsOpenDrawer, isCartMain, menu } = useContext(AppContext);
    useEffect(() => {
        function handleResize() {
            if (window.innerWidth <= 700) {
                setMobileMode(true);
            } else {
                setMobileMode(false);
            }
        }
        let vh = window.innerHeight * 0.01;

        document.documentElement.style.setProperty("--vh", `${vh}px`);

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [setMobileMode]);
    console.log("load", isCartMain);
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
    console.log({ menu });
    const toggleDrawer = () => {
        setIsOpenDrawer((prevState) => !prevState);
    };

    return (
        <div className="root center_flex">
            <MessengerCustomerChat pageId="100083337097834" appId="437264958531394" />,
            <div className="logo-backround">
                <img style={{ width: "100%", height: "100%", objectFit: "contain" }} src="/images/logo.jpg" alt="" />
            </div>
            <div className="main" id="main">
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

                    <Route path="/menu/:id" exact>
                        <MenuPage />
                    </Route>

                    {/* <Route path="/categories/:id" exact>
                    <HomePage productItems={productItems} />
                </Route> */}
                    <Route path="/menu/:menu/store/:store" exact>
                        <ViewAllProductStorePage />
                    </Route>
                    <Route path="/menu/:menu/cate/:cate" exact>
                        <ViewAllProductCatePage />
                    </Route>
                    <Route path="/order" exact>
                        <OrderPage />
                    </Route>
                    <Route path="/order/:order" exact>
                        <OrderDetailPage />
                    </Route>
                    <Route path="/menu/:menuId/:id" exact>
                        <FoodDetailPage />
                    </Route>
                    <Route path="/shop-detail" exact>
                        <ShopDetailPage shopItems={shopItems} />
                    </Route>
                    <Route path="/checkout" exact>
                        <Cart />
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
