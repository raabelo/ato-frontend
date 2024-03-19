import Age from "../Age";
import Pantheon from "../Pantheon";
import Rarity from "../Rarity";
import Variant from "../Variant";

interface iCardArtifact {
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

    type: "Artefato";
}

export default iCardArtifact;
