import React from "react";
import iGamePlayer from "../../types/interfaces/iGamePlayer";
import Card from "../../types/Card";

const DrawCard = (
    player: iGamePlayer,
    setPlayer: React.Dispatch<React.SetStateAction<iGamePlayer>>
) => {
    const newPlayerObj: iGamePlayer = { ...player };

    const newHandCard: Card | undefined = newPlayerObj.deck.cards.pop();
    if (newHandCard) {
        newPlayerObj.hand = [...newPlayerObj.hand, newHandCard];
    }

    setPlayer(newPlayerObj);
};

export default DrawCard;
