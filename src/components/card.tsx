import { CustomComponentProps, Film } from "../interfaces";
import Image from "./image";

interface Props extends CustomComponentProps {
  imageSrc: string;
  title?: string;
  onClick?: Function;
}

const Card = (props: Props) => {
  return (
    <div
      onClick={() => (props.onClick ? props.onClick() : "")}
      className="mx-3 my-1.5 cursor-pointer"
      //flex flex-col items-center
    >
      <Image
        src={props.imageSrc}
        className="flex-1 h-[300px] rounded-lg overflow-hidden"
        //min-h-[200px] h-[200px] max-w-[200px] justify-center
      ></Image>
      <p className="py-1.5 line-clamp-2">{props.title}</p>
      {props.children}
    </div>
  );
};

export default Card;
