import { useContext, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import "./util.css";
import "../src/pages/responsive.css";
import Cart from "./common/Cart/Cart";
import Footer from "./common/footer/Footer";
import Header from "./common/header/Header";
import Data from "./components/Data";
import Pdata from "./components/products/Pdata";
import { AppContext } from "./context/AppProvider";
import { FoodDetailPage } from "./pages/FoodDetailPage";
import FoodPage from "./pages/FoodPage";
import HomePage from "./pages/HomePages";
import { MenuPage } from "./pages/MenuPage";
import { ShopDetailPage } from "./pages/ShopDetailPage";
import { ShopPage } from "./pages/ShopPage";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { DrawerContent } from "./common/header/Drawer";
import { CheckoutPage } from "./pages/CheckoutPage";
import { LoginPage } from "./pages/LoginPage";
import { OrderPage } from "./pages/OrderPage";

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
                {/* <Route path="/food" exact>
                    <FoodPage shopItems={shopItems} />
                </Route> */}
                <Route path="/order" exact>
                    <OrderPage />
                </Route>
                <Route path="/food-detail" exact>
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
            </Switch>
            <Footer />
        </>
    );
}

export default App;
