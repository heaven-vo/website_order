import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppProvider";
import { TabMenu } from "./TabMenu";
import { TabMenuOrder } from "./TabMenuOrder";

const Navbar = () => {
    // Toogle Menu
    const { mobileMode, isHeaderOrder, isHeader } = useContext(AppContext);
    const [MobileMenu, setMobileMenu] = useState(false);
    return (
        <>
            <div className="header boxShadow">
                <div className="container d_flex">
                    {/* <div className='catgrories d_flex'>
            <span className='fa-solid fa-border-all'></span>
            <h4>
              Categories <i className='fa fa-chevron-down'></i>
            </h4>
          </div> */}

                    {!isHeaderOrder ? (
                        <div className="" style={{ width: "100%" }}>
                            {!mobileMode && isHeader && (
                                <div className="container-mobile" style={{ justifyContent: "center", borderTop: "1px solid rgb(240,240,240)", padding: 0 }}>
                                    <TabMenu />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="" style={{ width: "100%" }}>
                            <div className="container-mobile cusor" style={{ justifyContent: "center", borderTop: "1px solid rgb(240,240,240)", padding: 0 }}>
                                <TabMenuOrder />
                            </div>
                        </div>
                    )}

                    
                </div>
            </div>
        </>
    );
};

export default Navbar;
