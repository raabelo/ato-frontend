import React from "react";
import GameDeck from "./GameDeck";
import { GameContext } from "../contexts/GameContext";
import TagGod from "./TagGod";
import CardField from "./CardField";
// import CardGod from "./CardGod";

import CardBack from "../assets/cards/card_back.png";
import BtnGraveyard from "../assets/GUI/btn_graveyard.png";
import PlayCard from "../events/game/PlayCard";
import Card from "../types/Card";
import { DrawCardAction } from "../events/controllers/GameEmiters";
import { useSearchParams } from "react-router-dom";
import iCardGod from "../types/interfaces/iCardGod";

const GameBoard: React.FC = () => {
    const [urlParams] = useSearchParams();
    const { player1, player2, field, setPlayer1 } = React.useContext(GameContext);

    const handleOnDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const eventObj: { card: Card; index: number } = JSON.parse(e.dataTransfer.getData("card"));
        const { card, index } = eventObj;
        if (eventObj) {
            PlayCard(card, index, player1, setPlayer1);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    return (
        <div
            className="perspective-card absolute w-full h-[70%] top-16"
            onDrop={handleOnDrop}
            onDragOver={handleDragOver}
        >
            <GameDeck size={6} position={1}>
                <img
                    onMouseEnter={() => console.log(player1.deck.cards.length)}
                    src={CardBack}
                    draggable={false}
                    style={{ opacity: player1.deck.cards.length > 0 ? 1 : 0 }}
                    onClick={() => {
                        DrawCardAction(
                            urlParams.get("session") || "",
                            localStorage.getItem("uid") || "",
                            player1
                        );
                    }}
                />
                <img src={BtnGraveyard} draggable={false} className="w-8 h-8" />
            </GameDeck>
            <GameDeck size={6} position={2}>
                <img
                    src={CardBack}
                    draggable={false}
                    style={{ opacity: player2.deck.cards.length > 0 ? 1 : 0 }}
                />
                <img src={BtnGraveyard} draggable={false} className="w-8 h-8" />
            </GameDeck>
            <div className=" grid justify-center absolute w-full top-[27.5%] h-fit">
                <div className="flex gap-4">
                    {player2.board.map((card, i) => {
                        return (
                            <TagGod key={card.id + "-" + i + "-board-2"} card={card as iCardGod} />
                        );
                    })}
                </div>
            </div>
            <div className=" grid justify-center absolute w-full top-[53.33%] h-fit">
                <div className="flex gap-4">
                    {player1.board.map((card, i) => {
                        return (
                            <TagGod key={card.id + "-" + i + "-board-1"} card={card as iCardGod} />
                        );
                    })}
                </div>
            </div>
            <div
                className="absolute top-[33.33%] left-[12.25%] rotate-90 scale-75"
                onClick={() => console.log(player1.hand)}
            >
                <CardField card={field} />
            </div>
        </div>
    );
};
export default GameBoard;
