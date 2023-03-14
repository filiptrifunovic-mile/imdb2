import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../components/card";
import Image from "../components/image";
import Section from "../components/section";
import { Slider } from "../components/slider/slider";
import { Cast, Film as FilmInterface, Trailer } from "../interfaces";
import { MediaType } from "../types";

interface Props {
  mediaType: MediaType;
}

const Film = (props: Props) => {
  const navigate = useNavigate();
  const { params } = useParams();

  const [film, setFilm] = useState<FilmInterface>({
    id: 0,
    coverPath: "",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut nam voluptate assumenda optio eum officiis, voluptatibus quisquam repellat quaerat unde minima doloribus nulla nesciunt. Cumque eaque quam ea incidunt id.",
    posterPath: "",
    genreIds: [1, 2, 3, 4],
    mediaType: props.mediaType,
    seasons: [
      {
        id: 1,
        seasonNumber: 1,
      },
      {
        id: 2,
        seasonNumber: 2,
      },
      {
        id: 3,
        seasonNumber: 3,
      },
    ],
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  });

  const [cast, setCast] = useState<Cast[]>([]);
  const [trailers, setTrailers] = useState<Trailer[]>([]);
  const [recommendations, setRecommendations] = useState<FilmInterface[]>([]);

  const fetch = () => {
    const arrs: any[] = [];

    for (let i = 0; i < 20; i++) {
      arrs.push({});
    }
    setCast(arrs);
    setTrailers(arrs);
    setRecommendations(arrs);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      <div className="h-[300px] top-0 left-0 right-0 relative">
        <div className="overlay-film-cover"></div>
        <Image src=""></Image>
      </div>
      <Section className="-mt-[150px] flex items-center relative z-10 mobile:block">
        <Image
          src=""
          className="w-[200px] min-w-[200px] h-[340px] mobile:mx-auto"
        ></Image>
        <div className="px-3 flex flex-col gap-3">
          <p className="text-xl line-clamp-1">{film.title}</p>
          <ul className="flex items-center gap-3">
            {film.genreIds.map((genre, i) => (
              <li className="px-3 py-1.5 bg-primary text-sm" key={i}>
                item {i}{" "}
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
              <div className="flex-shrink-0 w-[200px] my-3">
                <Card key={i} title="lorem" imageSrc=""></Card>
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
              <div className="flex-shrink-0 w-[300px] my-3">
                <Card key={i} imageSrc="" title=""></Card>
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
