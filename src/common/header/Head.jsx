import React from "react";

const Head = () => {
    return (
        <>
            <section className="head">
                <div className="container d_flex">
                    <div className="left row head-mobile">
                        <i className="fa fa-phone"></i>
                        <label> +88012 3456 7894</label>
                        <i className="fa fa-envelope"></i>
                        <label> support@ui-lib.com</label>
                    </div>
                    <div className="right row RText">
                        <label>Hi Thái!</label>
                        {/* <span>Đơn Hàng</span> */}
                        <label>Đơn Hàng</label>
                        {/* <span>🏳️‍⚧️</span> */}
                        <label>
                            Đăng Xuất <i style={{ marginLeft: 5 }} className="fa-solid fa-right-from-bracket"></i>
                        </label>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Head;
