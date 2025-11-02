import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Gallery from "./components/Gallery";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY;
  const PER_PAGE = 30;

  // Fetch photos (with search and page)
  const fetchPhotos = async (search = query, pageNo = page) => {
    try {
      const url = search
        ? `https://api.unsplash.com/search/photos?query=${search}&page=${pageNo}&per_page=${PER_PAGE}&client_id=${UNSPLASH_KEY}`
        : `https://api.unsplash.com/photos?page=${pageNo}&per_page=${PER_PAGE}&client_id=${UNSPLASH_KEY}`;

      const res = await fetch(url);
      const data = await res.json();

      if (search) {
        setPhotos(data.results);
        setTotalPages(data.total_pages > 1000 ? 1000 : data.total_pages); // limit pages
      } else {
        setPhotos(data);
        setTotalPages(100); // Unsplash default max
      }
    } catch (err) {
      console.error("Error fetching photos:", err);
    }
  };

  // Random button
  const fetchRandomPage = async () => {
    const randomPage = Math.floor(Math.random() * 50) + 1;
    setPage(randomPage);
    fetchPhotos("", randomPage);
  };

  // Pagination click
  const handlePageClick = (pageNo) => {
    setPage(pageNo);
    fetchPhotos(query, pageNo);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <div
      className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        } min-h-screen transition-colors duration-300`}
    >
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        fetchRandom={fetchRandomPage}
        query={query}
        setQuery={setQuery}
        fetchPhotos={fetchPhotos}
      />
      <Gallery photos={photos} />

      {/* Pagination */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-white/80 dark:bg-gray-700/50 rounded-full py-3 px-4 shadow-lg z-50 backdrop-blur-2xl">
        {Array.from({ length: Math.min(7, totalPages) }).map((_, idx) => {
          let pageNo = 1;
          if (page <= 4) pageNo = idx + 1;
          else if (page >= totalPages - 3) pageNo = totalPages - 6 + idx;
          else pageNo = page - 3 + idx;

          return (
            <button
              key={idx}
              onClick={() => handlePageClick(pageNo)}
              className={`px-3 py-1 rounded-full cursor-pointer h-10 w-10 border border-gray-500 ${pageNo === page
                ? "bg-blue-800 text-md text-center font-extrabold -translate-y-2 text-white"
                : "bg-gray-200 text-sm dark:bg-gray-600 text-gray-800 dark:text-white font-bold font-mono  backdrop-blur-2xl hover:scale-105 hover:-translate-y-1 transition-all active:scale-95"
                }`}
            >
              {pageNo}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default App;
