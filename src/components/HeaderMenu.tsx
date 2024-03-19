import React from "react";
import Routes from "../routes/routes";
import { Link } from "react-router-dom";

import MenuClick from "../assets/audio/uifx/button-click.wav";
import MenuHover from "../assets/audio/uifx/button-hover.wav";

const HeaderMenu: React.FC = React.memo(() => {
    const clickAudio = new Audio(MenuClick);
    const hoverAudio = new Audio(MenuHover);
    const pages = Routes.mountedPrivateRoutes.filter(
        (page) => !page.path?.includes("/game") && page.path !== "/"
    );

    return (
        <div className="bg-black/75 w-full h-[4.5rem] flex gap-16 items-center px-20 absolute">
            {pages.map((element) => {
                return (
                    <React.Fragment key={(Math.random() * 1000).toString()}>
                        {element?.id && (
                            <Link
                                to={`${element.path}`}
                                draggable={false}
                                className={`font-body 
                                           ${
                                               element.path === "/play"
                                                   ? "pt-0.5 text-black"
                                                   : "text-primary"
                                           }
                                           transition-all ease-in-out 
                                           hover:opacity-50`}
                            >
                                <div
                                    onClick={() => {
                                        clickAudio.play();
                                    }}
                                    onMouseEnter={() => {
                                        hoverAudio.play();
                                    }}
                                    className={`pt-0.5 ${
                                        element.path === "/play" &&
                                        `bg-btn-play w-32 h-8 grid place-content-center
                                         font-bold pl-2 bg-contain bg-no-repeat`
                                    }`}
                                >{`${element.id?.toUpperCase()}`}</div>
                            </Link>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
});

export default HeaderMenu;
