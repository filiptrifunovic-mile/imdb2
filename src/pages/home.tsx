import { useEffect, useState } from "react";
import { Slider } from "../components/slider/slider";
import Section from "../components/section";
import TrendingHero from "../components/trending-hero";
import { Film } from "../interfaces";
import Card from "../components/card";
import { useNavigate } from "react-router-dom";
import {
  getInTheaters,
  getPopulars,
  getTopRated,
  getTrailers,
  getTrendings,
} from "../api/tmdb-api";
import { isFilm, mergeFilms, tmdbImageSrc } from "../utils";
import { TrailerModal } from "../components/trailer-modal";

const Home = () => {
  const [trending, setTrending] = useState<Film[]>([]);
  const [inTheates, setinTheates] = useState<Film[]>([]);
  const [populars, setPopulars] = useState<Film[]>([]);
  const [topRatedTv, setTopRatedTv] = useState<Film[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Film[]>([]);
  const [trailerSrc, setTrailerSrc] = useState("");
  const navigate = useNavigate();

  const playTrailer = async (film: Film) => {
    const trailers = await getTrailers(film.mediaType, film.id);

    setTrailerSrc(
      `https://www.youtube.com/embed/${trailers[0].key}?autoplay=0`
    );
  };

  const goToDetailsPage = (film: Film) => {
    navigate(`/${film.mediaType}/${film.id}`);
  };

  const fetchTopRatedMovie = async () => {
    setTopRatedMovies(await (await getTopRated("movie")).films);
  };

  const fetchTopRatedTv = async () => {
    setTopRatedTv(await (await getTopRated("tv")).films);
  };

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
    fetchTopRatedMovie();
    fetchTopRatedTv();
  }, []);

  return (
    <>
      <TrailerModal
        onHide={() => setTrailerSrc("")}
        src={trailerSrc}
      ></TrailerModal>
      <Section className="py-0" hidden={trending.length === 0}>
        <Slider
          className="slick-hero"
          autoplay={true}
          slidesToShow={1}
          slidesToScroll={1}
        >
          {(onSwipe) =>
            trending.map((film, i) => (
              <TrendingHero
                onPlayTrailer={() => playTrailer(film)}
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
      <Section title="In Theaters" hidden={inTheates.length === 0}>
        <Slider isMovieCard={true}>
          {(_) =>
            inTheates.map((film, i) => (
              <Card
                onClick={() => goToDetailsPage(film)}
                title={film.title}
                imageSrc={tmdbImageSrc(film.posterPath)}
                key={i}
              ></Card>
            ))
          }
        </Slider>
      </Section>
      <Section title="What's Popular" hidden={populars.length === 0}>
        <Slider isMovieCard={true}>
          {(_) =>
            populars.map((film, i) => (
              <Card
                onClick={() => goToDetailsPage(film)}
                title={film.title}
                imageSrc={tmdbImageSrc(film.posterPath)}
                key={i}
              ></Card>
            ))
          }
        </Slider>
      </Section>
      <Section
        title="TOP Rated TV"
        hidden={topRatedTv.length === 0}
        onTitleClick={() => navigate(`/list/top-rated-tv`)}
      >
        <Slider isMovieCard={true}>
          {(_) =>
            topRatedTv.map((film, i) => (
              <Card
                onClick={() => goToDetailsPage(film)}
                title={film.title}
                imageSrc={tmdbImageSrc(film.posterPath)}
                key={i}
              ></Card>
            ))
          }
        </Slider>
      </Section>
      <Section
        title="TOP Rated Movies"
        hidden={topRatedMovies.length === 0}
        onTitleClick={() => navigate(`/list/top-rated-movies`)}
      >
        <Slider isMovieCard={true}>
          {(_) =>
            topRatedMovies.map((film, i) => (
              <Card
                onClick={() => goToDetailsPage(film)}
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
