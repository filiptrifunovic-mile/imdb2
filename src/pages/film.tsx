import { useState } from "react";
import { useParams } from "react-router-dom";
import Image from "../components/image";
import Section from "../components/section";
import { Film as FilmInterface } from "../interfaces";
import { MediaType } from "../types";

interface Props {
  mediaType: MediaType;
}

const Film = (props: Props) => {
  const { params } = useParams();

  const [film, setFilm] = useState<FilmInterface>({
    id: 0,
    coverPath: "",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut nam voluptate assumenda optio eum officiis, voluptatibus quisquam repellat quaerat unde minima doloribus nulla nesciunt. Cumque eaque quam ea incidunt id.",
    posterPath: "",
    genreIds: [1, 2, 3, 4],
    mediaType: props.mediaType,
    seasons: [],
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  });

  return (
    <>
      <div className="h-[300px] top-0 left-0 right-0">
        <div className="overlay-film-cover"></div>
        <Image src=""></Image>
      </div>
      <Section className="-mt-[150px] flex items-center relative z-10 mobile:block">
        <Image
          src=""
          className="w-[200px] min-w-[200px] h-[300px] mobile:mx-auto"
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
    </>
  );
};

export default Film;
