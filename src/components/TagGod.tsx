import React from "react";
import iCardGod from "../types/interfaces/iCardGod";
import getGodDetails from "../utils/functions/getGodDetails";

const TagGod: React.FC<{ card: iCardGod; size?: number }> = React.memo(({ size = 145, card }) => {
    return (
        <div
            className="h-auto aspect-5/4 relative rounded-md overflow-hidden text-white bg-black"
            style={{
                width: size,
                filter: card.variant === "Holográfica" ? "saturate(1.25)" : "",
                // border: variant === "Holográfica" ? "0.0625rem solid black" : "",
            }}
        >
            <>
                <img
                    loading="lazy"
                    src={getGodDetails.getArtwork(card.id, card.name, card.age, card.variant)}
                    className={`w-full object-top object-cover aspect-[5/4] ${
                        card.variant === "Padrão" || card.variant === "Promocional"
                            ? "px-[4.375%] py-[4.375%]"
                            : ""
                    }`}
                    style={{
                        filter:
                            card.variant === "Holográfica"
                                ? "brightness(85.25%) saturate(1.25)"
                                : "",
                    }}
                />
                <img
                    loading="lazy"
                    draggable={false}
                    src={getGodDetails.getAgeImage(card.variant, card.age, "Tag")}
                    className="h-auto aspect-5/4 absolute top-0 w-full"
                />
            </>
            <>
                <div className={`absolute w-2.5 h-2.5 top-[7%] right-[5%]`}>
                    <img src={getGodDetails.getPantheonImage(card.pantheon)} draggable={false} />
                </div>
                <p
                    className="absolute font-body top-[7.5%] left-[6.5%] text-[0.66rem]"
                    style={{
                        paddingLeft: card.cost === 1 ? "0.1rem" : "",
                    }}
                >
                    {card.cost}
                </p>
                <p
                    className="absolute font-body bottom-[3.25%] left-[7.25%] text-[1rem]"
                    style={{
                        paddingLeft: card.atk === 1 ? "0.125rem" : "",
                    }}
                >
                    {card.atk}
                </p>
                <p
                    className="absolute font-body bottom-[3.25%] right-[7.25%] text-[1rem]"
                    style={{
                        paddingLeft: card.def === 1 ? "0.125rem" : "",
                    }}
                >
                    {card.def}
                </p>
            </>
            <>
                {card.variant === "Holográfica" && (
                    <img
                        loading="lazy"
                        draggable={false}
                        src={getGodDetails.getHoloImage(card.rarity)}
                        className="h-auto aspect-5/4 absolute top-0 opacity-20"
                        style={{ filter: "brightness(75%)" }}
                    />
                )}
            </>
        </div>
    );
});
export default TagGod;
