import React from "react";

const GameDeck: React.FC<{ children: React.ReactNode; size: number; position: 1 | 2 | 3 | 4 }> = ({
    children,
    size,
    position,
}) => {
    let locale: string = "";
    switch (position) {
        case 1:
            locale = "right-[12rem] top-[27.5rem]";
            break;

        case 2:
            locale = "right-[12.75rem] top-10";
            break;

        default:
            locale = "right-[12rem] top-20";
            break;
    }
    return (
        <div
            style={{ width: `${size}rem` }}
            className={` absolute ${locale} flex items-center gap-4 top`}
        >
            {children}
        </div>
    );
};

export default GameDeck;
