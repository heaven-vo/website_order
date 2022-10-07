import React, { useContext, useState } from "react";
import logo from "../../components/assets/images/logo.svg";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppProvider";
import { TabMenu } from "./TabMenu";
import { TabMenuOrder } from "./TabMenuOrder";
import { useEffect } from "react";

const Search = () => {
    // fixed Header
    const { Cart, mobileMode, isHeader, setIsOpenDrawer, isHeaderOrder } = useContext(AppContext);
    const [isMenu, setIsmenu] = useState(false);
    const [ScrollUp, setScrollUp] = useState(false);

    // useEffect(() => {
    //     var scrollBefore = 0;
    //     window.addEventListener("scroll", function (e) {
    //         // console.log(mobileMode);
    //         if (!mobileMode) {
    //             const search = document.querySelector(".search");
    //             search.classList.toggle("active", window.scrollY > 300);
    //         }
    //         // } else if (mobileMode) {
    //         //     if (window.scrollY > 200) {
    //         //         setIsmenu(true);
    //         //     } else {
    //         //         setIsmenu(false);
    //         //     }
    //         // }
    //         const scrolled = window.scrollY;
    //         if (scrollBefore > scrolled) {
    //             // console.log("ScrollUP");
    //             scrollBefore = scrolled;
    //             setScrollUp(true);
    //             //Desired action
    //         } else {
    //             scrollBefore = scrolled;
    //             // console.log("ScrollDOWN");
    //             setScrollUp(false);
    //             //Desired action
    //         }
    //         if (window.scrollY > 300) {
    //             setIsmenu(true);
    //         } else {
    //             setIsmenu(false);
    //         }
    //     });
    //     return () => {};
    // }, []);

    const openDrawer = () => {
        setIsOpenDrawer(true);
        document.body.style.overflow = "hidden";
        document.body.style.touchAction = "none";
    };
    return (
        <>
            <section className="search container ">
                <div className="container c_flex header-main" style={{ padding: "15px 10px 10px 10px" }}>
                    <div className="logo width c_flex" style={{ gap: 16 }}>
                        {mobileMode && (
                            <i
                                className="fas fa-bars"
                                onClick={() => {
                                    openDrawer();
                                }}
                                style={{ fontSize: 25, color: "#000" }}
                            ></i>
                        )}
                        {/* <img src={logo} alt="" /> */}
                        <Link to="/">
                            <h1 style={{ color: "#000", fontWeight: 800 }}>VinhomeGP</h1>
                        </Link>
                    </div>

                    <div className="search-box f_flex">
                        <i className="fa fa-search"></i>
                        <input type="text" placeholder="Tìm kiếm..." style={{ borderTopRightRadius: "50%", borderBottomRightRadius: "50%" }} />
                    </div>

                    <div className="icon f_flex width">
                        <div className="cart icon-search">
                            <Link to="/cart">
                                <i className="fa fa-search icon-circle"></i>
                            </Link>
                        </div>
                        <div className="cart">
                            <Link to="/order">
                                <i className="fa fa-user icon-circle"></i>
                            </Link>
                        </div>
                        <div className="cart">
                            <Link to="/cart">
                                <i className="fa fa-shopping-bag icon-circle"></i>
                                <span>{Cart.length === 0 ? "0" : Cart.length}</span>
                            </Link>
                        </div>
                    </div>
                </div>
                {!isHeaderOrder && (
                    <>
                        {mobileMode && isHeader && (
                            <div className="container-mobile" style={{ justifyContent: "center", borderTop: "1px solid rgb(240,240,240)", padding: 0 }}>
                                <TabMenu />
                            </div>
                        )}
                        {mobileMode && isHeader && (
                            <>
                                <div className={`menu-active ${!isMenu ? "menu-tranform" : ""}`}>
                                    <div className={`container c_flex header-main `} style={{ padding: "15px 10px 15px 10px", backgroundColor: "var(--primary)", zIndex: 999 }}>
                                        <div className="logo width c_flex" style={{ gap: 16 }}>
                                            {mobileMode && (
                                                <i
                                                    className="fas fa-bars"
                                                    onClick={() => {
                                                        openDrawer();
                                                    }}
                                                    style={{ fontSize: 25, color: "#000" }}
                                                ></i>
                                            )}
                                            {/* <img src={logo} alt="" /> */}
                                            <Link to="/">
                                                <h1 style={{ color: "#000", fontWeight: 800 }}>VinhomeGP</h1>
                                            </Link>
                                        </div>

                                        <div className="search-box f_flex">
                                            <i className="fa fa-search"></i>
                                            <input type="text" placeholder="Tìm kiếm..." style={{ borderTopRightRadius: "50%", borderBottomRightRadius: "50%" }} />
                                        </div>

                                        <div className="icon f_flex width">
                                            <div className="cart icon-search">
                                                <Link to="/cart">
                                                    <i className="fa fa-search icon-circle"></i>
                                                </Link>
                                            </div>
                                            <div className="cart">
                                                <Link to="/order">
                                                    <i className="fa fa-user icon-circle"></i>
                                                </Link>
                                            </div>
                                            <div className="cart">
                                                <Link to="/cart">
                                                    <i className="fa fa-shopping-bag icon-circle"></i>
                                                    <span>{Cart.length === 0 ? "0" : Cart.length}</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    {isMenu && (
                                        <div
                                            className={`container-mobile tab-menu-mobile search ${!ScrollUp ? "scrollUp" : ""}`}
                                            style={{
                                                justifyContent: "center",
                                                borderTop: "1px solid rgb(240,240,240)",
                                                padding: 0,
                                                opacity: ScrollUp ? 1 : 0,
                                            }}
                                        >
                                            <TabMenu />
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </>
                )}
            </section>
        </>
    );
};

export default Search;
