import React, { useState } from "react";
import Image from "next/image";
// import DynamicIcon from "@components/DynamicIcon";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

interface CarouselProps {
  imageIndex?: number;
  slides: object[];
}

const Carousel: React.FC<CarouselProps> = ({ imageIndex, slides }) => {
  const [currentImage, setCurrentImage] = useState<number>(0);

  const length = slides.length;

  const incrementImageNum = (): void => {
    setCurrentImage(currentImage === length - 1 ? 0 : currentImage + 1);
  };

  const decrementImageNum = (): void => {
    setCurrentImage(currentImage === 0 ? length - 1 : currentImage - 1);
  };

  return (
    <>
      {slides.map((img, index) => {
        return (
          <div
            className={
              index === currentImage
                ? `scale-110 opacity-100 duration-700`
                : `opacity-100 duration-300`
            }
            key={index}
          >
            {index === currentImage && (
              <>
                <div className="flex justify-center">
                  <BsChevronLeft
                    onClick={decrementImageNum}
                    className="flex w-[40px] cursor-pointer self-center"
                  />
                  <Image
                    width={600}
                    height={400}
                    src={img.url}
                    alt={img.name}
                    className="opacity-100 duration-300"
                  />
                  <BsChevronRight
                    onClick={incrementImageNum}
                    className="w-[40px] cursor-pointer self-center"
                  />
                </div>
              </>
            )}
          </div>
        );
      })}
    </>
  );
};

export default Carousel;
