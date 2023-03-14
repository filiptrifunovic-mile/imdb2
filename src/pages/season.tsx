import { useState } from "react";
import Image from "../components/image";
import Section from "../components/section";
import { Film } from "../interfaces";

const Season = () => {
  const [film, setFilm] = useState<Film>({
    id: 0,
    coverPath: "",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut nam voluptate assumenda optio eum officiis, voluptatibus quisquam repellat quaerat unde minima doloribus nulla nesciunt. Cumque eaque quam ea incidunt id.",
    posterPath: "",
    genreIds: [1, 2, 3, 4],
    mediaType: "tv",
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

  return (
    <>
      <div className="h-[150px] top-0 left-0 right-0 relative">
        <div className="overlay-film-cover"></div>
        <Image src=""></Image>
      </div>
      <Section className="-mt-[75px] flex items-center relative z-10 mobile:block">
        <Image
          src=""
          className="w-[150px] min-w-[150px] min-h-[200px] mobile:mx-auto"
        ></Image>
        <div className="px-3 flex flex-col gap-3">
          <p className="text-xl line-clamp-1">{film.title}</p>
          <p className="line-clamp-3 opacity-[0.9]">Season 1</p>
        </div>
      </Section>
    </>
  );
};

export default Season;
