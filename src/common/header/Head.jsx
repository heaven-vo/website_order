import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Rodal from "rodal";
import Select from "react-select";
import { AppContext } from "../../context/AppProvider";
import { useContext } from "react";
import { useEffect } from "react";
import { LOCALSTORAGE_USER_NAME } from "../../constants/Variable";
const Head = () => {
    const { userInfo, setUserInfo, setVisiblePopupInfo, visiblePopupInfo, mobileMode, menu, setMenu, buildings } = useContext(AppContext);
    // const [visible, setVisible] = useState(false);
    const [fullName, setFullName] = useState("ok");
    const [phone, setPhone] = useState("");
    const [building, setBuilding] = useState("");
    const [user, setUser] = useState({});
    // const [isValid, setIsValid] = useState(false);
    const [isValidFullName, setIsValidFullname] = useState(false);
    const [isValidPhone, setIsValidPhone] = useState(false);
    const [isValidBuilding, setIsValidBuilding] = useState(false);
    let history = useHistory();

    useEffect(() => {
        setUser(userInfo);
        setFullName(userInfo.fullName || "");
        setPhone(userInfo.phone || "");
        setBuilding(userInfo.building || "");
        setMenu(0);
    }, [setMenu, userInfo]);
    const options = buildings.map((building) => {
        return { value: building.id, label: building.name };
    });

    useEffect(() => {
        if (!visiblePopupInfo) {
            document.body.style.overflow = "auto";
            document.body.style.touchAction = "auto";
        } else {
            document.body.style.overflow = "hidden";
            document.body.style.touchAction = "none";
        }
        return () => {};
    }, [visiblePopupInfo]);
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
            if (menu === 1 || menu === 2 || menu === 3) {
                history.push(`/menu/${menu}`);
            }
        }
    };
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
            <section className="search container ">
                <div className="container f_flex " style={{ padding: "10px 10px 10px 10px", flexDirection: "column" }}>
                    <div style={{ padding: "0 0 5px 0", color: "#000", fontWeight: 600 }}>
                        <span>Giao đến:</span>
                    </div>
                    <div className="search-box f_flex">
                        <i class="fa-solid fa-location-dot" style={{ color: "var(--primary)" }}></i>
                        <input
                            type="text"
                            placeholder="Nhập địa chỉ giao hàng"
                            onClick={() => setVisiblePopupInfo(true)}
                            disabled={visiblePopupInfo}
                            value={user.building?.label || ""}
                            readOnly={true}
                            style={{ borderTopRightRadius: "50%", borderBottomRightRadius: "50%", cursor: "pointer" }}
                        />
                    </div>
                    <div className="header-home-container">
                        <div className="heaader-home-img">
                            <img src="/images/home.png" alt="" />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "start" }}>
                            <span>VinGP Deliver </span>

                            <p>Nền tảng giao hàng nội khu Vinhomes Grand Park </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Head;
