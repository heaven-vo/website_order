import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import ProductCart from "../components/products/ProductCart";
import { AppContext } from "../context/AppProvider";

export const ShopDetailPage = ({ shopItems }) => {
    const { setCart, setIsHeader } = useContext(AppContext);
    useEffect(() => {
        setIsHeader(false);
        return () => {
            setIsHeader(true);
        };
    }, [setIsHeader]);
    return (
        <>
            <section className="background" style={{ background: "#fff", paddingTop: 20 }}>
                <div className="container">
                    <div className="d_flex shop-detail">
                        <div className="shop-detail-left">
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/deliveryfood-9c436.appspot.com/o/shop%2FSTORE-COVER-dark2x.png?alt=media&token=a9efb823-35df-4bdf-a4ce-3dea24cf21e9"
                                alt=""
                            />
                        </div>
                        <div className="shop-detail-right">
                            <h2>Lotte Mart</h2>
                            <p>
                                Công ty Cổ phần Trung tâm thương mại LOTTE VIỆT NAM (với tên gọi là Trung tâm thương mại LOTTE Mart hay ngắn gọn là LOTTE Mart Việt Nam) trực thuộc tập đoàn LOTTE của
                                Hàn Quốc. LOTTE Mart luôn luôn ưu tiên phát triển các loại hàng hóa nội địa, chủ động hợp tác để đưa các sản phẩm Việt Nam chất lượng cao vào danh mục nhãn hàng riêng
                                Choice. Tiên phong đầu tư trong ngành bán lẻ tại Việt Nam từ 2008 với mô hình bán lẻ hiện đại. LOTTE Mart mang đến danh mục hàng hóa đa dạng, với hơn 50,000 mặt hàng có
                                chất lượng vượt trội, giá cả hợp lý và dịch vụ chuyên nghiệp, tận tâm. LOTTE Mart đề cao giá trị "Quan tâm" thông qua việc thực hiện các chuỗi chương trình cộng đồng ý
                                nghĩa.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* <section className="shop background">
                <div className="container">
                    <div className="contentWidth">
                        {[1, 2].map((item) => {
                            return (
                                <div style={{ marginBottom: 20 }}>
                                    <div className="heading d_flex">
                                        <div className="heading-left row  f_flex">
                                            <h2>Thịt Tươi Sống</h2>
                                        </div>
                                        <div className="heading-right  ">
                                            <span>Xem tất cả</span>
                                            <i className="fa-solid fa-caret-right"></i>
                                        </div>
                                    </div>
                                    <div className="product-content  grid6" style={{ gridGap: 0 }}>
                                        {shopItems.map((item) => {
                                            return <ProductCart product={item} key={item.id} />;
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section> */}
        </>
    );
};
