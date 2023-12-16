import { Link}  from 'react-router-dom'

const Card = ({name,image,description,id}) => {
  return (
    <>
      <div className="max-w-xs rounded overflow-hidden shadow-lg">
        <div className="h">
          <img
            width={"full"}
            src={image || "https://picsum.photos/id/238/200/300"}
            alt="Sunset in the mountains"
          />{" "}
        </div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{name}</div>
          <p className="text-gray-700 text-base">
            {description}
          </p>
        </div>
        <Link to={`/hotel/${id}`}>
        <button className="p-3 bg-red-700 text-white ml-3 rounded-md mb-5">
          view details
        </button>
        </Link>
      </div>
    </>
  );
};

export default Card;
