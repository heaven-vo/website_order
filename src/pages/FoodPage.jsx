import React from "react";
import Product from "../components/products/Product";

const FoodPage = ({shopItems, addToCart}) => {
    return (
        <>
            <Product shopItems={shopItems} addToCart={addToCart} />
        </>
    );
};

export default FoodPage;
