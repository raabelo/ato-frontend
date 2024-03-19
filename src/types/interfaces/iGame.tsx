import { Dispatch, SetStateAction } from "react";
import iCardField from "./iCardField";
import iGamePlayer from "./iGamePlayer";

interface Game {
    player1: iGamePlayer;
    player2: iGamePlayer;
    field?: iCardField;
    turn: number;

    setPlayer1: Dispatch<SetStateAction<iGamePlayer>>;
    setPlayer2: Dispatch<SetStateAction<iGamePlayer>>;
    setField: Dispatch<SetStateAction<iCardField>>;
    setTurn: Dispatch<SetStateAction<number>>;
}

export default Game;
