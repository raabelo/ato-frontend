import React, { useState } from "react";
import { ArrowsPointingInIcon, ArrowsPointingOutIcon } from "@heroicons/react/24/solid";

const BtnFullscreen: React.FC = () => {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullscreen = () => {
        const rootElement = document.documentElement;

        if (!isFullscreen) {
            if (rootElement.requestFullscreen) {
                rootElement.requestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
        setIsFullscreen((prevState) => !prevState);
    };

    return (
        <button
            type="button"
            onClick={toggleFullscreen}
            className={`z-[100] fixed top-2 right-2 bg-black rounded-full 
                        p-1 border border-white text-white opacity-50
                        hover:opacity-100`}
        >
            {isFullscreen ? (
                <ArrowsPointingInIcon className="h-4 w-4" />
            ) : (
                <ArrowsPointingOutIcon className="h-4 w-4" />
            )}
        </button>
    );
};

export default BtnFullscreen;
