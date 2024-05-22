import React, { useState } from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styled from "styled-components";

const Image = styled.img`
  height: 500px;
  width: 500px;
  object-fit: cover;
`;

const MainContent = styled.div`
  display: flex;
  align-items: flex-start;
`;

function CustomSlider({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <MainContent>
      <Carousel
        showArrows
        showStatus={false}
        showThumbs={false}
        onChange={setActiveIndex}
      >
        {images.map((img, index) => (<Image key={index} src={img} alt="" />))}
      </Carousel>
    </MainContent>
  );
}

export default CustomSlider;