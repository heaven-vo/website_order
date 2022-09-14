import React from "react";
import Shop from "../components/shops/Shop";

const FoodPage = ({shopItems, addToCart}) => {
    return (
        <>
            <Shop shopItems={shopItems} addToCart={addToCart} />
        </>
    );
};

export default FoodPage;
