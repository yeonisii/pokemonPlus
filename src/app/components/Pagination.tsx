import React from "react";

interface PaginationProps {
  totalPages: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, page, setPage }) => {
  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
        className="px-4 py-2 mx-1 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800"
      >
        Prev
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => setPage(index + 1)}
          className={`px-4 py-2 mx-1 rounded-md ${
            page === index + 1
              ? "bg-gradient-to-br from-pink-400 to-purple-600 text-white"
              : "bg-gray-200 hover:bg-gray-300 text-gray-800"
          }`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={page === totalPages}
        className="px-4 py-2 mx-1 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
