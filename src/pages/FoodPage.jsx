import React from "react";
import Product from "../components/products/Product";

const FoodPage = ({shopItems, }) => {
    return (
        <>
            <Product shopItems={shopItems}  />
        </>
    );
};

export default FoodPage;
