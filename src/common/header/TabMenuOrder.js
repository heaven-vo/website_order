import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppProvider";
export const TabMenuOrder = () => {
    const [tab, setTab] = useState(1);
    // const { menuOrder, setMenuOrder } = useContext(AppContext);
    const tabList = [
        {
            tabName: "Chưa Xác Nhận",
            id: 1,
        },
        {
            tabName: "Đang Giao",
            id: 2,
        },
        {
            tabName: "Đã Giao",
            id: 3,
        },
        {
            tabName: "Đã Hủy",
            id: 4,
        },
    ];
    const changeMenu = (id) => {
        // setMenuOrder(id);
        setTab(id);
    };
    return (
        <>
            <div className="tab center_flex">
                {tabList.map((item) => {
                    return (
                        <div className={`tab-item center_flex ${item.id === tab && "tab-active"}`} onClick={() => changeMenu(item.id)}>
                            <div className="c_flex" style={{ flexDirection: "column", gap: 2, }}>
                                <div style={{  height: 40 }} className="center_flex hover-primary">
                                    <span style={{fontSize:13, textAlign:"center"}}>{item.tabName}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};
