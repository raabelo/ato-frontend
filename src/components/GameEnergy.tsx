import React from "react";
import { GameContext } from "../contexts/GameContext";
import Age from "../types/Age";

const GameEnergy: React.FC<{ position: 1 | 2 }> = ({ position }) => {
    const { player1, player2 } = React.useContext(GameContext);

    const getEnergyColor = (age?: Age) => {
        switch (age) {
            case "Cyberpunk":
                return "🟣";
            case "Noir":
                return "⚪";
            case "Pirata":
                return "🔵";
            case "Steampunk":
                return "🟡";
            case "Faroeste":
                return "🔴";
            default:
                return "⚫";
        }
    };

    if (position === 2) {
        return (
            <div className=" absolute top-[12.5%] py-2">
                <div className="bg-black w-fit flex py-2 px-1 rounded-r-xl h-52">
                    <div className="flex flex-col gap-[0.125rem]">
                        {new Array(player2.energy.type1.active).fill(0).map(() => {
                            return (
                                <p key={(Math.random() * 1000).toString()}>
                                    {getEnergyColor(player2.energy.type1.age)}
                                </p>
                            );
                        })}
                        {new Array(player2.energy.type1.quantity - player2.energy.type1.active)
                            .fill(0)
                            .map(() => {
                                return (
                                    <p
                                        key={(Math.random() * 1000).toString()}
                                        className="text-white"
                                    >
                                        {getEnergyColor()}
                                    </p>
                                );
                            })}
                    </div>
                    <div className="flex flex-col gap-[0.125rem]">
                        {new Array(player2.energy.type2.active).fill(0).map(() => {
                            return (
                                <p key={(Math.random() * 1000).toString()}>
                                    {getEnergyColor(player2.energy.type2.age)}
                                </p>
                            );
                        })}
                        {new Array(player2.energy.type2.quantity - player2.energy.type2.active)
                            .fill(0)
                            .map(() => {
                                return (
                                    <p
                                        key={(Math.random() * 1000).toString()}
                                        className="text-white"
                                    >
                                        {getEnergyColor()}
                                    </p>
                                );
                            })}
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className=" pr-60 absolute top-[49.33%] py-2">
                <div className="bg-black w-fit flex py-2 px-1 rounded-r-xl h-52">
                    <div className="flex flex-col gap-[0.125rem]">
                        {new Array(player1.energy.type1.active).fill(0).map(() => {
                            return (
                                <p key={(Math.random() * 1000).toString()}>
                                    {getEnergyColor(player1.energy.type1.age)}
                                </p>
                            );
                        })}
                        {new Array(player1.energy.type1.quantity - player1.energy.type1.active)
                            .fill(0)
                            .map(() => {
                                return (
                                    <p
                                        key={(Math.random() * 1000).toString()}
                                        className="text-white"
                                    >
                                        {getEnergyColor()}
                                    </p>
                                );
                            })}
                    </div>
                    <div className="flex flex-col gap-[0.125rem]">
                        {new Array(player1.energy.type2.active).fill(0).map(() => {
                            return (
                                <p key={(Math.random() * 1000).toString()}>
                                    {getEnergyColor(player1.energy.type2.age)}
                                </p>
                            );
                        })}
                        {new Array(player1.energy.type2.quantity - player1.energy.type2.active)
                            .fill(0)
                            .map(() => {
                                return (
                                    <p
                                        key={(Math.random() * 1000).toString()}
                                        className="text-white"
                                    >
                                        {getEnergyColor()}
                                    </p>
                                );
                            })}
                    </div>
                </div>
            </div>
        );
    }
};

export default GameEnergy;
