import React from "react";
import Card from "../../types/Card";
import iGamePlayer from "../../types/interfaces/iGamePlayer";

const PlayCard = (
    card: Card,
    cardIndex: number,
    player: iGamePlayer,
    setPlayer: React.Dispatch<React.SetStateAction<iGamePlayer>>
) => {
    const newPlayerObj = {
        ...player,
        board: [...player.board, card],
        hand: player.hand.filter((_, index) => index !== cardIndex),
    };
    setPlayer(newPlayerObj);
};

export default PlayCard;
