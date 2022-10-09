import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../context/AppProvider";
import { TabMenuOrder } from "./TabMenuOrder";

const Navbar = () => {
    // Toogle Menu
    const { userInfo, setIsOpenDrawer, headerInfo, isHeaderOrder } = useContext(AppContext);
    // const [MobileMenu, setMobileMenu] = useState(false);
    let history = useHistory();
    const openDrawer = () => {
        setIsOpenDrawer(true);
        document.body.style.overflow = "hidden";
        document.body.style.touchAction = "none";
    };
    return (
        <>
            <section className="header-white container ">
                <div className="container header-main" style={{ padding: "10px 15px 10px 15px", display: "flex", justifyContent: "center", alignItems: "self-start", flexDirection: "column" }}>
                    <div className="c_flex" style={{ width: "100%", justifyContent: "space-between" }}>
                        <div className="c_flex header-white-container">
                            <div>
                                <i onClick={() => history.goBack()} className="fa-solid fa-chevron-left header-white-icon-back"></i>
                            </div>
                            <div className="f_flex" style={{ flexDirection: "column", gap: 2 }}>
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
