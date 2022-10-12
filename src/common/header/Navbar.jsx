import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Rodal from "rodal";
import { LOCALSTORAGE_USER_NAME } from "../../constants/Variable";
import { AppContext } from "../../context/AppProvider";
import { TabMenuOrder } from "./TabMenuOrder";
import Select from "react-select";

const Navbar = () => {
    // Toogle Menu
    const { userInfo, setIsOpenDrawer, headerInfo, isHeaderOrder, setVisiblePopupInfo, visiblePopupInfo, setUserInfo, mobileMode, buildings } = useContext(AppContext);
    // const [MobileMenu, setMobileMenu] = useState(false);
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [building, setBuilding] = useState("");
    const [user, setUser] = useState({});
    // const [isValid, setIsValid] = useState(false);
    const [isValidFullName, setIsValidFullname] = useState(false);
    const [isValidPhone, setIsValidPhone] = useState(false);
    const [isValidBuilding, setIsValidBuilding] = useState(false);
    let history = useHistory();
    const openDrawer = () => {
        setIsOpenDrawer(true);
        document.body.style.overflow = "hidden";
        document.body.style.touchAction = "none";
    };
    useEffect(() => {
        setUser(userInfo);
        setFullName(userInfo.fullName || "");
        setPhone(userInfo.phone || "");
        setBuilding(userInfo.building || "");
    }, [userInfo]);
    const handleSubmit = () => {
        console.log(building);
        let isValid = true;
        if (fullName.length === 0 || phone.length === 0 || !building?.value) {
            isValid = false;
        }
        if (!fullName && fullName.length === 0) {
            setIsValidFullname(true);
        } else {
            setIsValidFullname(false);
        }
        if (!phone && phone.length === 0) {
            setIsValidPhone(true);
        } else {
            setIsValidPhone(false);
        }
        if (!building && building.length === 0) {
            setIsValidBuilding(true);
        } else {
            setIsValidBuilding(false);
        }
        if (isValid) {
            setVisiblePopupInfo(false);
            if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_USER_NAME))) {
                localStorage.setItem(LOCALSTORAGE_USER_NAME, JSON.stringify([]));
                setUserInfo({});
            } else {
                localStorage.setItem(LOCALSTORAGE_USER_NAME, JSON.stringify({ fullName, phone, building }));
                setUserInfo({ fullName, phone, building });
            }
        }
    };
    const options = buildings.map((building) => {
        return { value: building.id, label: building.name };
    });
    return (
        <>
            <Rodal
                height={isValidFullName || isValidPhone || isValidBuilding ? 450 : 390}
                width={mobileMode ? 350 : 400}
                visible={visiblePopupInfo}
                onClose={() => {
                    setVisiblePopupInfo(false);
                    // setIsValid(true);
                    setIsValidBuilding(false);
                    setIsValidFullname(false);
                    setIsValidPhone(false);
                }}
                style={{ borderRadius: 10 }}
            >
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                    <div>
                        <div style={{ borderBottom: "1px solid rgb(220,220,220)", paddingBottom: "10px" }}>
                            <span style={{ fontSize: 16, fontWeight: 700 }}>Nơi nhận</span>
                        </div>
                        <div style={{ padding: "10px 0 10px 0" }}>
                            <span style={{ fontSize: 16, fontWeight: 700 }}>Building (Tòa nhà)</span>
                        </div>
                        <Select options={options} placeholder="Tòa nhà" onChange={(e) => setBuilding(e)} value={building} />
                        {isValidBuilding && (
                            <div className="input-validate">
                                <span>Địa chỉ không được để trống</span>
                            </div>
                        )}
                        <div style={{ padding: "10px 0 10px 0" }}>
                            <span style={{ fontSize: 16, fontWeight: 700 }}>Tên người nhận</span>
                        </div>
                        <div style={{ width: " 100%" }}>
                            <input
                                onChange={(e) => {
                                    setFullName(e.target.value);
                                }}
                                value={fullName}
                                type="text"
                                style={{ border: "1px solid rgb(200,200,200)", width: " 100%", borderRadius: 4, padding: "10px 10px", lineHeight: "1rem", fontSize: "1rem" }}
                            />
                        </div>
                        {isValidFullName && (
                            <div className="input-validate">
                                <span>Tên không được để trống</span>
                            </div>
                        )}
                        <div style={{ padding: "10px 0 10px 0" }}>
                            <span style={{ fontSize: 16, fontWeight: 700 }}>Số điện thoại nhận hàng</span>
                        </div>
                        <div style={{ width: " 100%" }}>
                            <input
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                }}
                                value={phone}
                                type="number"
                                style={{ border: "1px solid rgb(200,200,200)", width: " 100%", borderRadius: 4, padding: "10px 10px", lineHeight: "1rem", fontSize: "1rem" }}
                            />
                        </div>
                        {isValidPhone && (
                            <div className="input-validate">
                                <span>Số điện thoại không được để trống</span>
                            </div>
                        )}
                    </div>
                    <div className="f_flex" style={{ width: " 100%", justifyContent: "space-between", paddingTop: 25, gap: 15 }}>
                        <button
                            style={{ flex: 1, padding: 18, fontSize: "1rem", cursor: "pointer", fontWeight: 700, borderRadius: 10 }}
                            onClick={(e) => {
                                e.preventDefault();
                                setVisiblePopupInfo(false);
                            }}
                        >
                            Đóng
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                handleSubmit();
                            }}
                            style={{ flex: 1, padding: 18, fontSize: "1rem", cursor: "pointer", fontWeight: 700, borderRadius: 10, background: "var(--primary)" }}
                        >
                            OK
                        </button>
                    </div>
                </div>
            </Rodal>
            <section className="header-white container ">
                <div className="container header-main" style={{ padding: "10px 15px 10px 15px", display: "flex", justifyContent: "center", alignItems: "self-start", flexDirection: "column" }}>
                    <div className="c_flex" style={{ width: "100%", justifyContent: "space-between" }}>
                        <div className="c_flex header-white-container">
                            <div>
                                <i onClick={() => history.goBack()} className="fa-solid fa-chevron-left header-white-icon-back"></i>
                            </div>
                            <div
                                className="f_flex cusor"
                                style={{ flexDirection: "column", gap: 2 }}
                                onClick={() => {
                                    setVisiblePopupInfo(true);
                                }}
                            >
                                {headerInfo && headerInfo.isSearchHeader ? (
                                    <>
                                        <span style={{ fontSize: 14, marginLeft: 5 }}>Giao đến:</span>
                                        <div className="c_flex">
                                            <div className="header-white-img">
                                                <img src="/images/location.png" alt="" />
                                            </div>
                                            <h4 className="header-white-building">{userInfo.building?.label}, Vinhomes Grand Park</h4>
                                        </div>
                                    </>
                                ) : (
                                    <div style={{ padding: 10 }}>
                                        <h4 style={{ fontSize: 18 }}>{headerInfo.title}</h4>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <i
                                className="fas fa-bars"
                                onClick={() => {
                                    openDrawer();
                                }}
                                style={{ fontSize: 25, color: "#000", flex: 1 }}
                            ></i>
                        </div>
                    </div>
                    {headerInfo && headerInfo.isSearchHeader && (
                        <div className="search-header f_flex" style={{ width: " 100%" }}>
                            <i class="fa-solid fa-magnifying-glass"></i>
                            <input
                                onChange={(e) => {}}
                                // value={phone}
                                type="text"
                                style={{ width: " 100%", borderRadius: 4, padding: "8px 10px", lineHeight: "1rem", fontSize: "1rem" }}
                            />
                        </div>
                    )}
                </div>
                {isHeaderOrder && (
                    <div
                        className={`container-mobile tab-menu-mobile search `}
                        style={{
                            justifyContent: "center",
                            borderTop: "1px solid rgb(240,240,240)",
                            padding: 0,
                        }}
                    >
                        <TabMenuOrder />
                    </div>
                )}
            </section>
        </>
    );
};

export default Navbar;
