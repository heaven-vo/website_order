import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { AppContext } from "../context/AppProvider";

export const LoginPage = () => {
    const { setIsHeaderOrder, setIsHeader, Cart } = useContext(AppContext);
    useEffect(() => {
        setIsHeaderOrder(false);
        setIsHeader(false);
    }, [setIsHeaderOrder, setIsHeader]);
    return (
        <section className="background" style={{ paddingTop: 0 }}>
            <div className="container " style={{ borderRadius: 10 }}>
                <div class="limiter">
                    <div class="container-login100">
                        <div class="wrap-login100" style={{ padding: "40px 55px 40px 55px" }}>
                            <form class="login100-form validate-form">
                                <h3 class="login100-form-title " style={{ paddingBottom: 49, fontSize: 30 }}>
                                    Đăng Nhập
                                </h3>

                                <div class="wrap-input100 validate-input " style={{ marginBottom: 23 }} data-validate="Username is reauired">
                                    <h4 class="">Gmail / Số điện thoại</h4>
                                    <input class="input100" type="text" name="username" placeholder="Gmail / Số điện thoại" />
                                    <span class="focus-input100" data-symbol="&#xf206;"></span>
                                </div>

                                <div class="wrap-input100 validate-input" data-validate="Password is required">
                                    <h4 class="">Mật khẩu</h4>
                                    <input class="input100" type="password" name="pass" placeholder="Mật khẩu" />
                                    <span class="focus-input100" data-symbol="&#xf190;"></span>
                                </div>

                                <div class="text-right" style={{ paddingTop: 8, paddingBottom: 31 }}>
                                    <a href="#" className="hover">
                                        Quên mật khẩu?
                                    </a>
                                </div>

                                <div class="container-login100-form-btn">
                                    <div class="wrap-login100-form-btn">
                                        <div class="login100-form-bgbtn"></div>
                                        <button class="login100-form-btn btn-hover">Đăng Nhập</button>
                                    </div>
                                </div>

                                <div class="txt1 text-center" style={{ paddingTop: 30, paddingBottom: 20 }}>
                                    <span>Hoặc đăng nhập với</span>
                                </div>

                                <div class="flex-c-m">
                                    <a href="#" class="login100-social-item bg1">
                                        <i class="fa-brands fa-facebook-f"></i>
                                    </a>

                                    <a href="#" class="login100-social-item bg2">
                                        <i class="fa-brands fa fa-twitter"></i>
                                    </a>

                                    <a href="#" class="login100-social-item bg3">
                                        <i class="fa-brands fa fa-google"></i>
                                    </a>
                                </div>

                                <div class="flex-col-c p-t-155" style={{ paddingTop: 30 }}>
                                    <span class="txt1 p-b-17">Bạn chưa có tài khoản?</span>

                                    <a href="#" class="txt2" style={{ color: "#ea4335" }}>
                                        Đăng Ký
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
