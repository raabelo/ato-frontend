import Age from "../Age";
import Card from "../Card";
import Character from "../Character";
import iDeck from "./iDeck";

interface Energy {
    age: Age;
    active: boolean;
}

interface iGamePlayer {
    uid: string;
    name: string;
    title: string;
    character: Character;
    lifepoints: number;
    deck: iDeck;
    hand: Card[];
    board: Card[];
    energy: Energy[];
    graveyard: Card[];
}

export default iGamePlayer;
