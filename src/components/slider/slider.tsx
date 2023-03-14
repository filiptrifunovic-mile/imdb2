import "./slider.css";
import Slick, { Settings } from "react-slick";
import { ReactNode, useState } from "react";

interface Props extends Omit<Settings, "children"> {
  isMovieCard?: boolean;
  isSeasonCard?: boolean;
  children?: (onSwipe: boolean) => ReactNode;
}

export const Slider = (props: Props) => {
  let settings: Omit<Settings, "children"> = {
    ...props,
  };

  if (props.isMovieCard) {
    settings = {
      ...settings,
      infinite: true,

      slidesToShow: 4,
      slidesToScroll: 1,
      swipe: false,
      responsive: [
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
  }

  const [onSwipe, setOnSwipe] = useState(false);

  return (
    <Slick
      {...settings}
      autoplaySpeed={3000}
      onSwipe={() => setOnSwipe(true)}
      afterChange={() => setOnSwipe(false)}
    >
      {props.children ? props.children(onSwipe) : ""}
    </Slick>
  );
};
