import { MediaType } from "../types";
import { useEffect, useState } from "react";
import { Film } from "../interfaces";
import Image from "../components/image";
import Section from "../components/section";
import { useSearchParams } from "react-router-dom";
import Card from "../components/card";

interface Props {
  type: MediaType | "search";
}

const Catalog = (props: Props) => {
  let title = "";

  const [films, setFilms] = useState<Film[]>([]);
  const [params, _] = useSearchParams();

  switch (props.type) {
    case "movie":
      title = "Movies";
      break;

    case "tv":
      title = "TV";
      break;

    case "search":
      title = `Search results for <i>${params.get("q")}</i>`;
      break;

    default:
      break;
  }

  const fetch = () => {
    const arrs: any[] = [];

    for (let i = 0; i < 20; i++) {
      arrs.push({
        title:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, reiciendis quisquam tempora exercitationem quo tempore incidunt explicabo a odit quod minus distinctio excepturi sapiente quasi eos quidem voluptates ex ipsam.",
      });
    }
    setFilms(arrs);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      <div className="h-[120px] top-0 left-0 right-0 relative">
        <div className="overlay-film-cover"></div>
        <Image src=""></Image>
      </div>
      <Section
        className="-mt-[90px] flex items-center relative z-10"
        title={title}
      ></Section>
      <Section>
        <div className="grid lg:grid-cols-4 sm:grid-cols-3 mobile:grid-cols-1 relative z-[11]">
          {films.map((film, i) => (
            <div>
              <Card imageSrc="" title={film.title} key={i}></Card>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
};

export default Catalog;
