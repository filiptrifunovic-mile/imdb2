import { FaSpinner } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="flex items-center gap-3">
      <FaSpinner className="animate-spin" size={18} />
      <span>Loading...</span>
    </div>
  );
};

export default Loading;