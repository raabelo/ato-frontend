import React, { createContext, useState } from "react";
import iGamePlayer from "../types/interfaces/iGamePlayer";
import iCardField from "../types/interfaces/iCardField";
import Game from "../types/interfaces/iGame";
import cardsDB from "../database/cardsDB";

const playerNull: iGamePlayer = {
    uid: "",
    name: "",
    title: "",
    character: 0,
    lifepoints: 40,
    deck: { name: "", ages: ["Cyberpunk", "Cyberpunk"], cards: [] },
    hand: [],
    board: [],
    energy: {
        type1: { age: "Cyberpunk", quantity: 0, active: 0 },
        type2: { age: "Cyberpunk", quantity: 0, active: 0 },
    },
    graveyard: [],
};

export const GameContext = createContext<Game>({
    player1: playerNull,
    player2: playerNull,
    turn: 0,
    setPlayer1: () => {},
    setPlayer2: () => {},
    setField: () => {},
    setTurn: () => {},
});

const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [player1, setPlayer1] = useState<iGamePlayer>(playerNull);
    const [player2, setPlayer2] = useState<iGamePlayer>(playerNull);
    const [field, setField] = useState<iCardField>({ ...cardsDB[10], type: "Terreno" });
    const [turn, setTurn] = useState<number>(0);

    return (
        <GameContext.Provider
            value={{ player1, player2, field, turn, setPlayer1, setPlayer2, setField, setTurn }}
        >
            {children}
        </GameContext.Provider>
    );
};

export default GameProvider;
