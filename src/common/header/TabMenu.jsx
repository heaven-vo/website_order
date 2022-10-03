import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../context/AppProvider";
export const TabMenu = () => {
    const [tab, setTab] = useState(1);
    const { setMenu, menu } = useContext(AppContext);
    const tabList = [
        {
            tabName: "Đặt Món",
            id: 1,
            img: "./images/icons/datmon.png",
            imgActive: "./images/icons/datmon-active.png",
        },
        {
            tabName: "Đi Chợ",
            id: 2,
            img: "./images/icons/dicho.png",
            imgActive: "./images/icons/dicho-active.png",
        },
        {
            tabName: "Đặt Hàng",
            id: 3,
            img: "./images/icons/dathang.png",
            imgActive: "./images/icons/dathang-active.png",
        },
    ];
    let history = useHistory();
    const changeMenu = (id) => {
        setMenu(id);
        setTab(id);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    };
    return (
        <>
            <div className="tab center_flex">
                {tabList.map((item) => {
                    return (
                        <div className={`tab-item center_flex ${item.id === menu && "tab-active"}`} onClick={() => changeMenu(item.id)}>
                            <div className="c_flex" style={{ flexDirection: "column", gap: 2 }}>
                                <div style={{ width: 45, height: 45 }}>
                                    {tab === item.id ? (
                                        <img src={item.imgActive} alt="" style={{ width: "100%", objectFit: "cover", color: "#fff" }} />
                                    ) : (
                                        <img src={item.img} alt="" style={{ width: "100%", objectFit: "cover", color: "#fff" }} />
                                    )}
                                </div>
                                <span>{item.tabName}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};
