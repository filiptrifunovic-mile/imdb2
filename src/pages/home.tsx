import { useEffect, useState } from "react";
import { Slider } from "../components/slider/slider";
import Section from "../components/section";
import TrendingHero from "../components/trending-hero";
import { Film } from "../interfaces";
import Card from "../components/card";
import { useNavigate } from "react-router-dom";
import { getInTheaters, getPopulars, getTrendings } from "../api/tmdb-api";
import { isFilm, mergeFilms, tmdbImageSrc } from "../utils";

const Home = () => {
  const [trending, setTrending] = useState<Film[]>([]);
  const [inTheates, setinTheates] = useState<Film[]>([]);
  const [populars, setPopulars] = useState<Film[]>([]);
  const navigate = useNavigate();

  const fetchPopulars = async () => {
    const movies = await getPopulars("movie");
    const tvs = await getPopulars("tv");

    setPopulars(mergeFilms(movies, tvs, 20));
  };

  const fetchInTheaters = async () => {
    setinTheates(await getInTheaters());
  };

  const fetchTrending = async () => {
    const movies = await getTrendings("movie");
    const tvs = await getTrendings("tv");

    setTrending(mergeFilms(movies, tvs));
  };

  useEffect(() => {
    fetchTrending();
    fetchInTheaters();
    fetchPopulars();
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
          {(onSwipe) =>
            trending.map((film, i) => (
              <TrendingHero
                onClick={() =>
                  !onSwipe ? navigate(`/${film.mediaType}/${film.id}`) : ""
                }
                film={film}
                key={i}
              ></TrendingHero>
            ))
          }
        </Slider>
      </Section>
      <Section title="In Theaters">
        <Slider isMovieCard={true}>
          {(_) =>
            inTheates.map((film, i) => (
              <Card
                title={film.title}
                imageSrc={tmdbImageSrc(film.posterPath)}
                key={i}
              ></Card>
            ))
          }
        </Slider>
      </Section>
      <Section title="What's Popular">
        <Slider isMovieCard={true}>
          {(_) =>
            populars.map((film, i) => (
              <Card
                title={film.title}
                imageSrc={tmdbImageSrc(film.posterPath)}
                key={i}
              ></Card>
            ))
          }
        </Slider>
      </Section>
      <Section title="TOP Rated TV">
        <Slider isMovieCard={true}>
          {(_) =>
            inTheates.map((film, i) => (
              <Card
                title={film.title}
                imageSrc={tmdbImageSrc(film.posterPath)}
                key={i}
              ></Card>
            ))
          }
        </Slider>
      </Section>
      <Section title="TOP Rated Movies">
        <Slider isMovieCard={true}>
          {(_) =>
            inTheates.map((film, i) => (
              <Card
                title={film.title}
                imageSrc={tmdbImageSrc(film.posterPath)}
                key={i}
              ></Card>
            ))
          }
        </Slider>
      </Section>
    </>
  );
};

export default Home;
