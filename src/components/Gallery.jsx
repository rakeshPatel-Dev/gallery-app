import React from "react";
import { Download } from "lucide-react";

const Gallery = ({ photos }) => {
    return (
        console.log(photos),

        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 p-4">
            {photos.map((photo) => (
                <div key={photo.id} className="relative group overflow-hidden rounded-xl">
                    <div
                        className="w-full aspect-4/3 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                        style={{ backgroundImage: `url(${photo.urls.small})` }}
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center gap-2">
                        {/* <p className="text-white font-medium">{photo.alt_description || "Untitled"}</p> */}


                        <a
                            href={photo.links.download + "?force=true"}
                            target="_blank"
                            rel="noreferrer"
                            className=" flex flex-row items-center gap-2 text-sm px-4 py-2 bg-blue-800 opacity-70 backdrop-blur-3xl hover:bg-blue-900 active:scale-95 transition-all text-white rounded-md"
                        >
                            <Download size={20} />  Download
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Gallery;
