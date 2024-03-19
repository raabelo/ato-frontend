import React, { useState } from "react";
import CardGod from "./CardGod";
import calcProportion from "../utils/functions/calcProportion";
import CardBack from "../assets/cards/card_back.png";
import Card from "../types/Card";
import { GameContext } from "../contexts/GameContext";

const proportion: number[] = [10, 3.75];

const HandCard: React.FC<{
    card: Card;
    index: number;
    wrapper: string;
    inspecting: boolean;
    setInspecting: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ card, index, wrapper, inspecting, setInspecting }) => {
    const [opened, setOpened] = useState<boolean>(false);
    const [dragging, setDragging] = useState<boolean>(false);

    const inspect = () => {
        if (inspecting && opened) {
            setOpened(false);
            setInspecting(false);
        } else if (!inspecting && !opened) {
            setOpened(true);
            setInspecting(true);
        } else {
            return;
        }
    };

    const handleCard = (card: Card) => {
        switch (card.type) {
            case "Deus":
                return <CardGod cardId={card.id} />;

            case "Anomalia":
                return <CardGod cardId={card.id} />;

            case "Artefato":
                return <CardGod cardId={card.id} />;

            case "Terreno":
                return <CardGod cardId={card.id} />;

            default:
                return <></>;
        }
    };

    const handleOnDrag = (e: React.DragEvent, card: Card) => {
        setDragging(true);
        e.dataTransfer.setData("card", JSON.stringify({ card: card, index: index }));
        e.dataTransfer.effectAllowed = "move";
    };

    return (
        <>
            <div
                draggable={!opened}
                onDragStart={(e) => handleOnDrag(e, card)}
                onDragEnd={() => setDragging(false)}
                className={` transition-all flex flex-row hover:z-50       
                        ${
                            opened
                                ? "scale-[2.5] fixed top-1/3 left-[47%] z-[11]"
                                : "scale-100 hover:scale-125 relative hover:translate-y-[-7rem]"
                        }`}
                style={{
                    marginLeft: `-${wrapper}%`,
                    opacity: dragging ? 0 : 1,
                    transitionDuration: dragging ? "0.05s" : "",
                }}
            >
                <div onClick={inspect}>{handleCard(card)}</div>
            </div>
        </>
    );
};

const GameHand: React.FC<{
    position: 1 | 2;
}> = ({ position }) => {
    const { player1, player2 } = React.useContext(GameContext);

    const [inspecting, setInspecting] = useState<boolean>(false);
    const wrapper: string = calcProportion(
        position === 1 ? player1.hand.length : player2.hand.length,
        proportion[0],
        proportion[1]
    ).toFixed(2);

    // React.useEffect(() => {
    //     console.log(player1.hand);
    // }, [player1]);

    return (
        <>
            {position === 1 && (
                <div
                    className={`w-full flex justify-center absolute bottom-[-5.75rem] z-0`}
                    style={{ marginLeft: `${parseFloat(wrapper) / 2}%` }}
                >
                    {player1.hand.map((card, index) => {
                        return (
                            <HandCard
                                key={card.id + "-" + index + "-hand"}
                                card={card}
                                index={index}
                                wrapper={wrapper}
                                inspecting={inspecting}
                                setInspecting={setInspecting}
                            />
                        );
                    })}
                </div>
            )}
            {position === 2 && (
                <div
                    className="flex absolute top-[-3.75rem] w-full justify-center z-0"
                    style={{ marginLeft: `${parseFloat(wrapper) / 4}%` }}
                >
                    {player2.hand.map(() => {
                        return (
                            <img
                                key={(Math.random() * 1000).toString()}
                                className="w-20"
                                src={CardBack}
                                style={{ marginLeft: `-${parseFloat(wrapper) / 2}%` }}
                            />
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default GameHand;
