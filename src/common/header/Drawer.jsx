// @flow
import * as React from "react";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppProvider";
// import "./Drawer.scss";
export const DrawerContent = () => {
    // const history = useNavigate();
    const { setIsOpenDrawer } = React.useContext(AppContext);
    const [isOpenCategory, setisOpenCategory] = React.useState(false);
    const hanldeOpenCategory = () => {
        setisOpenCategory(!isOpenCategory);
    };
    const handleSubmitCategory = (id, categoryName) => {
        setIsOpenDrawer(false);
        // history("/");
    };
    const data = [
        { id: 1, cateImg: "./images/category/cat-1.png", cateName: "Trứng & Sữa" },
        { id: 2, cateImg: "./images/category/cat-2.png", cateName: "Thịt Tươi Sống" },
        { id: 3, cateImg: "./images/category/cat-1.png", cateName: "Các Loại Hạt" },
        { id: 4, cateImg: "./images/category/cat-2.png", cateName: "Thịt Hải Sản Đóng Hộp" },
        { id: 5, cateImg: "./images/category/cat-1.png", cateName: "Rau Củ Tươi" },
        { id: 6, cateImg: "./images/category/cat-2.png", cateName: "Rượu Bia" },
    ];
    return (
        <div className="drawer__wrapper">
            <div className="drawer__wrapper__item" onClick={hanldeOpenCategory}>
                <h4>Danh mục thực phẩm</h4>
                {isOpenCategory ? <i class="fa-solid fa-chevron-up"></i> : <i class="fa-solid fa-chevron-down"></i>}
            </div>
            <div
                className="drawer__category__wrapper"
                style={{
                    maxHeight: isOpenCategory ? "360px" : 0,
                    // display: isOpenCategory ? "block" : "none",
                    // opacity: isOpenCategory ? 1 : 0,
                    // visibility: isOpenCategory ? "visible" : "hidden",
                    // transform: isOpenCategory ? "translateY(0em)" : "translateY(-50em)",
                }}
            >
                <ul className="drawer__category__list">
                    {data.map((item) => {
                        return (
                            <li key={item.id} onClick={() => handleSubmitCategory(item.id, item.cateName)}>
                                {item.cateName}
                            </li>
                        );
                    })}
                    <li onClick={() => handleSubmitCategory()}>{"Xem Tất Cả"}</li>
                </ul>
            </div>
            <Link to={"/"} onClick={() => setIsOpenDrawer(false)}>
                <div className={`drawer__wrapper__item ${isOpenCategory && "border__top"}`}>
                    <h4>Khám Phá</h4>
                </div>
            </Link>
            <Link to={"/menu"} onClick={() => setIsOpenDrawer(false)}>
                <div className="drawer__wrapper__item">
                    <h4>Thực Đơn</h4>
                </div>
            </Link>
            <Link to={"/shop"} onClick={() => setIsOpenDrawer(false)}>
                <div className="drawer__wrapper__item">
                    <h4>Cửa Hàng</h4>
                </div>
            </Link>
            <Link to={"/food"} onClick={() => setIsOpenDrawer(false)}>
                <div className="drawer__wrapper__item">
                    <h4>Thực Phẩm</h4>
                </div>
            </Link>
            <div className="drawer__wrapper__item">
                <h4>Đăng nhập</h4>
                <div>{/* <FontAwesomeIcon className="header__Mobile__menu__icon" style={{ fontSize: 14 }} icon={faSignIn} /> */}</div>
            </div>
            <div className="drawer__wrapper__item">
                <h4>Đăng xuất</h4>
                <div>
                    <i style={{ marginLeft: 5 }} className="fa-solid fa-right-from-bracket"></i>
                </div>
            </div>
        </div>
    );
};
