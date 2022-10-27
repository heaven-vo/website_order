import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../context/AppProvider";

export const NotFoundPage = () => {
    const { setIsHeaderOrder } = useContext(AppContext);

    let history = useHistory();

    useEffect(() => {
        setIsHeaderOrder(false);
    }, [setIsHeaderOrder]);

    return (
        <div style={{ marginTop: 50 }}>
            <img src="https://miro.medium.com/max/1400/1*DeBkx8vjbumpCO-ZkPE9Cw.png" style={{ width: "100%", height: "100%" }} alt="" />
            <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn" style={{ width: "unset" }} onClick={() => history.push("/")}>
                    <div className="login100-form-bgbtn"></div>
                    <button className="login100-form-btn btn-hover">Quay lại trang chủ</button>
                </div>
            </div>
        </div>
    );
};
