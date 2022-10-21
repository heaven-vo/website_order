import { useContext } from "react";
import { useHistory } from "react-router-dom";
import Rodal from "rodal";
import { AppContext } from "../../context/AppProvider";

export const SuccessModal = () => {
    let history = useHistory();
    const { mobileMode, opentModalSuccess, setOpentModalSuccess } = useContext(AppContext);
    return (
        <Rodal
            height={mobileMode ? 300 : 320}
            width={mobileMode ? 350 : 400}
            visible={opentModalSuccess}
            showCloseButton={false}
            onClose={() => {
                setOpentModalSuccess(false);
                history.replace("/");
            }}
            style={{ borderRadius: 10 }}
        >
            <div class="modal-success">
                <div class="modal-success-img">
                    <img class="" src="/images/success.jpg" alt="" />
                </div>
                <div class="modal-success-title">
                    <p>Thành công!</p>
                </div>
                <span>Đơn hàng sẽ đến với bạn sớm thôi.</span>
            </div>
            <div className="f_flex" style={{ width: " 100%", justifyContent: "space-between", padding: "20px", gap: 15 }}>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        history.replace("/");
                        setOpentModalSuccess(false);
                    }}
                    style={{ flex: 1, padding: 12, fontSize: "1rem", cursor: "pointer", fontWeight: 700, borderRadius: 10, background: "var(--primary)", height: 45, color: "#fff" }}
                >
                    Đóng
                </button>
            </div>
        </Rodal>
    );
};

export const ErrorModal = () => {
    const { mobileMode, opentModalError, setOpentModalError } = useContext(AppContext);
    return (
        <Rodal
            height={mobileMode ? 280 : 300}
            width={mobileMode ? 350 : 400}
            visible={opentModalError}
            showCloseButton={false}
            onClose={() => {
                setOpentModalError(false);
            }}
            style={{ borderRadius: 10 }}
        >
            <div class="modal-success">
                <div class="modal-success-img" style={{ width: "45%", padding: "10px 0" }}>
                    <img class="" src="/images/error.png" alt="" />
                </div>
                <div class="modal-success-title">
                    <p style={{ color: "rgb(237, 55, 116)" }}>Oops...!</p>
                </div>
                <span>Đã xảy ra lỗi gì đó. Vui lòng thử lại sau.</span>
            </div>
            <div className="f_flex" style={{ width: " 100%", justifyContent: "space-between", padding: "20px", gap: 15 }}>
                <button
                    onClick={(e) => {
                        e.preventDefault();

                        setOpentModalError(false);
                    }}
                    style={{ flex: 1, padding: 12, fontSize: "1rem", cursor: "pointer", fontWeight: 700, borderRadius: 10, background: "var(--primary)", height: 45, color: "#fff" }}
                >
                    Đóng
                </button>
            </div>
        </Rodal>
    );
};
