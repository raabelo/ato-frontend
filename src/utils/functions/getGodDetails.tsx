import Japan from "../../assets/cards/pantheon_japan.png";
import Greece from "../../assets/cards/pantheon_greece.png";
import Norse from "../../assets/cards/pantheon_norse.png";

import Holo1 from "../../assets/cards/holo_1.gif";
import Holo2 from "../../assets/cards/holo_2.gif";
import Holo3 from "../../assets/cards/holo_3.gif";
import Holo4 from "../../assets/cards/holo_4.gif";

import GodAgeCyberpunk from "../../assets/cards/god_age_cyberpunk.png";
import GodAgeNoir from "../../assets/cards/god_age_noir.png";
import GodAgePirate from "../../assets/cards/god_age_pirate.png";
import GodAgeSteampunk from "../../assets/cards/god_age_steampunk.png";
import GodAgeWestern from "../../assets/cards/god_age_western.png";

import GodAgeCyberpunkHolo from "../../assets/cards/god_age_cyberpunk_holo.png";

import TagAgeCyberpunk from "../../assets/cards/tag_age_cyberpunk.png";
import TagAgeNoir from "../../assets/cards/tag_age_noir.png";
import TagAgePirate from "../../assets/cards/tag_age_pirate.png";
import TagAgeSteampunk from "../../assets/cards/tag_age_steampunk.png";
import TagAgeWestern from "../../assets/cards/tag_age_western.png";
import Age from "../../types/Age";
import Variant from "../../types/Variant";
import Pantheon from "../../types/Pantheon";
import Rarity from "../../types/Rarity";

const handleVariant = (variant: Variant): string => {
    switch (variant) {
        case "Padrão":
            return "Standard";
        case "Promocional":
            return "Promo";
        case "Holográfica":
            return "Holo";
        default:
            return "Standard";
    }
};
const handleCardset = (id: string): string => {
    switch (id?.split("-")[0]) {
        case "01":
            return "Genesis";
        default:
            return "";
    }
};
const handleAge = (age: Age): string => {
    switch (age) {
        case "Pirata":
            return "Pirate";
        case "Faroeste":
            return "Western";
        default:
            return age;
    }
};

const getAgeImage = (variant: Variant, age: Age, type: "Card" | "Tag"): string => {
    if (type === "Card") {
        if (variant === "Padrão" || variant === "Promocional") {
            switch (age) {
                case "Cyberpunk":
                    return GodAgeCyberpunk;
                case "Noir":
                    return GodAgeNoir;
                case "Pirata":
                    return GodAgePirate;
                case "Steampunk":
                    return GodAgeSteampunk;
                case "Faroeste":
                    return GodAgeWestern;
                default:
                    return "";
            }
        } else {
            switch (age) {
                case "Cyberpunk":
                    return GodAgeCyberpunkHolo;
                case "Noir":
                    return GodAgeNoir;
                case "Pirata":
                    return GodAgePirate;
                case "Steampunk":
                    return GodAgeSteampunk;
                case "Faroeste":
                    return GodAgeWestern;
                default:
                    return "";
            }
        }
    } else {
        switch (age) {
            case "Cyberpunk":
                return TagAgeCyberpunk;
            case "Noir":
                return TagAgeNoir;
            case "Pirata":
                return TagAgePirate;
            case "Steampunk":
                return TagAgeSteampunk;
            case "Faroeste":
                return TagAgeWestern;
            default:
                return "";
        }
    }
};
const getPantheonImage = (pantheon: Pantheon): string => {
    switch (pantheon) {
        case "Japonês":
            return Japan;
        case "Grego":
            return Greece;
        case "Nórdico":
            return Norse;
        default:
            return "";
    }
};
const getHoloImage = (rarity: Rarity): string => {
    switch (rarity) {
        case 0:
            return Holo1;
        case 1:
            return Holo2;
        case 2:
            return Holo3;
        case 3:
            return Holo4;
        default:
            return Holo1;
    }
};

const getArtwork = (id: string, name: string, age: Age, variant: Variant): string => {
    return `https://raw.githubusercontent.com/raabelo/resources/main/images/ato/artwork/${(
        handleCardset(id) +
        "_" +
        handleAge(age) +
        "_" +
        name +
        "_" +
        handleVariant(variant)
    ).toLowerCase()}.png`;
};

const getCardColor = (age: Age): string => {
    switch (age) {
        case "Cyberpunk":
            return "#683679";
        case "Noir":
            return "#939598";
        case "Pirata":
            return "#008FC6";
        case "Steampunk":
            return "#F7A906";
        case "Faroeste":
            return "#D2082F";
        default:
            return "";
    }
};

export default {
    handleVariant,
    handleCardset,
    handleAge,
    getAgeImage,
    getPantheonImage,
    getHoloImage,
    getArtwork,
    getCardColor,
};
