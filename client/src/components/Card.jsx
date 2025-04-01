import { useGlobal } from "./GlobalProvider";
import noImageAvailable from "../assets/noImageAvailable.jpg";

const Card = ({ data }) => {
  const { isDarkMode } = useGlobal();

  return (
    <article
      className={`${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      } p-6 rounded-lg shadow-md transition duration-300 hover:shadow-lg flex flex-col gap-4`}
    >
      <div className="relative w-full">
        <img
          src={data.imageUrl || noImageAvailable}
          alt="post-img"
          className="w-full h-60 object-cover rounded-lg"
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold">{data.title}</h2>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-400">{data.content}</p>
        <p className="text-xs text-gray-500">Published: {new Date(data.createdAt).toLocaleDateString()}</p>
        {data.writtenBy&& <p className="text-sm font-medium">Written by: {data.writtenBy}</p>}
      </div>
    </article>
  );
};

export default Card;