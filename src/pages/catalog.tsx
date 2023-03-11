import { MediaType } from "../types";

interface Props {
  type: MediaType | "search";
}

const Catalog = (props: Props) => {
  return <div>{props.type}</div>;
};

export default Catalog;
