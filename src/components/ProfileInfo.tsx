import React from "react";
import { GameContext } from "../contexts/GameContext";
import iGamePlayer from "../types/interfaces/iGamePlayer";

const ProfileInfo: React.FC<{
    style?: React.CSSProperties;
    position: 1 | 2;
}> = ({ style, position }) => {
    const { player1, player2 } = React.useContext(GameContext);

    const handleInfo = (): iGamePlayer => {
        if (position === 1) {
            return player1;
        } else {
            return player2;
        }
    };

    const locale = {
        left: "1rem",
        top: position === 2 ? "2rem" : "",
        bottom: position === 1 ? "2rem" : "",
    };

    return (
        <div className="absolute flex items-center gap-2 flex-1" style={{ ...style, ...locale }}>
            <div>
                <p className="text-primary font-bold">{handleInfo().name}</p>
                <p className="text-white text-sm">{handleInfo().title}</p>
            </div>
        </div>
    );
};

export default ProfileInfo;
