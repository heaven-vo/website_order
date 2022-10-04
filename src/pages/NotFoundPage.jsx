import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../context/AppProvider";

export const NotFoundPage = () => {
    const { setIsHeaderOrder, setIsHeader } = useContext(AppContext);

    let history = useHistory();

    useEffect(() => {
        setIsHeaderOrder(false);
        setIsHeader(false);
    }, [setIsHeaderOrder, setIsHeader]);

    return (
        <div style={{ marginTop: 50 }}>
            <img src="https://miro.medium.com/max/1400/1*DeBkx8vjbumpCO-ZkPE9Cw.png" style={{ width: "100%", height: "100%" }} alt="" />
            <div class="container-login100-form-btn">
                <div class="wrap-login100-form-btn" style={{ width: "unset" }} onClick={() => history.push("/")}>
                    <div class="login100-form-bgbtn"></div>
                    <button class="login100-form-btn btn-hover">Quay lại trang chủ</button>
                </div>
            </div>
        </div>
    );
};
