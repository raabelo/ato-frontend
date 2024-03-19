import React from "react";

import Ancient1 from "../assets/artwork/Group 1.png";
import Ancient2 from "../assets/artwork/Group 3.png";

import { GameContext } from "../contexts/GameContext";
import iGamePlayer from "../types/interfaces/iGamePlayer";

const GameCharacter: React.FC<{ position: 1 | 2 }> = ({ position }) => {
    const { player1, player2 } = React.useContext(GameContext);

    const getCharacter = (player: iGamePlayer): string => {
        switch (player.character) {
            case 0:
                return Ancient1;
            case 1:
                return Ancient2;
            default:
                return Ancient1;
        }
    };

    if (position === 1) {
        return (
            <div
                className="size-[5.5rem] absolute left-[47.25%]
                            bottom-[24.25%]"
            >
                <img draggable={false} src={getCharacter(player1)} />
                <p className="absolute top-[135%] text-center text-white text-3xl w-full">
                    {player1.lifepoints}
                </p>
            </div>
        );
    } else {
        return (
            <div
                className="size-[5.5rem] absolute left-[47.25%]
                    top-[2.5%]"
            >
                <img draggable={false} src={getCharacter(player2)} />
                <p className="absolute top-[135%] text-center text-white text-3xl w-full">
                    {player2.lifepoints}
                </p>
            </div>
        );
    }
};

export default GameCharacter;
