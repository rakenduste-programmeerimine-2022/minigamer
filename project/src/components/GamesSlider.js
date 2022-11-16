import React, { useState } from "react";
import { GamesSliderData } from "./GamesSliderData";
//import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

const GamesSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <Box className="slider">
      <ArrowBackIosNewRoundedIcon className="left-arrow" onClick={prevSlide} />
      <ArrowForwardIosRoundedIcon className="right-arrow" onClick={nextSlide} />
      {GamesSliderData.map((slide, index) => {
        return (
          <Box
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && (
              <Box className="slideContent">
                <Box className="leftContent">
                  <Box
                    className="gameImg"
                    /*component="img"  src={slide.image} */
                  >
                    <Box className="gameName">{slide.name}</Box>
                  </Box>
                </Box>
                <Box className="rightContent">
                  <Box className="descWrap">
                    <Box className="desc" sx={{ color: "white" }}>
                      {slide.desc}
                    </Box>
                  </Box>
                  <Box className="playBtnWrap">
                    <Link className="playBtn" to={slide.link}>
                      <Box>PLAY</Box>
                    </Link>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default GamesSlider;
