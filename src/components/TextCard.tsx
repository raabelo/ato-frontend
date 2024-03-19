import React from "react";
import handleIcon from "../utils/functions/handleIcon";

const TextCard: React.FC<{ text: string; variant: string; name: string }> = ({
    text,
    variant,
    name,
}) => {
    const textLines = String(text).split("\n");
    const replaceWithImage = (text: string) => {
        const parts = text.split(/(\[.*?\])/);
        return (
            <>
                {parts.map((part, index) => (
                    <React.Fragment key={index}>
                        {part.includes("[" || "]") ? "" : part}
                        {part && index < parts.length - 1 && handleIcon(part)}
                    </React.Fragment>
                ))}
            </>
        );
    };

    return (
        <div
            className="text-black font-body text-[0.375rem] absolute top-[69%] w-full px-[0.66rem] h-1/5 text-left"
            style={{
                textShadow:
                    variant === "Holográfica"
                        ? "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"
                        : "",
            }}
        >
            {textLines.map((line, index) => (
                <p className="mb-0.5" key={index}>
                    {replaceWithImage(line.replace("[name]", name))}
                </p>
            ))}
        </div>
    );
};

export default TextCard;
