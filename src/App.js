import { Route, Switch } from "react-router-dom";
import "./App.css";
import Cart from "./common/Cart/Cart";
import Footer from "./common/footer/Footer";
import Header from "./common/header/Header";
import Data from "./components/Data";
import Pdata from "./components/products/Pdata";
import { FoodDetailPage } from "./pages/FoodDetailPage";
import FoodPage from "./pages/FoodPage";
import HomePage from "./pages/HomePages";
import { MenuPage } from "./pages/MenuPage";
import { ShopDetailPage } from "./pages/ShopDetailPage";
import { ShopPage } from "./pages/ShopPage";

function App() {
    const { productItems } = Data;
    const { shopItems } = Pdata;

    return (
        <>
            <Header />
            <Switch>
                <Route path="/" exact>
                    <HomePage productItems={productItems} shopItems={shopItems} />
                </Route>
                <Route path="/menu" exact>
                    <MenuPage/>
                </Route>
                <Route path="/food" exact>
                    <FoodPage shopItems={shopItems} />
                </Route>
                <Route path="/shop" exact>
                    <ShopPage />
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
            </Switch>
            <Footer />
        </>
    );
}

export default App;
