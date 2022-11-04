import React from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../context/AppProvider";

const DurationList = () => {
    const { mobileMode } = useContext(AppContext);
    let history = useHistory();
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        fade: true,
        appendDots: (dots) => {
            return <ul style={{ margin: "0px" }}>{dots}</ul>;
        },
    };
    return [1, 2, 3].map((item) => {
        return (
            <>
                <div style={{ width: "100%", padding: "25px 15px 10px 15px", background: "rgb(246, 249, 252)" }} className="c_flex">
                    <div
                        className="center_flex duration-title"
                        onClick={() => {
                            history.push("/schedule", { day: "1" });
                        }}
                    >
                        <span className="duration-title">Thứ hai - 3/11/2022</span>
                        <i className="fa-solid fa-chevron-right " style={{ fontSize: 14, marginTop: 2, marginLeft: 15 }}></i>
                    </div>
                    {mobileMode && (
                        <div>
                            <span className="view-all-btn" style={{ fontSize: 15, fontWeight: 500, color: "rgb(150,150,150)" }}>
                                Xem thêm
                            </span>
                        </div>
                    )}
                </div>
                <div style={{ display: "flex", width: "100%" }}>
                    <div style={{ backgroundColor: "#fff" }} className="duration-grid">
                        <div className="duration-product">
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/lucky-science-341916.appspot.com/o/assets%2FImagesProducts%2Fad8b11c3-568b-448a-9a23-8e322abeff50?alt=media&token=2b2c29de-97e3-4874-88bb-3b02f4784011"
                                alt=""
                            />
                            <span className="duration-product-name">Mực tươi sống 300g</span>
                            <span className="duration-product-price">99.000₫</span>
                        </div>
                        <div className="duration-product">
                            <img src="https://www.deheus.com.vn/siteassets/animal-nutrition/animals/aquaculture/animal-nutrition_animals_aqua_shrimp_prawn.jpg?mode=crop&width=600&height=435" alt="" />
                            <span className="duration-product-name">Tôm tươi sống 300g</span>
                            <span className="duration-product-price">99.000₫</span>
                        </div>
                        <div className="duration-product">
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/lucky-science-341916.appspot.com/o/assets%2FImagesProducts%2Fad8b11c3-568b-448a-9a23-8e322abeff50?alt=media&token=2b2c29de-97e3-4874-88bb-3b02f4784011"
                                alt=""
                            />
                            <span className="duration-product-name">Mực tươi sống 300g</span>
                            <span className="duration-product-price">99.000₫</span>
                        </div>
                        <div className="duration-product">
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/lucky-science-341916.appspot.com/o/assets%2FImagesProducts%2Fad8b11c3-568b-448a-9a23-8e322abeff50?alt=media&token=2b2c29de-97e3-4874-88bb-3b02f4784011"
                                alt=""
                            />
                            <span className="duration-product-name">Mực tươi sống 300g</span>
                            <span className="duration-product-price">99.000₫</span>
                        </div>
                        <div className="duration-product">
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/lucky-science-341916.appspot.com/o/assets%2FImagesProducts%2Fad8b11c3-568b-448a-9a23-8e322abeff50?alt=media&token=2b2c29de-97e3-4874-88bb-3b02f4784011"
                                alt=""
                            />
                            <span className="duration-product-name">Mực tươi sống 300g</span>
                            <span className="duration-product-price">99.000₫</span>
                        </div>
                    </div>
                    {!mobileMode && (
                        <div className="view-all-btn">
                            <div className="center_flex " style={{ flexDirection: "column", height: 160, gap: 10, marginRight: 15 }}>
                                <div
                                    className="center_flex cusor view-all-btn"
                                    onClick={() => {
                                        // history.push(`/mode/${mode}/${filtter}/${cateId}`);
                                    }}
                                    style={{ borderRadius: 50, border: "1px solid rgb(220,220,220)", width: 45, height: 45 }}
                                >
                                    <i className="fa-solid fa-chevron-right" style={{ fontSize: 18 }}></i>
                                </div>
                                <span
                                    onClick={() => {
                                        // history.push(`/mode/${mode}/${filtter}/${cateId}`);
                                    }}
                                    className="cusor"
                                    style={{ fontSize: 14 }}
                                >
                                    Xem thêm
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </>
        );
    });
};

export default DurationList;
