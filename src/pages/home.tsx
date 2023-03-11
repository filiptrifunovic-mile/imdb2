import { useEffect, useState } from "react";
import Slider from "../components/slider/slider";
import Section from "../components/section";
import TrendingHero from "../components/trending-hero";
import { Film } from "../interfaces";

const Home = () => {
  const [trending, setTrending] = useState<Film[]>([]);

  const fetchTrendings = () => {
    const arrs: Film[] = [];

    for (let i = 0; i < 6; i++) {
      arrs.push({
        id: 1,
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam vero consequatur natus doloremque odit molestiae, sapiente, iste deleniti rem iure nihil adipisci aspernatur aliquid id architecto quasi sunt ullam deserunt!",
        coverPath: "",
        genreIds: [1, 2, 3, 4, 5, 6],
        posterPath: "",
        seasons: [],
      });
    }
    setTrending(arrs);
  };

  useEffect(() => {
    fetchTrendings();
  }, []);

  return (
    <div>
      <Section className="py-0">
        <Slider
          className="slick-hero"
          autoplay={true}
          slidesToShow={1}
          slidesToScroll={1}
        >
          {trending.map((film, i) => (
            <TrendingHero film={film} key={i}></TrendingHero>
          ))}
        </Slider>
      </Section>
    </div>
  );
};

export default Home;
