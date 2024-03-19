import React from "react";
import { useDrag } from "react-use-gesture";
import { animated, useSpring } from "@react-spring/web";

const DraggableElement: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const position = useSpring<{ x: number; y: number }>({ x: 0, y: 0 });

    const bindComponent = useDrag((params) => {
        console.log("dragging");
        position.x.set(params.offset[0]);
        position.y.set(params.offset[1]);
    });

    return (
        <>
            <animated.div
                {...bindComponent()}
                style={{
                    x: position.x,
                    y: position.y,
                    touchAction: "none",
                }}
            >
                {children}
            </animated.div>
        </>
    );
};

export default DraggableElement;
