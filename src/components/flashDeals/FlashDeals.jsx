import React from "react";
import FlashCard from "./FlashCard";
import "./style.css";

const FlashDeals = ({ productItems, addToCart }) => {
    return (
        <>
            <section className="flash">
                <div className="container">
                    <div className='heading d_flex'>
                        <div className="heading f_flex">
                            <img src="https://firebasestorage.googleapis.com/v0/b/deliveryfood-9c436.appspot.com/o/icon%2Fbreakfast.png?alt=media&token=a30b6839-9c6c-432e-aecf-5d66f05a385a" alt="" />
                            <h1 style={{ marginTop: 3 }}>Điểm Tâm Sáng</h1>
                        </div>
                        <div className="heading-right row">
                            <span>Xem tất cả</span>
                            <i className="fa-solid fa-caret-right"></i>
                        </div>
                    </div>
                    <FlashCard productItems={productItems} addToCart={addToCart} />
                </div>
            </section>
        </>
    );
};

export default FlashDeals;
