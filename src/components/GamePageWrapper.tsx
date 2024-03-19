import React from "react";
import BtnFullscreen from "./BtnFullscreen";
import BtnSettings from "./BtnSettings";
// import BtnChat from "./BtnChat";

const GamePageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="bg-game-board bg-cover">
            <>
                <BtnFullscreen />
                <BtnSettings />
                {/* <BtnChat /> */}
            </>
            <div className="place-items-center w-full h-full">{children}</div>
        </div>
    );
};

export default GamePageWrapper;
