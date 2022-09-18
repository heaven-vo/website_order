import React from "react"
import TopCate from "../top/TopCate"
import Categories from "./Categories"
import "./Home.css"
import { NewSlider } from "./NewSlider"
import SliderHome from "./Slider"

const Home = () => {
  return (
    <>
      <section className='home'>
        <div className='container f_flex' style={{padding: "0", gap: 15}}>
          <Categories />
          <NewSlider />
          
        </div>
      </section>
    </>
  )
}

export default Home
