import React from "react";
import MenuPageWrapper from "../components/MenuPageWrapper";

import Btn1vs1 from "../assets/artwork/btn_1vs1.png";
// import Btn1vs1vs1vs1 from "../assets/artwork/btn_1vs1vs1vs1.png";

import iGameMode from "../types/interfaces/iGameMode";
import { useNavigate } from "react-router-dom";
import JoinQueue from "../events/controllers/JoinQueue";

interface BtnGameMode {
    name: string;
    picture: string;
    isActive?: boolean;
    onClick: () => void;
    titleOnly?: boolean;
    text?: string;
}

const BtnGameMode: React.FC<BtnGameMode> = React.memo(
    ({ name, picture, isActive = true, onClick, titleOnly = true, text }) => {
        return (
            <button
                type="button"
                className={`w-full h-full bg-cover bg-center :animate-pulse`}
                style={{ backgroundImage: `url(${picture})` }}
                onClick={onClick}
            >
                <div
                    className={`w-full h-full flex items-end ${!isActive && "backdrop-grayscale"}`}
                >
                    <div
                        className="text-white w-full bg-black/60 h-1/6 
                            p-4 flex flex-col items-start justify-center"
                    >
                        <p className="font-bold">{name}</p>
                        {!titleOnly && <p className="text-sm">{text}</p>}
                    </div>
                </div>
            </button>
        );
    }
);

const Play: React.FC = () => {
    const navigate = useNavigate();

    const [currentGameMode, setCurrentGameMode] = React.useState<number>(0);

    const gameModes: iGameMode[] = [
        {
            name: "1 vs 1",
            picture: Btn1vs1,
            text: "Jogue uma partida de 1 contra 1",
        },
        // { name: "1 vs 1 vs 1", picture: Btn1vs1 },
        // { name: "2 vs 2", picture: Btn1vs1 },
        // { name: "1 vs 1 vs 1 vs 1", picture: Btn1vs1vs1vs1 },
        // { name: "Arena", picture: Btn1vs1 },
    ];

    const handleGameMode = (i: number) => {
        setCurrentGameMode(i);
        console.log(i);
    };

    const handleJoinQueue = (player: string) => {
        JoinQueue(player, navigate);
    };

    return (
        <MenuPageWrapper>
            <div
                key={"gamemodes"}
                className={`grid gap-2 pt-10 h-3/5 
                            px-40 grid-cols-2`}
                style={{ gridTemplateColumns: "2.5fr 1.5fr" }}
            >
                <BtnGameMode
                    name={gameModes[0].name}
                    text={gameModes[0].text}
                    picture={gameModes[0].picture}
                    onClick={() => handleGameMode(0)}
                    isActive={currentGameMode === 0}
                    titleOnly={false}
                />
                <div className="grid grid-cols-2 gap-2">
                    {gameModes.map((_, i) => {
                        if (i > 0)
                            return (
                                <BtnGameMode
                                    key={(Math.random() * 1000).toString()}
                                    name={gameModes[i].name}
                                    picture={gameModes[i].picture}
                                    onClick={() => handleGameMode(i)}
                                    isActive={currentGameMode === i}
                                />
                            );
                    })}
                </div>
            </div>
            <div
                key={"lobby"}
                className={`grid gap-2 pt-8 h-2/5 
                            md:px-20 md:grid-cols-1
                            lg:px-40 lg:grid-cols-2`}
            >
                <div className="h-5/6">
                    <p className="text-center font-bold">Saguão</p>
                </div>
                <div className="h-5/6">
                    <button
                        type="button"
                        onClick={() => {
                            if (localStorage.getItem("uid")) {
                                handleJoinQueue(localStorage.getItem("uid") || "");
                            }
                        }}
                        className="text-white"
                    >
                        Buscar partida
                    </button>
                </div>
            </div>
        </MenuPageWrapper>
    );
};

export default Play;
