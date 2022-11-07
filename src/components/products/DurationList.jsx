import React from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { LOCALSTORAGE_MODE } from "../../constants/Variable";
import { AppContext } from "../../context/AppProvider";

const DurationList = ({ data }) => {
    const { mobileMode, setMenuIdProvider, setDeliveryDate } = useContext(AppContext);
    let history = useHistory();

    return (
        data.length > 0 &&
        data.map((item, ind) => {
            if (item.listProducts.length > 0) {
                return (
                    <>
                        <div key={ind} style={{ width: "100%", padding: "25px 15px 10px 15px", background: "rgb(246, 249, 252)" }} className="c_flex">
                            <div
                                className="center_flex duration-title"
                                onClick={() => {
                                    localStorage.setItem(LOCALSTORAGE_MODE, JSON.stringify("3"));
                                    setMenuIdProvider(item.id);
                                    setDeliveryDate(item.name);
                                    history.push(`/mode/${"3"}/schedule`, { day: item.id, menuName: item.name });
                                }}
                            >
                                <span className="duration-title">{item.name}</span>
                                <i className="fa-solid fa-chevron-right " style={{ fontSize: 14, marginTop: 2, marginLeft: 15 }}></i>
                            </div>
                            {mobileMode && (
                                <div
                                    onClick={() => {
                                        localStorage.setItem(LOCALSTORAGE_MODE, JSON.stringify("3"));
                                        setMenuIdProvider(item.id);
                                        setDeliveryDate(item.name);
                                        history.push(`/mode/${"3"}/schedule`, { day: item.id });
                                    }}
                                >
                                    <span className="view-all-btn" style={{ fontSize: 15, fontWeight: 500, color: "rgb(150,150,150)" }}>
                                        Xem thêm
                                    </span>
                                </div>
                            )}
                        </div>
                        <div style={{ display: "flex", width: "100%" }}>
                            <div style={{ backgroundColor: "#fff" }} className="duration-grid">
                                {item.listProducts.length > 0 &&
                                    item.listProducts.map((pro, index) => {
                                        let limit = mobileMode ? 3 : 5;
                                        if (index < limit) {
                                            return (
                                                <div
                                                    key={index}
                                                    className="duration-product"
                                                    onClick={() => {
                                                        setMenuIdProvider(item.id);
                                                        setDeliveryDate(item.name);
                                                        history.push(`/mode/3/product/${pro.id}`);
                                                    }}
                                                >
                                                    <img src={pro.image} alt="" />
                                                    <span className="max-line-1" style={{ fontWeight: 500, cursor: "pointer", marginTop: 5, fontSize: 12, color: "rgb(102, 102, 102)" }}>
                                                        {pro.storeName}
                                                    </span>
                                                    <span className="duration-product-name" style={{}}>
                                                        {pro.name}
                                                    </span>
                                                    <span className="duration-product-price">{pro.pricePerPack.toLocaleString()}₫</span>
                                                </div>
                                            );
                                        }
                                    })}
                            </div>
                            {!mobileMode && item.listProducts.length > 4 && (
                                <div className="view-all-btn">
                                    <div className="center_flex " style={{ flexDirection: "column", height: 160, gap: 10, marginRight: 15 }}>
                                        <div
                                            className="center_flex cusor view-all-btn"
                                            onClick={() => {
                                                localStorage.setItem(LOCALSTORAGE_MODE, JSON.stringify("3"));
                                                setMenuIdProvider(item.id);
                                                setDeliveryDate(item.name);
                                                history.push(`/mode/${"3"}/schedule`, { day: item.id });
                                            }}
                                            style={{ borderRadius: 50, border: "1px solid rgb(220,220,220)", width: 45, height: 45 }}
                                        >
                                            <i className="fa-solid fa-chevron-right" style={{ fontSize: 18 }}></i>
                                        </div>
                                        <span
                                            onClick={() => {
                                                // history.push(`/mode/${mode}/${filtter}/${cateId}`);
                                            }}
                                            className="cusor"
                                            style={{ fontSize: 14 }}
                                        >
                                            Xem thêm
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                );
            }
        })
    );
};

export default DurationList;
