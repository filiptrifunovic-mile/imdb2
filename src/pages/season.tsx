import { useEffect, useState } from "react";
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

  const [episodes, setEpisodes] = useState<any[]>();

  const fetch = () => {
    const arrs: any[] = [];

    for (let i = 0; i < 12; i++) {
      arrs.push({});
    }
    setEpisodes(arrs);
  };

  useEffect(() => {
    fetch();
  }, []);

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
          <p className="opacity-[0.9]">
            Season 1 | {episodes?.length} episodes{" "}
          </p>
        </div>
      </Section>
      <Section title="Episodes">
        {episodes?.map((episode, i) => (
          <div
            className="my-6 flex items-stretch gap-4 rounded-md overflow-hidden cursor-pointer hover:bg-primary px-3 py-1.5"
            key={i}
          >
            <Image src="" className="w-[300px] min-w-[300px] h-[350px]"></Image>
            <div className="overflow-hidden flex flex-col gap-3">
              <p className="text-lg truncate">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Voluptate nemo consequatur culpa molestias, natus consectetur,
                dignissimos, veniam eveniet impedit veritatis iure adipisci
                nihil? Recusandae corrupti atque, aliquam quod esse optio!
              </p>
              <p className="opacity-[0.9] line-clamp-5">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. In
                deleniti nemo ex sunt dolor. Minus ipsa asperiores hic
                voluptatem laborum exercitationem animi, eos corrupti recusandae
                molestias quasi voluptate ad facilis.
              </p>
              <div className="mt-auto pt-3 text-right">14 March 2023</div>
            </div>
          </div>
        ))}
      </Section>
    </>
  );
};

export default Season;
