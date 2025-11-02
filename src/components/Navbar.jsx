import React from "react";
import { Search, Landmark, Sun, MoonStar, Shuffle } from "lucide-react";

const Navbar = ({ darkMode, setDarkMode, fetchRandom, query, setQuery, fetchPhotos }) => {
    const handleSearch = (e) => {
        e.preventDefault();
        fetchPhotos(query, 1);
    };

    return (
        <header className="sticky top-0 z-20 bg-white/80 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">

            {/* Logo */}
            <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200 font-extrabold text-2xl md:text-3xl">
                <Landmark strokeWidth={2.5} size={30} /> PhotoLab
            </div>

            {/* Search */}
            <form
                onSubmit={handleSearch}
                className="flex flex-1 w-full max-w-md md:max-w-lg gap-2"
            >
                <div className="flex flex-1 items-center rounded-lg bg-gray-100 dark:bg-gray-700 px-3 py-2 w-full">
                    <Search className="text-gray-400 dark:text-gray-300" />
                    <input
                        type="text"
                        placeholder="Search images..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="ml-2 w-full bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-400 text-sm md:text-base"
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium active:scale-95 transition-all cursor-pointer"
                >
                    Search
                </button>
            </form>

            {/* Dark mode + Random */}
            <div className="flex gap-2">
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500 cursor-pointer transition-all"
                >
                    {darkMode ? <Sun strokeWidth={2.5} size={20} /> : <MoonStar strokeWidth={2.5} size={20} />}
                </button>

                <button
                    onClick={fetchRandom}
                    className="flex items-center gap-1 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 active:scale-95 transition-all cursor-pointer"
                >
                    <Shuffle size={18} /> Random
                </button>
            </div>
        </header>
    );
};

export default Navbar;
