import React from "react";

import BoxPirate from "../assets/cards/box_pirate.png";
import iDeck from "../types/interfaces/iDeck";

const DeckList: React.FC<{
    decks: iDeck[];
    setEditingDeck: React.Dispatch<React.SetStateAction<iDeck | null>>;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ decks, setEditingDeck, setIsEditing }) => {
    const [hoveringDeck, setHoveringDeck] = React.useState<string>("");

    return (
        <>
            {decks.map((deck, i) => {
                return (
                    <div
                        onClick={() => {
                            setEditingDeck(deck);
                            setIsEditing(true);
                        }}
                        onMouseEnter={() => setHoveringDeck(deck.id)}
                        onMouseLeave={() => setHoveringDeck("")}
                        key={deck.name + i}
                        className="relative hover:cursor-pointer group m-1 border border-transparent hover:border-blue rounded-lg w-[95%] h-fit"
                    >
                        <img
                            draggable={false}
                            src={BoxPirate}
                            className="w-20 h-36 object-cover m-auto group-hover:animate-[shake_0.775s_ease-in-out_infinite]"
                        />
                        <p className="text-center text-white pb-2">{deck.name || "..."}</p>
                        {hoveringDeck === deck.id && (
                            <button
                                onClick={() => {
                                    setTimeout(() => {
                                        setIsEditing(false);
                                    }, 0.0000001);
                                }}
                                className="absolute top-2 right-2 bg-red size-8 rounded-full text-white font-bold text-2xl border border-white hover:scale-125 transition-all"
                            >
                                🗑
                            </button>
                        )}
                    </div>
                );
            })}
            <div
                onClick={() => {
                    setEditingDeck({
                        id: "",
                        name: "Novo deck",
                        cards: [],
                    });
                    setIsEditing(true);
                }}
                className="hover:cursor-pointer relative flex group m-1 border border-transparent hover:border-blue rounded-lg w-[95%] h-[10.575rem]"
            >
                <p className="font-bold flex justify-center items-center text-center rounded-full bg-grey border-2 border-black size-10 m-auto mb-[42.5%]">
                    +
                </p>
                <p className=" absolute bottom-0 w-full pb-2 text-center text-white">Novo deck</p>
            </div>
        </>
    );
};

export default DeckList;
