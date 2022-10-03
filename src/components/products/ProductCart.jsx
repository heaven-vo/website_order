//import React, { useState } from "react"

//const ProductCart = ({ addToCart, shopItems }) => {
//  const [count, setCount] = useState(0)
//  const increment = () => {
//    setCount(count + 1)
//  }

//  return (
//    <>
//      {shopItems.map((shopItems) => {
//        return (
//          <div className='product mtop'>
//            <div className='img'>
//              <span className='discount'>{shopItems.discount}% Off</span>
//              <img src={shopItems.cover} alt='' />
//              <div className='product-like'>
//                <label>{count}</label> <br />
//                <i className='fa-regular fa-heart' onClick={increment}></i>
//              </div>
//            </div>
//            <div className='product-details'>
//              <h3>{shopItems.name}</h3>
//              <div className='rate'>
//                <i className='fa fa-star'></i>
//                <i className='fa fa-star'></i>
//                <i className='fa fa-star'></i>
//                <i className='fa fa-star'></i>
//                <i className='fa fa-star'></i>
//              </div>
//              <div className='price'>
//                <h4>${shopItems.price}.00 </h4>
//                <button onClick={() => addToCart(shopItems)}>
//                  <i className='fa fa-plus'></i>
//                </button>
//              </div>
//            </div>
//          </div>
//        )
//      })}
//    </>
//  )
//}

//export default ProductCart

import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { IMAGE_NOTFOUND, LOCALSTORAGE_NAME } from "../../constants/Variable";
import { AppContext } from "../../context/AppProvider";

const ProductCart = ({ product }) => {
    const { setCart, setlistProducts, setIsHeader, menu, setIsLoadingCircle } = useContext(AppContext);
    const [count, setCount] = useState(0);
    const [pro, setPro] = useState({});
    let history = useHistory();
    useEffect(() => {
        let newProduct = { ...product, quantityCart: 0 };
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME))) {
            localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify([]));
            setCart([]);
        } else {
            const CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME));
            for (let index = 0; index < CartList.length; index++) {
                if (CartList[index].id === newProduct.id) {
                    newProduct = { ...newProduct, quantityCart: CartList[index].quantityCart };
                }
            }
        }

        setPro({ ...newProduct });
        return () => {};
    }, [product, setCart]);

    // Thêm giỏ hàng
    const AddCart = (product) => {
        let isQuantity = false;
        // Lấy giỏ hàng từ local storage
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME))) {
            localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify([]));
        }
        const CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME));
        // Tạo 1 giỏ hàng mới và tăng số lượng sản phẩm dựa theo ID
        let newCarts = CartList?.map((item) => {
            if (item.id === pro.id) {
                item.quantityCart = item.quantityCart + 1;
                setPro({ ...pro, quantityCart: pro.quantityCart + 1 });
                isQuantity = true;
            }
            return item;
        });
        // Tạo 1 mảng sản phẩm mới từ mảng cũ kèm theo tăng số lượng sản phẩm theo ID
        // let newProduts = listProducts?.map((item) => {
        //     if (item.id === pro.id) {
        //         item.quantityCart = item.quantityCart + 1;
        //     }
        //     return item;
        // });
        // Trường hợp isQuantity = false là trường hợp Thêm mới 1 sản phẩm
        // Trường hợp isQuantity = true là trường hợp Cập nhật 1 sản phẩm
        if (!isQuantity) {
            const carts = [
                ...CartList,
                {
                    ...pro,
                    quantityCart: 1,
                },
            ];
            setPro({ ...pro, quantityCart: 1 });
            // Cập nhật lại Giỏ hàng ở Provider
            setCart(carts);
            // Cập nhật giỏ hàng ỏ local storage
            localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify([...carts]));
        } else {
            // Cập nhật lại Giỏ hàng ở Provider
            setCart([...newCarts]);
            // Cập nhật giỏ hàng ỏ local storage
            localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify([...newCarts]));
        }
        // Cập nhật lại danh sách sản phẩm hiện tại với số lượng vừa được cập nhật
        // setlistProducts([...newProduts]);
    };

    return (
        <>
            <div className="box" key={pro.id}>
                <div className="product mtop" style={{ margin: 6 }}>
                    {/* <Link to="/food-detail"> */}
                    <div
                        className="img"
                        onClick={() => {
                            setIsHeader(false);
                            history.push(`/menu/${menu}/${product.id}`);
                        }}
                    >
                        {/* <span className="discount">{item.discount}% Off</span> */}
                        <img src={pro.image || IMAGE_NOTFOUND} alt="" />
                        <div className="shop-product-like">
                            <label style={{ opacity: pro.quantityCart > 0 ? 1 : 0 }}>
                                {pro.quantityCart}
                                {" " + pro.unit}
                            </label>{" "}
                            <br />
                            {/* {product.isLike ? <i className="fa-solid fa-heart like cusor" style={{ opacity: 1 }}></i> : <i className="fa-regular fa-heart cusor"></i>} */}
                        </div>
                    </div>
                    {/* </Link> */}
                    <div className="product-details" style={{ lineHeight: "1.4em" }}>
                        <span style={{ fontSize: 13, color: "#666" }}>{pro.storeName}</span>

                        <h3
                            style={{ fontSize: 16, cursor: "pointer", fontWeight: 600 }}
                            onClick={() => {
                                setIsHeader(false);
                                history.push("/food-detail");
                            }}
                        >
                            {pro.name}
                        </h3>

                        {/* <div className="rate" style={{ marginTop: 4 }}>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                        </div> */}

                        <div className="price">
                            <h4>{pro.pricePerPack / 1000 + ".000"}đ</h4>
                            <button onClick={() => AddCart(pro)}>
                                <i className="fa fa-plus"></i>
                            </button>
                        </div>
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
};

export default ProductCart;
