import React from "react";
import "./style.css";
const ShopList = ({ data }) => {
    return (
        <>
            <div className="product-list-wrapper" style={{ paddingTop: 15, paddingBottom: 100 }}>
                <div className=" c_flex" style={{ padding: "0px 15px", alignItems: "self-start", flexDirection: "column" }}>
                    {data.length > 0 &&
                        data.map((item, index) => {
                            let isBorderBottom = true;
                            if (index === 0 || index === data.length - 1) {
                                isBorderBottom = false;
                            }
                            return (
                                <div className="shop-item-wrapper f_flex">
                                    <div className="shop-item">
                                        <img src={"https://cdn.cet.edu.vn/wp-content/uploads/2018/03/bun-thit-nuong-kieu-mien-nam.jpg"} alt="" />
                                    </div>
                                    <div className="f_flex" style={{ flexDirection: "column", gap: 5 }}>
                                        <span className="shop-item-title">Quán ốc cô Bảy</span>
                                        <span className="shop-item-building">Tòa S703</span>
                                        <span className="shop-item-category">Trà sữa - ăn vặt</span>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </>
    );
};

export default ShopList;
