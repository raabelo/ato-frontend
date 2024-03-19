import Age from "../Age";
import Pantheon from "../Pantheon";
import Rarity from "../Rarity";
import Variant from "../Variant";

interface iCardField {
    id: string;
    name: string;
    title: string;
    pantheon: Pantheon;
    age: Age;
    cost: number;
    rarity: Rarity;
    variant: Variant;

    text?: string;
    art?: string;
    flavor?: string;

    size?: number;

    type: "Terreno";
}

export default iCardField;
