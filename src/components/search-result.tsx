import { logRoles } from "@testing-library/react";
import { useEffect, useState } from "react";
import { IoLogoChrome } from "react-icons/io";
import { Film } from "../interfaces";
import Image from "./image";

interface Props {
  keyword: string;
  goToSearchPage: Function;
}

const SearchResult = (props: Props) => {
  const [items, setItems] = useState<Film[]>([]);

  const [totalItem, setTotalItem] = useState(6);

  const fetch = () => {
    const arrs: Film[] = [];

    for (let i = 0; i < 6; i++) {
      arrs.push({
        id: 1,
        title:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam vero consequatur natus doloremque odit molestiae, sapiente, iste deleniti rem iure nihil adipisci aspernatur aliquid id architecto quasi sunt ullam deserunt!",
        description: "",
        coverPath: "",
        genreIds: [1, 2, 3, 4, 5, 6],
        posterPath: "",
        seasons: [],
      });
    }
    setItems(arrs);
  };

  useEffect(() => {
    fetch();
  }, [props.keyword]);

  return (
    <div className="absolute top-[48px] left-0 right-0 rounded-md overflow-hidden bg-header">
      {items.map((film, i) => (
        <div
          key={i}
          className="flex items-start p-1.5 rounded-lg hover:bg-primary cursor-pointer m-1.5"
        >
          <Image
            className="h-[72px] min-w-[102px] w-[102px] rounded-md"
            src=""
          />
          <div className="px-3 truncate">
            <p className="text-base truncate">{film.title}</p>
            <ul className="flex flex-wrap gap-x-1.5 text-sm opacity-[0.7]">
              {film.genreIds.map((id, i) => (
                <li key={i}>item {i}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
      {totalItem > 5 ? (
        <button
          onClick={() => props.goToSearchPage()}
          className="px-3 py-1.5 bg-primary w-full hover:text-body"
        >
          More results
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default SearchResult;
