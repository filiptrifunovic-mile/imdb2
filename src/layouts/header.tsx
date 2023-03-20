import Container from "../components/container";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { mergeClassName } from "../utils";
import { IoIosSearch } from "react-icons/io";
import SearchResult from "../components/search-result";

const MENU_CLASS = `
  py-1
  px-1.5
  hover:bg-primary
  rounded-md
  mobile:px-6
`;

const MENU_CLASS_ACTIVE = `
  bg-primary
`;

const Header = () => {
  const location = useLocation();
  const [pathname, setPathname] = useState("");

  const [keyword, setKeyword] = useState("");

  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const [params, _] = useSearchParams();
  const navigate = useNavigate();
  const pathnameRef = useRef("");
  const defaultKeyword = useRef("");
  const searchRef = useRef<HTMLInputElement>(null);

  function goToSearchPage() {
    if (keyword) {
      defaultKeyword.current = keyword;
      navigate(`/search?q=${keyword}`);
      setIsSearchFocused(false);
      searchRef.current?.blur();
    }
  }

  function initKeyword() {
    if (pathnameRef.current === "/search") {
      setKeyword(defaultKeyword.current);
    } else {
      setKeyword("");
    }
  }

  function onWindowClick() {
    setIsSearchFocused(false);
    initKeyword();
  }

  function getMenuClass(path: string) {
    if (path === pathname) {
      return mergeClassName(MENU_CLASS, MENU_CLASS_ACTIVE);
    }
    return mergeClassName(MENU_CLASS, "");
  }

  useEffect(() => {
    setPathname(location.pathname);
    pathnameRef.current = location.pathname;
    defaultKeyword.current = params.get("q") || "";
    initKeyword();
  }, [location.pathname]);

  useEffect(() => {
    window.addEventListener("click", onWindowClick);

    return () => {
      window.removeEventListener("click", onWindowClick);
    };
  }, []);

  return (
    <div className="bg-header sticky top-0 z-[99]">
      <Container className="flex items-center justify-between gap-3">
        {/* brand and menu */}
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-semibold">
            <Link to={"/"}>MovieSpace</Link>
          </h1>
          <div
            className="flex items-center gap-1.5 pt-1.5 mobile:fixed
            mobile:bottom-0
            mobile:left-0
            mobile:right-0
            mobile:justify-center
            mobile:py-3
            mobile:bg-header
            mobile:gap-6"
          >
            <Link className={getMenuClass("/movies")} to={"/movies"}>
              Movies
            </Link>
            <Link className={getMenuClass("/tv")} to={"/tv"}>
              TV
            </Link>
          </div>
        </div>
        <div className="border-b-[1.5px] border-white flex items-center p-1 flex-[0.5] focus-within:border-primary relative">
          <input
            onClick={(e) => {
              e.stopPropagation();
              setIsSearchFocused(true);
            }}
            value={keyword}
            onKeyDown={(e) => (e.key === "Enter" ? goToSearchPage() : "")}
            onInput={(e) => setKeyword(e.currentTarget.value)}
            type="text"
            className="bg-transparent outline-0 flex-1"
            placeholder="Search..."
          />
          <IoIosSearch size={18}></IoIosSearch>
          {isSearchFocused && keyword ? (
            <SearchResult
              keyword={keyword}
              goToSearchPage={goToSearchPage}
            ></SearchResult>
          ) : (
            ""
          )}
        </div>
      </Container>
    </div>
  );
};

export default Header;
