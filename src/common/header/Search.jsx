import React, { useContext } from "react";
import logo from "../../components/assets/images/logo.svg";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppProvider";

const Search = ({}) => {
    // fixed Header
    const { Cart, mobileMode, setIsOpenDrawer } = useContext(AppContext);
    window.addEventListener("scroll", function () {
        const search = document.querySelector(".search");
        search.classList.toggle("active", window.scrollY > 100);
    });
    const openDrawer = () => {
        setIsOpenDrawer(true);
        document.body.style.overflow = "hidden";
        document.body.style.touchAction = "none";
    };
    return (
        <>
            <section className="search">
                <div className="container c_flex" style={{ padding: "0 10px" }}>
                    <div className="logo width c_flex" style={{ gap: 16 }}>
                        {mobileMode && (
                            <i
                                className="fas fa-bars"
                                onClick={() => {
                                    openDrawer();
                                }}
                                style={{ fontSize: 25 }}
                            ></i>
                        )}
                        <img src={logo} alt="" />
                    </div>

                    <div className="search-box f_flex">
                        <i className="fa fa-search"></i>
                        <input type="text" placeholder="Tìm kiếm..." style={{ borderTopRightRadius: "50%", borderBottomRightRadius: "50%" }} />
                        {/* <span>All Category</span> */}
                    </div>

                    <div className="icon f_flex width">
                        <div className="cart icon-search">
                            <Link to="/cart">
                                <i className="fa fa-search icon-circle"></i>
                            </Link>
                        </div>
                        <div className="cart">
                            <Link to="/cart">
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
            </section>
        </>
    );
};

export default Search;
