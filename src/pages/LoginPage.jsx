import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { AppContext } from "../context/AppProvider";

export const LoginPage = () => {
    const { setIsHeaderOrder, setHeaderInfo, setisCartMain } = useContext(AppContext);
    const [phone, setPhone] = useState("");
    useEffect(() => {
        setIsHeaderOrder(false);
        setHeaderInfo({ isSearchHeader: false, title: "Đăng nhập" });
        setisCartMain(false);
    }, [setIsHeaderOrder, setHeaderInfo, setisCartMain]);
    return (
        <section className="background back-white" style={{ paddingTop: 90, height: "100vh" }}>
            <div className="container login-wrapper" style={{ borderRadius: 10, background: "#fff" }}>
                <div class="limiter">
                    <div class="center_flex" style={{ flexDirection: "column" }}>
                        <div class="" style={{ padding: "15px 0" }}>
                            <span className="login-logo">VinGP Deliver </span>
                        </div>
                        <div class="" style={{}}>
                            <span className="login-hello">___ Xin Chào ___</span>
                        </div>
                        <div class="f_flex login-text" style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "30px 0", gap: 5 }}>
                            <span>Gửi mã xác nhận</span>
                            <span>Có thể bỏ qua nếu không nhận được OTP</span>
                            <span>sau vài giây</span>
                        </div>
                        <div>
                            <input
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                }}
                                type="text"
                                value={phone}
                                placeholder="Số điện thoại"
                                style={{ border: "1px solid rgb(200,200,200)", width: " 300px", borderRadius: 4, padding: "10px 10px", lineHeight: "1rem", fontSize: "1rem", marginBottom: 20 }}
                            />
                        </div>
                        <div>
                            {phone.length > 8 && phone.length < 12 ? (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                    }}
                                    style={{
                                        flex: 1,
                                        padding: 18,
                                        width: 180,
                                        fontSize: "1rem",
                                        cursor: "pointer",
                                        fontWeight: 700,
                                        borderRadius: 10,
                                        background: "var(--primary)",
                                        textTransform: "uppercase",
                                        transition: "0.5s all",
                                    }}
                                >
                                    Gửi mã OTP
                                </button>
                            ) : (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                    }}
                                    style={{
                                        flex: 1,
                                        padding: 18,
                                        width: 180,
                                        fontSize: "1rem",
                                        cursor: "pointer",
                                        fontWeight: 700,
                                        borderRadius: 10,
                                        background: "#f5f5f5",
                                        color: "rgba(0,0,0,.25)",
                                        textTransform: "uppercase",
                                        transition: "0.5s all",
                                    }}
                                >
                                    Gửi mã OTP
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
