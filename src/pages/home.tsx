import { useEffect, useState } from "react";
import { Slider } from "../components/slider/slider";
import Section from "../components/section";
import TrendingHero from "../components/trending-hero";
import { Film } from "../interfaces";
import Card from "../components/card";

const Home = () => {
  const [trending, setTrending] = useState<Film[]>([]);
  const [inTheates, setinTheates] = useState<Film[]>([]);

  const fetch = () => {
    const arrs: Film[] = [];

    for (let i = 0; i < 6; i++) {
      arrs.push({
        id: 1,
        mediaType: "tv",
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
    setinTheates(arrs);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
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
      <Section title="In Theaters">
        <Slider
          isMovieCard={true}
          autoplay={true}
          slidesToShow={5}
          slidesToScroll={5}
        >
          {inTheates.map((film, i) => (
            <Card film={film} key={i}></Card>
          ))}
        </Slider>
      </Section>
    </>
  );
};

export default Home;
