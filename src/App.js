import { useContext, useEffect } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import "../src/pages/responsive.css";
import Cart from "./common/Cart/Cart";
import Footer from "./common/footer/Footer";
import { DrawerContent } from "./common/header/Drawer";
import Header from "./common/header/Header";
import Data from "./components/Data";
import Pdata from "./components/products/Pdata";
import { AppContext } from "./context/AppProvider";
import { CheckoutPage } from "./pages/CheckoutPage";
import { FoodDetailPage } from "./pages/FoodDetailPage";
import HomePage from "./pages/HomePages";
import { LoginPage } from "./pages/LoginPage";
import { MenuPage } from "./pages/MenuPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { OrderPage } from "./pages/OrderPage";
import { ShopDetailPage } from "./pages/ShopDetailPage";
import { ViewAllProductCatePage } from "./pages/ViewAllProductCatePage";
import { ViewAllProductStorePage } from "./pages/ViewAllProductStorePage";
import "./util.css";
import { OrderDetailPage } from "./pages/OrderDetailPage";

function App() {
    const { productItems } = Data;
    const { shopItems } = Pdata;
    const { setMobileMode, isOpenDrawer, setIsOpenDrawer, isHeader, mobileMode } = useContext(AppContext);
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

    const toggleDrawer = () => {
        setIsOpenDrawer((prevState) => !prevState);
    };

    return (
        <>
            <Header />
            <Drawer size={300} open={isOpenDrawer} onClose={toggleDrawer} zIndex={9999} direction="left" className="drawer__container">
                <DrawerContent />
            </Drawer>
            <Switch>
                <Route path="/" exact>
                    <MenuPage />
                </Route>
                <Route path="/login" exact>
                    <LoginPage />
                </Route>
                <Route path="/menu" exact>
                    <HomePage productItems={productItems} shopItems={shopItems} />
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
                <Route path="/menu/:id" exact>
                    <FoodDetailPage />
                </Route>
                <Route path="/shop-detail" exact>
                    <ShopDetailPage shopItems={shopItems} />
                </Route>
                <Route path="/cart" exact>
                    <Cart />
                </Route>
                <Route path="/checkout" exact>
                    <CheckoutPage />
                </Route>
                <Route path="*">
                    <NotFoundPage />
                </Route>
            </Switch>
            <Footer />
        </>
    );
}

export default App;
