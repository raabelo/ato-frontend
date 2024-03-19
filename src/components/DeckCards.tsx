import React from "react";
import iDeck from "../types/interfaces/iDeck";
import getGodDetails from "../utils/functions/getGodDetails";

const DeckCards: React.FC<{
    editingDeck: iDeck | null;
    setEditingDeck: React.Dispatch<React.SetStateAction<iDeck | null>>;
    setInspectCard: React.Dispatch<React.SetStateAction<string>>;
}> = ({ editingDeck, setEditingDeck, setInspectCard }) => {
    const removeCardFromDeck = (id: string) => {
        if (editingDeck) {
            let cards = editingDeck.cards;
            const indexToRemove = cards.findIndex((card) => card?.id === id);
            if (indexToRemove !== -1) {
                cards = [...cards.slice(0, indexToRemove), ...cards.slice(indexToRemove + 1)];
                setEditingDeck({
                    id: editingDeck.id || "",
                    name: editingDeck.name || "",
                    cards: cards,
                });
            }
        }
    };

    return (
        <>
            {editingDeck?.cards
                .sort((a, b) => {
                    if (a.cost !== b.cost) {
                        return a.cost - b.cost;
                    }
                    const nameComparison = a.name.localeCompare(b.name);
                    if (nameComparison !== 0) {
                        return nameComparison;
                    }
                    return a.title.localeCompare(b.title);
                })
                .map((card, i) => {
                    return (
                        <div key={card?.id?.toString() + "-" + i} className="relative">
                            <div
                                onMouseEnter={() => setInspectCard(card.id)}
                                onMouseLeave={() => setInspectCard("")}
                                style={{
                                    display:
                                        editingDeck.cards[i - 1]?.id === card?.id ? "none" : "flex",
                                    // marginTop:
                                    //     editingDeck.cards[i - 1]?.id === card?.id ? "-2rem" : "",
                                    zIndex: 60 - i,
                                }}
                                className={`h-10 border border-grey relative rounded-full overflow-hidden m-2 hover:cursor-pointer hover:translate-x-[0.25rem] transition-all`}
                                onClick={() => {
                                    removeCardFromDeck(card?.id);
                                }}
                            >
                                <div className="absolute size-full top-0 left-0 z-10 flex flex-row items-center">
                                    <div className="flex-[1.25] relative">
                                        <div
                                            className="bg-black w-7 h-7 top-[-100%] ml-1.5 flex justify-center items-center"
                                            style={{
                                                clipPath:
                                                    "polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)",
                                            }}
                                        >
                                            <p className="text-white">{card?.cost}</p>
                                        </div>
                                    </div>
                                    <div className="flex-[5.5] pt-0.5">
                                        <p className="text-white font-bold">
                                            {card?.name?.toUpperCase()}
                                        </p>
                                        <p className="text-white font-body text-xs">
                                            {card?.title}
                                        </p>
                                    </div>
                                    <div className="flex-[3.25] relative">
                                        <div
                                            className="absolute top-2 right-2 text-white bg-black/25 font-body rounded-full text-lg w-auto h-auto aspect-square"
                                            style={{
                                                textShadow:
                                                    "2px 2px 2px black, -2px 2px 2px black, 2px -2px 2px black, -2px -2px 2px black",
                                            }}
                                        >
                                            {`x${
                                                editingDeck?.cards.filter(
                                                    (filter) => filter.id === card.id
                                                ).length || 0
                                            }`}
                                        </div>
                                        <img
                                            draggable={false}
                                            src={card?.art}
                                            className="object-cover w-full h-12 object-top rounded-l-full"
                                        />
                                    </div>
                                </div>
                                <div
                                    className="absolute size-full top-0 left-0 z-0"
                                    style={{
                                        backgroundColor: getGodDetails.getCardColor(card?.age),
                                        filter: "brightness(75%)",
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
        </>
    );
};

export default DeckCards;
