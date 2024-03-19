import React from "react";
import BtnFullscreen from "./BtnFullscreen";
import HeaderMenu from "./HeaderMenu";
import BtnSettings from "./BtnSettings";

const MenuPageWrapper: React.FC<{
    children: React.ReactNode;
    modal?: React.ReactNode;
    isModalOpen?: boolean;
    bg?: "play" | "collection";
}> = ({ children, modal, isModalOpen, bg }) => {
    return (
        <div
            className={`${bg === "collection" ? "bg-menu-collection" : "bg-menu-play"} bg-cover`}
            onContextMenu={(e) => {
                e.preventDefault();
            }}
        >
            <>
                <HeaderMenu />
                <BtnFullscreen />
                <BtnSettings />
            </>
            {isModalOpen && modal && (
                <div className="absolute size-full bg-black/85 z-[65]">{modal}</div>
            )}
            <div className="menu-content place-items-center w-full h-full">{children}</div>
        </div>
    );
};

export default MenuPageWrapper;
