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

const MENU_CLASS = `
  p-1.5
  hover:bg-primary
  rounded-md
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
  const searchRef = useRef<HTMLInputElement>(null);

  function goToSearchPage() {
    if (keyword) {
      navigate(`/search?q=${keyword}`);
      setIsSearchFocused(false);
      searchRef.current?.blur();
    }
  }

  function initKeyword() {
    if (pathnameRef.current === "/search") {
      setKeyword(params.get("q") || "");
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
    initKeyword();
  }, [location.pathname]);

  useEffect(() => {
    window.addEventListener("click", () => onWindowClick());
  }, []);

  return (
    <div className="bg-header">
      <Container className="flex items-center justify-between">
        {/* brand and menu */}
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-semibold">
            <Link to={"/"}>MovieSpace</Link>
          </h1>
          <div className="flex items-center gap-1.5 pt-1.5">
            <Link className={getMenuClass("/movies")} to={"/movies"}>
              Movies
            </Link>
            <Link className={getMenuClass("/tv")} to={"/tv"}>
              TV
            </Link>
          </div>
        </div>
        <div className="border-b border-white flex items-center p-1 flex-[0.5] focus-within:border-primary">
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
        </div>
      </Container>
    </div>
  );
};

export default Header;
