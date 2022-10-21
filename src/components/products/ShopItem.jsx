import React, { useContext, useEffect, useImperativeHandle, useState } from "react";
import { useHistory } from "react-router-dom";
import { IMAGE_NOTFOUND, LOCALSTORAGE_CART_NAME, LOCALSTORAGE_MODE } from "../../constants/Variable";
import { AppContext } from "../../context/AppProvider";

export const ShopCart = React.forwardRef(({ product, openRodal, index, openRodalOutOfStore }, ref) => {
    useImperativeHandle(ref, () => ({}));
    const { setCart, menu, setisCartMain } = useContext(AppContext);
    const [productRodalQuantity, setProductRodalQuantity] = useState(0);
    const [isShopCart, setisShopCart] = useState(true);

    const [pro, setPro] = useState({});
    let history = useHistory();
    useEffect(() => {
        let newProduct = { ...product, quantityCart: 0 };
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME))) {
            localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify([]));
            setCart([]);
        } else {
            const CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME));
            for (let index = 0; index < CartList.length; index++) {
                if (CartList[index].id === newProduct.id) {
                    newProduct = { ...newProduct, quantityCart: CartList[index].quantityCart };
                }
            }
        }

        setPro({ ...newProduct });
        return () => {};
    }, [product, setCart]);

    return (
        <>
            <div className="box" key={pro.id} style={{ width: 150 }}>
                <div className="product mtop" style={{ margin: 0, padding: "0", boxShadow: "none" }}>
                    {/* <Link to="/food-detail"> */}
                    <div
                        className="img shop-item-image"
                        onClick={() => {
                            // setIsHeader(false);
                            // history.push(`/menu/${menu}/${product.id}`);
                            history.push(`/menu/${menu}/store/store2@gmail.com`);
                        }}
                    >
                        {/* <span className="discount">{item.discount}% Off</span> */}
                        <img
                            src={"https://cdn.cet.edu.vn/wp-content/uploads/2018/03/bun-thit-nuong-kieu-mien-nam.jpg" || IMAGE_NOTFOUND}
                            alt=""
                            style={{
                                height: "100%",
                                width: "100%",
                                borderRadius: "0.5rem",
                                objectFit: "cover",
                            }}
                        />
                    </div>
                    {/* </Link> */}
                    <div className="product-details" style={{ lineHeight: "1.4em", marginTop: 8 }}>
                        <h3
                            style={{ fontSize: 14, cursor: "pointer", fontWeight: 700, lineHeight: 1.5 }}
                            onClick={() => {
                                // setIsHeader(false);
                                // history.push(`/menu/${menu}/${product.id}`);
                            }}
                        >
                            {pro.name}
                        </h3>
                        <h3
                            style={{ fontSize: 12, cursor: "pointer", fontWeight: 400, lineHeight: 1.5 }}
                            onClick={() => {
                                // setIsHeader(false);
                                // history.push(`/menu/${menu}/${product.id}`);
                            }}
                        >
                            {"Tòa S603"}
                        </h3>

                        {/* <div className="price">
                            <span style={{ color: "#666", fontSize: 14 }}>{product.weight} </span>
                            <button onClick={() => AddCart(product)}>
                                <i className="fa fa-plus"></i>
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
});

// export default ShopCart;
