import { CustomComponentProps } from "../interfaces";
import { mergeClassName } from "../utils";

interface Props extends CustomComponentProps {
  src: string;
}

const Image = (props: Props) => {
  return (
    <div
      className={mergeClassName("bg-primary w-full h-full", props.className)}
    >
      <img src={props.src} className="w-full h-full" alt="image2" />
    </div>
  );
};

export default Image;
