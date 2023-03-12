import "./slider.css";
import Slick, { Settings } from "react-slick";

interface Props extends Settings {
  isMovieCard?: boolean;
  isSeasonCard?: boolean;
}

export const Slider = (props: Props) => {
  let settings: Settings = {
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

  return (
    <Slick {...settings} autoplaySpeed={5000}>
      {props.children}
    </Slick>
  );
};
