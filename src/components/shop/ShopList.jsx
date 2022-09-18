import React from "react";

import Sdata from "./Sdata";
import { ShopCategory } from "./ShopCategory";
export const ShopList = () => {
    return (
        <>
            <ShopCategory data={Sdata} title={"Cửa Hàng"} />
            <ShopCategory data={Sdata} title={"Chuyên Thịt"} />
            <ShopCategory data={Sdata} title={"Chuyên Hải Sản Tươi Sống"} />
            <ShopCategory data={Sdata} title={"Tiệm Bánh"} />
        </>
    );
};
