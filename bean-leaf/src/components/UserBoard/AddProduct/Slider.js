import React, { useState } from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styled from "styled-components";

const Image = styled.img`
  height: 400px;
  width: 400px;
  object-fit: cover;
`;

const MainContent = styled.div`
  display: flex;
  align-items: flex-start;
`;

const DeleteButton = styled.button`
  position: absolute;
  right: 10px;
  top:50px;
  background-color: rgba(0, 0, 0, 0.5);
`;
const AddButton = styled.button`
  position: absolute;
  right: 10px;
  top:10px;
  background-color: rgba(0, 0, 0, 0.5);
`;

function AddSlider({images ,onSliderClick, onSliderDrop, onSliderDragOver, onSliderDragEnter, handleDelete }) {
//   const [images, setImages] = useState([
//     "https://101tea.ru/upload/ammina.optimizer/jpg-webp/q70/upload/iblock/20e/20ebbbe326749629fe4d53d68dc817a7.webp",
//     "https://sirpuer.com/wa-data/public/blog/ewblogpimg/2/1/davayte-razberyomsya-chto-takoe-chay-i-kakoy-on-byvaet641884b2c14e77.77201277_1200x0.jpg",
//     "https://shop.evalar.ru/upload/iblock/236/236034ee8fcfaa011de7ffc6f39ae967.jpg",
//   ]);
  const [activeIndex, setActiveIndex] = useState(0);

  

  return (
    <MainContent>
      <Carousel
        showArrows
        showStatus={false}
        showThumbs={false}
        onChange={setActiveIndex}
        onClick={onSliderClick}
        onDrop={onSliderDrop}
        onDragOver={onSliderDragOver}
        onDragEnter={onSliderDragEnter}
      >
        {images.map((img, index) => (
          <div key={index}>
            <Image src={img} alt="" />
            <AddButton onClick={onSliderClick}>+</AddButton>
            <DeleteButton onClick={() => handleDelete(index)}>х</DeleteButton>
          </div>
        ))}
      </Carousel>
    </MainContent>
  );
}

export default AddSlider;