import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCasts, getDetail } from "../api/tmdb-api";
import { useGlobalContext } from "../components/app-container";
import Card from "../components/card";
import Image from "../components/image";
import Section from "../components/section";
import { Slider } from "../components/slider/slider";
import { Cast, Film as FilmInterface, Trailer } from "../interfaces";
import { MediaType } from "../types";
import { tmdbImageSrc } from "../utils";

interface Props {
  mediaType: MediaType;
}

const Film = (props: Props) => {
  const navigate = useNavigate();
  const { id } = useParams<any>();

  const [film, setFilm] = useState<FilmInterface | null>(null);

  const [cast, setCast] = useState<Cast[]>([]);
  const [trailers, setTrailers] = useState<Trailer[]>([]);
  const [recommendations, setRecommendations] = useState<FilmInterface[]>([]);

  const globalContext = useGlobalContext();

  const fetch = async () => {
    const film = await getDetail(props.mediaType, parseInt(id as string));

    if (film) {
      setFilm(film);
      setCast(await getCasts(film?.mediaType, film.id));
    }

    const arrs: any[] = [];

    for (let i = 0; i < 20; i++) {
      arrs.push({});
    }
    setTrailers(arrs);
    setRecommendations(arrs);
  };

  useEffect(() => {
    fetch();
  }, []);

  if (!film) {
    return <div>404</div>;
  }

  return (
    <>
      <div className="h-[300px] top-0 left-0 right-0 relative">
        <div className="overlay-film-cover"></div>
        <Image src={tmdbImageSrc(film.coverPath)}></Image>
      </div>
      <Section className="-mt-[150px] flex items-center relative z-10 mobile:block">
        <Image
          src={tmdbImageSrc(film.posterPath)}
          className="w-[100px] min-w-[200px] h-[340px] mobile:mx-auto mobile:mb-10"
        ></Image>
        <div className="px-3 flex flex-col gap-3">
          <p className="text-xl line-clamp-1">{film.title}</p>
          <ul className="flex items-center gap-3">
            {film.genreIds.map((id, i) => (
              <li
                key={id}
                className="px-3 py-1.5 bg-primary rounded-lg text-sm"
              >
                {
                  globalContext.genres[film.mediaType]?.find((g) => g.id === id)
                    ?.name
                }
              </li>
            ))}
          </ul>
          <p className="line-clamp-3 opacity-[0.9]">{film.description}</p>
        </div>
      </Section>
      <Section title="Casts">
        <div className="scrollbar scrollbar-thumb-primary scrollbar-track-header">
          <div className="flex items-center gap-3">
            {cast.map((cast, i) => (
              //mozda ne w-200
              <div className="flex-shrink-0 w-[200px] mb-6" key={i}>
                <Card imageSrc={tmdbImageSrc(cast.profilePath)}>
                  <p className="font-semibold text-xl">{cast.name}</p>
                  <p className="opacity-[0.7] text-sm">{cast.characterName}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </Section>
      {/* trailers */}
      <Section title="Trailers">
        <div className="scrollbar scrollbar-thumb-primary scrollbar-track-header">
          <div className="flex items-center gap-3">
            {cast.map((cast, i) => (
              //mozda ne w-200
              <div className="flex-shrink-0 w-[300px] my-3" key={i}>
                <Card imageSrc="" title=""></Card>
              </div>
            ))}
          </div>
        </div>
      </Section>
      {/* seasons */}
      <Section title="Seasons">
        <Slider slidesToShow={2} slidesToScroll={2}>
          {(_) =>
            film.seasons.map((season, i) => (
              <Card
                onClick={() =>
                  navigate(`/tv/${film.id}/season/${season.seasonNumber}`)
                }
                title={`Season ${season.seasonNumber}`}
                imageSrc=""
                key={i}
              ></Card>
            ))
          }
        </Slider>
      </Section>
      <Section title="Recommendations">
        <Slider isMovieCard={true} autoplay={true}>
          {(_) =>
            recommendations.map((film, i) => (
              <Card title={film.title} imageSrc="" key={i}></Card>
            ))
          }
        </Slider>
      </Section>
    </>
  );
};

export default Film;
