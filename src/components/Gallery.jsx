import React, { useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Gallery = ({ photos, selectedIndex, setSelectedIndex }) => {
    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") setSelectedIndex(null);
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "ArrowLeft") prevImage();
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    });

    const nextImage = () => {
        if (selectedIndex === null) return;
        setSelectedIndex((prev) => (prev + 1) % photos.length);
    };

    const prevImage = () => {
        if (selectedIndex === null) return;
        setSelectedIndex((prev) => (prev - 1 + photos.length) % photos.length);
    };

    return (
        <div className="p-6 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {photos.map((photo, index) => (
                <div
                    key={photo.id}
                    onClick={() => setSelectedIndex(index)}
                    className="relative group cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
                >
                    <img
                        src={photo.urls.small}
                        alt={photo.alt_description || "Unsplash Image"}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />

                    {/* Overlay info */}
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/50 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        {photo.user?.name || "Unknown"}
                    </div>

                    {/* Download icon (on hover) */}
                    <a
                        href={`${photo.links.download}?force=true`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 text-gray-900 rounded-full p-2 hover:bg-white"
                        title="Download"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Download size={18} />
                    </a>
                </div>
            ))}

            {/* Fullscreen modal */}
            <AnimatePresence>
                {selectedIndex !== null && (
                    <motion.div
                        className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setSelectedIndex(null)}
                            className="absolute top-4 right-4 text-white hover:text-gray-300 p-2 z-50"
                        >
                            <X size={28} />
                        </button>

                        {/* Prev button */}
                        <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 p-2 z-50"
                        >
                            <ChevronLeft size={40} />
                        </button>

                        {/* Next button */}
                        <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 p-2 z-50"
                        >
                            <ChevronRight size={40} />
                        </button>

                        {/* Animated Image */}
                        <motion.img
                            key={photos[selectedIndex].id}
                            src={photos[selectedIndex].urls.regular}
                            alt="Full view"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-lg"
                        />

                        {/* Info + Download fixed overlay */}
                        <div className="absolute bottom-8 flex flex-col items-center gap-2 text-center z-50">
                            <p className="text-lg font-semibold text-white">
                                {photos[selectedIndex].user?.name}
                            </p>
                            <a
                                href={photos[selectedIndex].links.html}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-400 hover:underline"
                            >
                                View on Unsplash
                            </a>
                            <a
                                href={`${photos[selectedIndex].links.download}?force=true`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-3 flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-medium transition-all active:scale-95"
                            >
                                <Download size={18} /> Download
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Gallery;
