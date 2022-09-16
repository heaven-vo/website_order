import React from "react"
import Home from "../components/MainPage/Home"
import FlashDeals from "../components/flashDeals/FlashDeals"
import TopCate from "../components/top/TopCate"
import NewArrivals from "../components/newarrivals/NewArrivals"
import Shop from "../components/shop/ShopSlide"
import Product from "../components/products/Product"
import Annocument from "../components/annocument/Annocument"
import Wrapper from "../components/wrapper/Wrapper"
import ShopSlide from "../components/shop/ShopSlide"

const HomePage = ({ productItems, shopItems }) => {
  return (
    <>
      <Home  />
      <FlashDeals productItems={productItems}  />
      <TopCate />
      <NewArrivals />
      <ShopSlide />
      <Product shopItems={shopItems}  />
      <Annocument />
      <Wrapper />
    </>
  )
}

export default HomePage
