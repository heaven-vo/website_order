import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Rodal from "rodal";
import Select from "react-select";
import { AppContext } from "../../context/AppProvider";
import { useContext } from "react";
import { useEffect } from "react";
import { LOCALSTORAGE_USER_NAME } from "../../constants/Variable";
import { getApartment } from "../../apis/apiService";
const Head = () => {
    const { userInfo, setUserInfo, setVisiblePopupInfo, visiblePopupInfo, mobileMode, menu, setMenu, buildings, setIsOpenDrawer, areaProvider } = useContext(AppContext);
    // const [visible, setVisible] = useState(false);
    const [fullName, setFullName] = useState("ok");
    const [phone, setPhone] = useState("");
    const [building, setBuilding] = useState("");
    const [area, setArea] = useState("");
    const [apartment, setApartment] = useState("");
    const [apartmentList, setApartmentList] = useState([]);
    const [buldingList, setBuldingList] = useState([]);
    const [user, setUser] = useState({});
    // const [isValid, setIsValid] = useState(false);
    const [isValidFullName, setIsValidFullname] = useState(false);
    const [isValidPhone, setIsValidPhone] = useState(false);
    const [isValidBuilding, setIsValidBuilding] = useState(false);
    const [isValidArea, setIsValidArea] = useState(false);
    const [isValidApartment, setIsValidApartment] = useState(false);
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
        setApartment(userInfo.apartment || "");
        setArea(userInfo.area || "");
        setMenu(0);
    }, [setMenu, userInfo]);
    useEffect(() => {
        if (area) {
            getApartment(area.value)
                .then((res) => {
                    if (res.data) {
                        const apart = res.data;
                        setApartmentList(apart.listCluster);
                        if (apartment) {
                            for (let index = 0; index < apart.listCluster.length; index++) {
                                const element = apart.listCluster[index];
                                if (element.id === apartment.value) {
                                    setBuldingList(element.listBuilding);
                                }
                            }
                        }
                    } else {
                        setApartmentList([]);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setApartmentList([]);
                });
        }
    }, [apartment, area]);

    const optionsBuilding = buldingList.map((building) => {
        return { value: building.id, label: building.name };
    });
    const optionsApartment = apartmentList.map((building) => {
        return { value: building.id, label: building.name };
    });
    const optionArea = areaProvider.map((area) => {
        return { value: area.id, label: area.name };
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
        if (!apartment && apartment.length === 0) {
            setIsValidApartment(true);
        } else {
            setIsValidApartment(false);
        }
        if (!area && area.length === 0) {
            setIsValidArea(true);
        } else {
            setIsValidArea(false);
        }
        if (isValid) {
            setVisiblePopupInfo(false);
            if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_USER_NAME))) {
                localStorage.setItem(LOCALSTORAGE_USER_NAME, JSON.stringify([]));
                setUserInfo({});
            } else {
                localStorage.setItem(LOCALSTORAGE_USER_NAME, JSON.stringify({ fullName, phone, building, area, apartment }));
                setUserInfo({ fullName, phone, building, area, apartment });
            }
            if (menu === 1 || menu === 2 || menu === 3) {
                history.push(`/menu/${menu}`);
            }
        }
    };
    return (
        <>
            <Rodal
                height={isValidFullName || isValidPhone || isValidBuilding || isValidApartment || isValidArea ? 650 : 590}
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
                            <span style={{ fontSize: 16, fontWeight: 700 }}>Khu vực</span>
                        </div>
                        <Select
                            options={optionArea}
                            placeholder="Khu vực"
                            onChange={(e) => {
                                setArea(e);
                                setApartment("");
                                setBuilding("");
                            }}
                            value={area}
                        />
                        {isValidArea && (
                            <div className="input-validate">
                                <span>Khu vực không được để trống</span>
                            </div>
                        )}
                        <div style={{ padding: "10px 0 10px 0" }}>
                            <span style={{ fontSize: 16, fontWeight: 700 }}>Cụm tòa nhà</span>
                        </div>
                        <Select
                            options={optionsApartment}
                            placeholder="Tòa nhà"
                            onChange={(e) => {
                                setApartment(e);
                                setBuilding("");
                                for (let index = 0; index < apartmentList.length; index++) {
                                    const element = apartmentList[index];
                                    if (element.id === e.value) {
                                        setBuldingList(element.listBuilding);
                                    }
                                }
                            }}
                            value={apartment}
                        />
                        {isValidApartment && (
                            <div className="input-validate">
                                <span>Cụm tòa nhà không được để trống</span>
                            </div>
                        )}
                        <div style={{ padding: "10px 0 10px 0" }}>
                            <span style={{ fontSize: 16, fontWeight: 700 }}>Building (Tòa nhà)</span>
                        </div>
                        <Select options={optionsBuilding} placeholder="Tòa nhà" onChange={(e) => setBuilding(e)} value={building} />
                        {isValidBuilding && (
                            <div className="input-validate">
                                <span>Tòa nhà không được để trống</span>
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
                <div className="container f_flex " style={{ padding: "15px", flexDirection: "column" }}>
                    <div style={{ padding: "0 0 5px 0", color: "#000", fontWeight: 600 }}>
                        <span>Giao đến:</span>
                    </div>
                    <div className="c_flex" style={{ gap: 20 }}>
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
                        <div>
                            <i
                                className="fas fa-bars cusor"
                                onClick={() => {
                                    openDrawer();
                                }}
                                style={{ fontSize: 25, color: "#fff", flex: 1 }}
                            ></i>
                        </div>
                    </div>
                    <div className="header-home-container">
                        <div className="heaader-home-img">
                            <img src="/images/home.png" alt="" />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "start" }}>
                            <span style={{ textTransform: "uppercase" }}>Cộng Đồng Chung Cư </span>

                            <p>Dịch vụ tiện ích giao hàng tận nơi cho cư dân </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Head;
