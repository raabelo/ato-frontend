import Card from "../Card";
import Character from "../Character";
import iDeck from "./iDeck";

interface iUser {
    id: string;
    nickname: string;
    title: string;
    character: Character;
    decks: iDeck[];
    activeDeck: number;
    packs: [];
    collection: Card[];
    rank: number;
    dust: number;
    gold: number;
    games: [];
}

export default iUser;
