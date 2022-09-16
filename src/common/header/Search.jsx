import React, { useContext } from "react";
import logo from "../../components/assets/images/logo.svg";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppProvider";

const Search = ({  }) => {
    // fixed Header
    const { Cart } = useContext(AppContext);
    window.addEventListener("scroll", function () {
        const search = document.querySelector(".search");
        search.classList.toggle("active", window.scrollY > 100);
    });

    return (
        <>
            <section className="search">
                <div className="container c_flex">
                    <div className="logo width ">
                        <img src={logo} alt="" />
                    </div>

                    <div className="search-box f_flex">
                        <i className="fa fa-search"></i>
                        <input type="text" placeholder="Tìm kiếm..." style={{ borderTopRightRadius: "50%" ,borderBottomRightRadius: "50%"}} />
                        {/* <span>All Category</span> */}
                    </div>

                    <div className="icon f_flex width">
                        <i className="fa fa-user icon-circle"></i>
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
