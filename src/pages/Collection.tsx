import React from "react";
import MenuPageWrapper from "../components/MenuPageWrapper";
import Requests from "../services/api";
import AnomalyLogo from "../assets/logo/Anomaly.png";
import CardGod from "../components/CardGod";
import iDeck from "../types/interfaces/iDeck";

import Card from "../types/Card";
import Collapse from "@mui/material/Collapse";
import Fade from "@mui/material/Fade";
import DeckList from "../components/DeckList";
import DeckCards from "../components/DeckCards";

const Collection: React.FC = () => {
    const [inspectCard, setInspectCard] = React.useState<string>("");
    const [cards, setCards] = React.useState<{ id: string; quantity: number }[]>([]);
    const [decks, setDecks] = React.useState<iDeck[]>([]);
    const [editingDeck, setEditingDeck] = React.useState<iDeck | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const [isEditing, setIsEditing] = React.useState<boolean>(false);
    const [isDeckStatusOpen, setIsDeckStatusOpen] = React.useState<boolean>(false);

    const fetchCards = async () => {
        await Requests.get(`/users/${localStorage.getItem("uid")}?fields=collection`)
            .then((res) => {
                const collection: string = res.data.collection;
                setCards(collection ? JSON.parse(collection) : []);
            })
            .catch(() => {});
    };
    const fetchDecks = async () => {
        await Requests.get(`/decks?ownerId=${localStorage.getItem("uid")}`)
            .then((res) => {
                const decks: iDeck[] = res.data.map((deck: { name: "string"; cards: "string" }) => {
                    const cards: Card[] = [];
                    JSON.parse(deck.cards).forEach(async (card: string) => {
                        cards.push(
                            await fetchCard(card).then((res: Card) => {
                                return res;
                            })
                        );
                    });
                    return {
                        ...deck,
                        cards: cards,
                    };
                });
                setDecks(decks);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const fetchCard = async (card: string): Promise<Card> => {
        let c: Card = {} as Card;
        await Requests.get(`/cards/${card}`)
            .then((res) => {
                c = res.data as Card;
            })
            .catch(() => {
                c = {} as Card;
            });
        return c;
    };

    const fetchContent = async () => {
        setIsLoading(true);
        fetchCards();
        fetchDecks();
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    };

    const addCardToDeck = (card: string) => {
        Requests.get(`/cards/${card}`)
            .then((res) => {
                const card: Card = res.data;
                if (editingDeck) {
                    const cards = [...editingDeck.cards, card];
                    cards.sort((a, b) => {
                        if (a.cost !== b.cost) {
                            return a.cost - b.cost;
                        }
                        const nameComparison = a.name.localeCompare(b.name);
                        if (nameComparison !== 0) {
                            return nameComparison;
                        }
                        return a.title.localeCompare(b.title);
                    });
                    setEditingDeck({
                        id: editingDeck.id || "",
                        name: editingDeck.name || "",
                        cards: cards,
                    });
                }
            })
            .catch()
            .finally(() => {
                setIsLoading(false);
            });
    };

    const postDeck = async () => {
        const objDeck = {
            id: editingDeck?.id,
            name: editingDeck?.name,
            cards: editingDeck?.cards.map((card) => card.id),
        };

        if (editingDeck?.id) {
            Requests.patch(`/decks/${objDeck.id}`, objDeck).finally(() => fetchDecks());
        } else {
            Requests.post(`/decks?user=${localStorage.getItem("uid")}`, objDeck).finally(() =>
                fetchDecks()
            );
        }
    };

    React.useEffect(() => {
        fetchContent();
        /* eslint-disable react-hooks/exhaustive-deps*/
    }, []);

    const ageFilter = [
        { name: "Faroeste", icon: "🔴" },
        { name: "Noir", icon: "⚪" },
        { name: "Cyberpunk", icon: "🟣" },
        { name: "Steampunk", icon: "🟡" },
        { name: "Pirata", icon: "🔵" },
    ];

    const InspectCardModal: React.ReactNode = (
        <div className="size-full flex items-center justify-center relative">
            <div
                className="size-full  absolute"
                onClick={() => {
                    setIsModalOpen(false);
                    setInspectCard("");
                }}
            ></div>
            <div className=" absolute scale-[2.75] transition-all" draggable={false}>
                <CardGod cardId={inspectCard} />
            </div>
        </div>
    );

    const handleOnDrag = (e: React.DragEvent, card: string) => {
        e.dataTransfer.setData("card", JSON.stringify(card));
        e.dataTransfer.effectAllowed = "move";
    };

    const handleOnDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const eventObj: string = JSON.parse(e.dataTransfer.getData("card"));
        if (eventObj) {
            addCardToDeck(eventObj);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    if (isLoading) {
        return (
            <MenuPageWrapper bg="collection">
                <div className="flex size-full items-center justify-center">
                    <img
                        src={AnomalyLogo}
                        className="size-10 animate-spin mb-12"
                        draggable={false}
                    />
                </div>
            </MenuPageWrapper>
        );
    }

    return (
        <MenuPageWrapper bg="collection" modal={InspectCardModal} isModalOpen={isModalOpen}>
            <div className=" size-full flex my-8">
                <div className="flex-[3] px-10 pl-20">
                    <div className="pb-[5%] flex items-center">
                        <button
                            onClick={fetchContent}
                            className="hover:scale-125 transition-all mr-2 text-black bg-primary aspect-square rounded-full size-6 flex items-center justify-center text-center border border-black"
                        >
                            🗘
                        </button>
                        <input
                            type="input"
                            placeholder="Procurar..."
                            className="text-white caret-white rounded-full px-4 py-1 bg-black/50 border border-grey pr-8"
                        />
                        <button className="ml-[-1.5rem] text-black bg-grey aspect-square rounded-full size-4 flex items-center justify-center text-center border border-black">
                            ×
                        </button>
                        <div className="flex ml-4 bg-black/20 border border-grey/50 rounded-full p-[0.125rem]">
                            {ageFilter.map((e) => {
                                return (
                                    <button
                                        key={e.name}
                                        className="opacity-75 hover:opacity-100 hover:scale-150 transition-all "
                                        style={{ fontSize: "1.25rem" }}
                                    >
                                        {e.icon}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <div className="w-full h-[84%] grid grid-cols-5 grid-rows-2 gap-x-4 pt-2 pl-2">
                        {cards.map((card) => {
                            return (
                                <div key={card?.id} className="relative">
                                    <div className="border border-transparent scale-125 transition-all">
                                        <CardGod
                                            draggable={isEditing}
                                            onDragStart={(e) => handleOnDrag(e, card?.id)}
                                            onContextMenu={() => {
                                                setInspectCard(card?.id);
                                                setIsModalOpen(true);
                                            }}
                                            className="hover:border-blue hover:cursor-pointer shadow active:border-white transition-all"
                                            cardId={card?.id}
                                            onClick={() => {
                                                if (!isEditing) {
                                                    setInspectCard(card?.id);
                                                    setIsModalOpen(true);
                                                } else {
                                                    addCardToDeck(card?.id);
                                                }
                                            }}
                                        />
                                    </div>
                                    <p className="text-center z-50 pb-2 bg-white w-fit mt-0 pt-8 px-4 rounded-xl ml-[2.5rem]">
                                        {`x ${card?.quantity}`}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className=" flex-1 mb-24 mr-10 relative">
                    {isEditing ? (
                        <div className="flex pb-4 pt-1 h-9 relative">
                            <button
                                onClick={() => {
                                    setEditingDeck(null);
                                    setIsEditing(false);
                                }}
                                className="hover:scale-125 transition-all text-black bg-primary aspect-square rounded-full size-6 flex items-center justify-center text-center border border-black pr-1"
                            >
                                ◀
                            </button>
                            <input
                                onMouseEnter={() => setIsDeckStatusOpen(true)}
                                onMouseLeave={() => setIsDeckStatusOpen(false)}
                                type="text"
                                className="text-center text-primary font-bold bg-transparent w-[80%] m-auto"
                                value={editingDeck?.name || "Novo deck"}
                                onChange={(e) =>
                                    setEditingDeck({
                                        id: editingDeck?.id || "",
                                        cards: editingDeck?.cards || [],
                                        name: e.target.value,
                                    })
                                }
                            />
                            <button
                                onClick={() => {
                                    postDeck();
                                }}
                                className="hover:scale-125 transition-all text-white bg-green aspect-square rounded-full size-6 flex items-center justify-center text-center border border-white"
                            >
                                ✓
                            </button>
                            <Collapse
                                in={isDeckStatusOpen}
                                className="transition-all bg-black w-[98%] absolute top-10 rounded-xl z-[61] left-1"
                            >
                                <div className="size-full p-4">
                                    <p className="text-primary">{`${editingDeck?.cards.length}/60 Cards`}</p>
                                    <div></div>
                                    <div className="flex w-full justify-around items-center">
                                        {ageFilter.map((age) => {
                                            return (
                                                <div
                                                    key={age.name}
                                                    className="flex flex-col justify-center items-center"
                                                >
                                                    <p>{age.icon}</p>
                                                    <p className="text-white">
                                                        {editingDeck?.cards.filter(
                                                            (card) => card.age === age.name
                                                        ).length || 0}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="text-primary text-sm">
                                        <p>{`Deuses: ${
                                            editingDeck?.cards.filter(
                                                (card) => card.type === "Deus"
                                            ).length || 0
                                        }`}</p>
                                        <p>{`Artefatos: ${
                                            editingDeck?.cards.filter(
                                                (card) => card.type === "Artefato"
                                            ).length || 0
                                        }`}</p>
                                        <p>{`Terrenos: ${
                                            editingDeck?.cards.filter(
                                                (card) => card.type === "Terreno"
                                            ).length || 0
                                        }`}</p>
                                        <p>{`Anomalias: ${
                                            editingDeck?.cards.filter(
                                                (card) => card.type === "Anomalia"
                                            ).length || 0
                                        }`}</p>
                                    </div>
                                </div>
                            </Collapse>
                        </div>
                    ) : (
                        <p className="text-center text-primary font-bold pb-4 pt-1 w-full bg-transparent h-9">
                            DECKS
                        </p>
                    )}
                    <div
                        onDrop={handleOnDrop}
                        onDragOver={handleDragOver}
                        className={` ${
                            isEditing ? "" : "grid grid-cols-2 gap-x-1 gap-y-4"
                        } overflow-y-auto overflow-x-hidden bg-black/20 border border-grey/50 rounded-lg h-[94.75%]`}
                        style={{ gridTemplateRows: isEditing ? "0rem" : "11rem" }}
                    >
                        {isEditing ? (
                            <DeckCards
                                editingDeck={editingDeck}
                                setEditingDeck={setEditingDeck}
                                setInspectCard={setInspectCard}
                            />
                        ) : (
                            <DeckList
                                decks={decks}
                                setEditingDeck={setEditingDeck}
                                setIsEditing={setIsEditing}
                            />
                        )}
                    </div>
                    <Fade
                        unmountOnExit
                        in={inspectCard !== "" && !isModalOpen}
                        {...(inspectCard !== "" && !isModalOpen ? { timeout: 500 } : {})}
                    >
                        <div className="absolute w-20 h-96 right-[145%] top-[33%]">
                            <div
                                className=" absolute scale-[2.25] transition-all"
                                draggable={false}
                            >
                                {inspectCard && <CardGod cardId={inspectCard} />}
                            </div>
                        </div>
                    </Fade>
                </div>
            </div>
        </MenuPageWrapper>
    );
};

export default Collection;
