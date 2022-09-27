import React, { useState, useEffect } from "react";
import './Slideshow.css';
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {sliderData} from "./slideshow-data";

function Slideshow() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideLength = sliderData.length;

    const autoScroll  = true;
    let slideInterval;
    let intervalTime = 5000;
    const nextSlide = () =>{
        setCurrentSlide(currentSlide === slideLength-1 ? 0 : currentSlide + 1)
    }
    const prevSlide = () =>{
        setCurrentSlide(currentSlide === 0 ? slideLength-1 : currentSlide - 1)
    }

    function auto(){
        slideInterval = setInterval(nextSlide, intervalTime)
    }
    useEffect(()=>{
        setCurrentSlide(0);
    }, []);
    useEffect(() =>{
        if(autoScroll){
            auto();
        }
        return () => clearInterval(slideInterval);
    }, [currentSlide])
    return (
    <div className="slider">
        <IoIosArrowBack className="arrow prev" onClick={prevSlide}/>
        <IoIosArrowForward className="arrow next" onClick={nextSlide}/>

        {sliderData.map((slide, index) => {
            return (
                <div className={index === currentSlide ? "slide current" : "slide"} key={index}>
                    {index === currentSlide && (
                        <>
                        <img src={slide.image} alt={slide.heading}/>
                        <div className="content">
                            <h2>{slide.heading}</h2>
                            <p>{slide.desc}</p>
                            <hr/>
                            <button className="sliderContent_button">Buy Now</button>
                        </div>
                        </>
                    )}
                </div>
            )
        })}
    </div>
  );
}

export default Slideshow;
