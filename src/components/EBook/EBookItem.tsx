import type { Ebook } from "../../types/EbookType";
import { Link } from "react-router-dom";

const EBookItem = ({ ebook }: { ebook: Ebook }) => {
  return (
    <Link to={`/ebooks/${ebook.id}`}>
      <div className="flex flex-col items-center p-2 group cursor-pointer transform transition duration-300 hover:scale-105">
        <div className="w-full aspect-2/3 overflow-hidden rounded-lg shadow-xl group-hover:shadow-2xl transition duration-300">
          <img
            src={ebook.coverUrl}
            alt={`Bìa sách ${ebook.title}`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="mt-3 w-full text-center">
          <p
            className="text-sm font-semibold text-gray-800 truncate"
            title={ebook.title}
          >
            {ebook.title}
          </p>
          <p className="text-xs text-gray-500 truncate" title={ebook.author}>
            {ebook.author}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default EBookItem;
