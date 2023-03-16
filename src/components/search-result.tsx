import { logRoles } from "@testing-library/react";
import { useEffect, useRef, useState } from "react";
import { IoLogoChrome } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { search } from "../api/tmdb-api";
import { Film } from "../interfaces";
import { tmdbImageSrc } from "../utils";
import { useGlobalContext } from "./app-container";
import Image from "./image";

interface Props {
  keyword: string;
  goToSearchPage: Function;
}

const SearchResult = (props: Props) => {
  const [items, setItems] = useState<Film[]>([]);

  const [totalItem, setTotalItem] = useState(0);

  const searchTimeout = useRef<any>("");

  const globalContext = useGlobalContext();

  const navigate = useNavigate();

  const fetch = async () => {
    if (!props.keyword) return;

    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(async () => {
      const res = await search(props.keyword);
      setTotalItem(res.totalResults);
      setItems(res.films);
    }, 120);
  };

  useEffect(() => {
    fetch();
  }, [props.keyword]);

  return (
    <div className="absolute top-[48px] left-0 right-0 rounded-md bg-header overflow-auto  shadow-lg">
      <div className="scrollbar scrollbar-thumb-primary scrollbar-track-header max-h-[480px] pr-3 ">
        {items.map((film, i) => (
          <div
            key={i}
            className="flex items-start p-1.5 rounded-lg hover:bg-primary cursor-pointer m-1.5"
            onClick={() => navigate(`${film.mediaType}/${film.id}`)}
          >
            <img
              className="h-[110px] w-[auto] rounded-md object-cover"
              src={tmdbImageSrc(film.posterPath)}
              alt="image3"
            />
            <div className="px-3 truncate">
              <p className="text-base truncate">{film.title}</p>
              <ul className="flex flex-wrap gap-x-1.5 text-sm opacity-[0.7]">
                {film.genreIds.map((id, i) => (
                  <li key={i}>
                    {
                      globalContext.genres[film.mediaType].find(
                        (g) => g.id === id
                      )?.name
                    }
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      {totalItem > 5 ? (
        <button
          onClick={() => props.goToSearchPage()}
          className="px-3 py-1.5 bg-primary w-full hover:text-body sticky bottom-0 shadow-lg"
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
