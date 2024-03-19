import React from "react";
import iDeck from "../../types/interfaces/iDeck";
import iGamePlayer from "../../types/interfaces/iGamePlayer";

const ShuffleDeck = (
    deck: iDeck,
    player?: iGamePlayer,
    setPlayer?: React.Dispatch<React.SetStateAction<iGamePlayer>>
): iDeck => {
    const shuffledArray = [...deck.cards];

    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    if (player && setPlayer) {
        setPlayer({ ...player, deck: { ...player.deck, cards: shuffledArray } });
    }

    return { ...deck, cards: shuffledArray };
};

export default ShuffleDeck;
