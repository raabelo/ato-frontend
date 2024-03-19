import React from "react";
import iCardGod from "../types/interfaces/iCardGod";

import TextCard from "./TextCard";
import getGodDetails from "../utils/functions/getGodDetails";
import Requests from "../services/api";
import AnomalyLogo from "../assets/logo/Anomaly.png";

import CardHover from "../assets/audio/uifx/card-hover.wav";

const CardGod: React.FC<{
    cardId?: string;
    size?: number;
    className?: string;
    draggable?: boolean;
    onDragStart?: (e: React.DragEvent) => void;
    onClick?: () => void;
    onContextMenu?: () => void;
}> = React.memo(
    ({ size = 145, cardId, className, draggable, onDragStart, onClick, onContextMenu }) => {
        const hoverAudio = new Audio(CardHover);

        const [card, setCard] = React.useState<iCardGod>();
        const [isLoading, setIsLoading] = React.useState<boolean>(false);

        React.useEffect(() => {
            setIsLoading(true);
            Requests.get(`/cards/${cardId}`)
                .then((res) => setCard(res.data))
                .catch()
                .finally(() => {
                    setIsLoading(false);
                });
        }, [cardId]);

        if (card) {
            return (
                <div
                    draggable={draggable}
                    onDragStart={onDragStart}
                    onContextMenu={onContextMenu}
                    onClick={onClick}
                    onMouseEnter={() => hoverAudio.play()}
                    className={` box-content border-2 border-transparent h-auto aspect-5/7 relative rounded-md overflow-hidden text-white bg-black ${className}`}
                    style={{
                        width: size,
                        filter: card?.variant === "Holográfica" ? "saturate(1.25)" : "",
                        // border: variant === "Holográfica" ? "0.0625rem solid black" : "",
                    }}
                >
                    <>
                        <img
                            loading="lazy"
                            src={
                                card?.art ||
                                getGodDetails.getArtwork(
                                    card?.id,
                                    card?.name,
                                    card?.age,
                                    card?.variant
                                )
                            }
                            className={`w-full ${
                                card?.variant === "Padrão" || card?.variant === "Promocional"
                                    ? "px-[4.375%] pt-[4.375%]"
                                    : "h-full"
                            }`}
                            style={{
                                filter:
                                    card?.variant === "Holográfica"
                                        ? "brightness(85.25%) saturate(1.25)"
                                        : "",
                            }}
                        />
                        <img
                            loading="lazy"
                            draggable={false}
                            src={getGodDetails.getAgeImage(card?.variant, card?.age, "Card")}
                            className="h-auto aspect-5/7 absolute top-0 w-full"
                        />
                    </>
                    <>
                        <div className={`absolute w-2.5 h-2.5 top-[4%] right-[0.466rem]`}>
                            <img
                                src={getGodDetails.getPantheonImage(card?.pantheon)}
                                draggable={false}
                            />
                        </div>
                        <p
                            className="absolute font-body top-[4.5%] left-[0.575rem] text-[0.66rem]"
                            style={{
                                paddingLeft: card?.cost === 1 ? "0.1rem" : "",
                            }}
                        >
                            {card?.cost}
                        </p>
                        <p
                            className="absolute font-body bottom-[3.2%] left-[0.575rem] text-[0.66rem]"
                            style={{
                                paddingLeft: card?.atk === 1 ? "0.1rem" : "",
                            }}
                        >
                            {card?.atk}
                        </p>
                        <p
                            className="absolute font-body bottom-[3.2%] right-[0.575rem] text-[0.66rem]"
                            style={{
                                paddingLeft: card?.def === 1 ? "0.1rem" : "",
                            }}
                        >
                            {card?.def}
                        </p>
                        <div className="absolute top-[53.75%] left-[0.575rem] flex flex-col gap-[0.063rem]">
                            <p
                                className="font-default text-[0.66rem] font-bold"
                                style={{
                                    textShadow:
                                        card?.variant === "Holográfica"
                                            ? "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"
                                            : "",
                                }}
                            >
                                {card?.name.toUpperCase()}
                            </p>
                            <p
                                className="font-body text-[0.375rem]"
                                style={{
                                    textShadow:
                                        card?.variant === "Holográfica"
                                            ? "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"
                                            : "",
                                }}
                            >
                                {card?.title}
                            </p>
                        </div>
                        <p
                            className="font-body text-[0.35rem] text-white/75 italic text-center absolute top-[63.5%] w-full font-[300]"
                            style={{
                                textShadow:
                                    card?.variant === "Holográfica"
                                        ? "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"
                                        : "",
                            }}
                        >
                            {card?.pantheon + " • " + card?.age}
                        </p>
                        {isLoading ? (
                            <div className="flex size-full items-center justify-center absolute top-[69%]">
                                <img
                                    src={AnomalyLogo}
                                    className="size-4 animate-spin mb-12"
                                    draggable={false}
                                />
                            </div>
                        ) : (
                            <TextCard
                                text={card?.text || ""}
                                variant={card?.variant}
                                name={card?.name}
                            ></TextCard>
                        )}
                    </>
                    <>
                        {card?.variant === "Holográfica" && (
                            <img
                                loading="lazy"
                                draggable={false}
                                src={getGodDetails.getHoloImage(card?.rarity)}
                                className="h-auto aspect-5/7 absolute top-0 opacity-20"
                                style={{ filter: "brightness(75%)" }}
                            />
                        )}
                    </>
                </div>
            );
        } else {
            return <></>;
        }
    }
);

export default CardGod;
