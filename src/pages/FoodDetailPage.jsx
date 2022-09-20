import React, { useContext, useEffect, useState } from "react";
import Pdata from "../components/products/Pdata";
import { RecommendProduct } from "../components/products/RecommendProduct";
import { LOCALSTORAGE_NAME } from "../constants/Variable";
import { AppContext } from "../context/AppProvider";

export const FoodDetailPage = () => {
    const { setCart } = useContext(AppContext);
    const [countQuantity, setcountQuantity] = useState(1);
    const { shopItems } = Pdata;
    

    const AddCart = () => {
        let isQuantity = false;
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME))) {
            localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify([]));
        }
        const CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME));
        let newCarts = CartList?.map((item) => {
            if (item.id === shopItems[1].id) {
                item.quantity = item.quantity + countQuantity;
                // if (item.quantity > getCountQuantity()) {
                //     item.quantity = getCountQuantity();
                // }
                isQuantity = true;
            }
            return item;
        });
        if (!isQuantity) {
            const carts = [
                ...CartList,
                {
                    id: shopItems[1].id,
                    quantity: countQuantity,
                    cover: shopItems[1].cover,
                    price: shopItems[1].price,
                    weight: shopItems[1].weight,
                    shop: shopItems[1].shop,
                    name: shopItems[1].name
                },
            ];
            setCart(carts);
            localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify([...carts]));
        } else {
            setCart([...newCarts]);
            localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify([...newCarts]));
        }
    };

    return (
        <>
            <section className="background">
                <div className="container " style={{ background: "#fff", borderRadius: 10 }}>
                    <div className="d_flex shop-detail" style={{ padding: "10px 25px" }}>
                        <div className="food-detail-left" style={{ padding: 50 }}>
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/deliveryfood-9c436.appspot.com/o/food%2Fba-ri-b-thumbnail2x.jpg?alt=media&token=3d9c0460-5a19-4cf0-bf22-b3e48b57b0a0"
                                alt=""
                            />
                        </div>
                        <div className="food-detail-right">
                            {/* <div className="rate" style={{ color: "#e94560", marginBottom: 10 }}>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star" style={{ color: "rgb(102, 102, 102)" }}></i>
                            </div> */}
                            <h2>Thịt Bò Văn Dương</h2>
                            <h4 style={{ fontWeight: 500, color: "rgb(102, 102, 102)" }}>SKU : 9AF49D</h4>
                            <h3 style={{ color: "#e94560", marginTop: 15 }}>300.000đ</h3>
                            <h4 style={{ marginBottom: 20, fontSize: 14, fontWeight: 400, color: "#666666" }}>500g</h4>
                            <div
                                className="d_flex"
                                style={{
                                    justifyContent: "start",
                                    marginRight: 150,
                                    padding: "15px 0 10px 0",
                                    gap: 15,
                                    borderTop: "1px solid rgb(230,230,230)",
                                    borderBottom: "1px solid rgb(230,230,230)",
                                }}
                            >
                                <div style={{ width: 140 }}>
                                    <img
                                        width={"100%"}
                                        src="https://firebasestorage.googleapis.com/v0/b/deliveryfood-9c436.appspot.com/o/shop%2FSTORE-COVER-dark2x.png?alt=media&token=a9efb823-35df-4bdf-a4ce-3dea24cf21e9"
                                        alt=""
                                    />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: 18 }}>Lotte Mart</h3>
                                    <span style={{ color: "rgb(160,160,160)", fontWeight: 400, fontSize: 15 }}>Giá Rẻ Cho Mọi Nhà</span>
                                </div>
                            </div>
                            <p style={{ color: "#666666", padding: "20px 0" }}>
                                Thịt Bò của thương hiệu CP đạt các tiêu chuẩn về an toàn toàn thực phẩm, đảm bảo chất lượng, độ tươi ngon. Thịt heo mềm, vân nạc, mỡ rõ ràng nên rất phù hợp làm nguyên
                                liệu để nấu thịt kho hột vịt. Thịt heo ba rọi có thể dùng điện thoại quét mã QR trên tem sản phẩm để kiểm tra nguồn gốc.
                            </p>

                            <div className="f_flex" style={{ gap: 40, marginBottom: 25 }}>
                                <div style={{ border: "1px solid rgb(160,160,160)", textAlign: "center", width: 170, height: 50, borderRadius: "0.375rem", alignItems: "center" }} className="f_flex">
                                    <div
                                        onClick={() => setcountQuantity(countQuantity - 1)}
                                        style={{ width: "6rem", borderRight: "1px solid rgb(160,160,160)", height: "100%" }}
                                        className="center_flex hover"
                                    >
                                        <i className="fa fa-minus"></i>
                                    </div>
                                    <span style={{ width: "6rem", fontWeight: 600 }}>{countQuantity}</span>
                                    <div
                                        onClick={() => setcountQuantity(countQuantity + 1)}
                                        style={{ width: "6rem", borderLeft: "1px solid rgb(160,160,160)", height: "100%" }}
                                        className="center_flex hover"
                                    >
                                        <i className="fa fa-plus"></i>
                                    </div>
                                </div>
                                <div style={{ textAlign: "center", width: 200, height: 50, borderRadius: "0.375rem", alignItems: "center" }} className="center_flex btn-hover">
                                    <span onClick={()=> AddCart()} style={{ fontWeight: 600, fontSize: 16 }}>Thêm Giỏ Hàng</span>
                                </div>
                            </div>

                            <table>
                                <tbody>
                                    <tr className="">
                                        <td className="food-detail-label">Loại Thực Phẩm: </td>
                                        <td>
                                            <div className="cusor" style={{ borderRadius: 20, background: "#f7e9c7", padding: "6px 14px" }}>
                                                <span style={{ fontSize: 14, fontWeight: 700 }}>Thịt Tươi Sống</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="">
                                        <td className="food-detail-label">Xuất Xứ: </td>
                                        <td className="food-detail-text">Việt Nam</td>
                                    </tr>
                                    <tr className="">
                                        <td className="food-detail-label">Đóng Gói: </td>
                                        <td className="food-detail-text">500g</td>
                                    </tr>
                                    <tr className="">
                                        <td className="food-detail-label">Tối Thiểu: </td>
                                        <td className="food-detail-text">0.5kg</td>
                                    </tr>
                                    <tr className="">
                                        <td className="food-detail-label">Tối Đa: </td>
                                        <td className="food-detail-text">3kg</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
            <section className="shop background">
                <div className="container">
                    <div className="heading d_flex">
                        <div className="heading f_flex">
                            <h1 style={{ marginTop: 3 }}>Sẩn Phẩm Tương Tự</h1>
                        </div>
                        <div className="heading-right row">
                            <span>Xem tất cả</span>
                            <i className="fa-solid fa-caret-right"></i>
                        </div>
                    </div>
                    <RecommendProduct />
                </div>
            </section>
        </>
    );
};
