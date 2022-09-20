import React, { useState } from "react";
import Pdata from "../components/products/Pdata";
import { ProductGrid } from "../components/products/ProductGrid";

export const MenuPage = () => {
    const [isActive, setIsActive] = useState(1);
    const menus = [
        {
            menuId: 1,
            menuName: "HOT DEAL",
            menuImg: "",
        },
        {
            menuId: 2,
            menuName: "Điểm Tâm Sáng",
            menuImg: "",
        },
        {
            menuId: 3,
            menuName: "Hôm Nay Ăn Gì?",
            menuImg: "",
        },
    ];
    const { shopItems } = Pdata;
    return (
        <>
            <section className="shop background">
                {/* <div className="container d_flex">
                    <div className="f_flex" style={{ gap: 20}}>
                        {menus.map((item) => {
                            return (
                                <div className={`${isActive === item.menuId ? "menu-item-active" : "menu-item "} cusor center_flex category-item`} onClick={() => setIsActive(item.menuId)}>
                                    <span>{item.menuName}</span>
                                </div>
                            );
                        })}
                    </div>
                </div> */}
                <div className="container d_flex category-list category-list-menu" style={{ marginBottom: 25 }}>
                            <div className="f_flex" style={{ gap: 20,  }}>
                                {menus.map((item) => {
                                    return (
                                        <div
                                            className={`${isActive === item.menuId ? "menu-item-active" : "menu-item "} cusor center_flex category-item`}
                                            style={{  }}
                                            onClick={() => setIsActive(item.menuId)}
                                        >
                                            <span>{item.menuName}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                <div className="container d_flex" style={{ marginTop: 30 }}>
                    <div className="c_flex" style={{ gap: 10, flexWrap: "wrap" }}>
                        <i class="fa-solid fa-filter"></i>
                        <span>Bộ Lọc</span>
                        <div style={{ justifyContent: "space-between", width: 230 }} className="f_flex dropdown">
                            <div className="c_flex" style={{ border: "1px solid rgb(220,220,220)", width: "100%", padding: "7px 20px" }}>
                                <div className="c_flex" style={{ gap: 8 }}>
                                    <i class="fa-solid fa-arrow-down-a-z"></i>
                                    <span>Sắp Xếp</span>
                                </div>
                                <i class="fa-sharp fa-solid fa-sort-down"></i>
                            </div>

                            <div className="dropdown-list"></div>
                        </div>
                    </div>
                </div>

                <ProductGrid data={shopItems} />
            </section>
        </>
    );
};
