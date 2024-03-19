import React from "react";
import GamePageWrapper from "../components/GamePageWrapper";
import GameHand from "../components/GameHand";
import ProfileInfo from "../components/ProfileInfo";
import GameCharacter from "../components/GameCharacter";
import GameBoard from "../components/GameBoard";
import GameEnergy from "../components/GameEnergy";
import { GameContext } from "../contexts/GameContext";
import { useSearchParams } from "react-router-dom";
import Requests from "../services/api";
import StartGame from "../events/controllers/StartGame";
import GameListener from "../events/controllers/GameListener";
// import { GameContext } from "../contexts/GameContext";

const Game: React.FC = () => {
    const [urlParams] = useSearchParams();
    const { setPlayer1, setPlayer2 } = React.useContext(GameContext);
    const [didMount, setDidMount] = React.useState(false);

    const fetchGame = () => {
        const gameId = urlParams.get("session");
        const playerId = localStorage.getItem("uid");
        if (gameId && playerId) {
            Requests.get(`/games/${gameId}`)
                .then((res) => {
                    StartGame(playerId, gameId);
                    const gameState = JSON.parse(res.data.state);
                    if (gameState.players[0] === playerId) {
                        setPlayer1(gameState.gamelog.player1);
                        setPlayer2(gameState.gamelog.player2);
                        GameListener({
                            id: gameId,
                            setPlayer1,
                            setPlayer2,
                            player1: gameState.gamelog.player1,
                            player2: gameState.gamelog.player2,
                        });
                    } else {
                        setPlayer1(gameState.gamelog.player2);
                        setPlayer2(gameState.gamelog.player1);
                        GameListener({
                            id: gameId,
                            setPlayer1,
                            setPlayer2,
                            player1: gameState.gamelog.player2,
                            player2: gameState.gamelog.player1,
                        });
                    }
                })
                .catch((e) => {
                    console.log(e);
                })
                .finally(() => {
                    setDidMount(true);
                });
        }
    };

    React.useEffect(() => {
        if (!didMount) {
            fetchGame();
        }
    }, []);

    if (!didMount) {
        return <div></div>;
    }

    return (
        <GamePageWrapper>
            <GameBoard />

            <ProfileInfo position={1} />
            <ProfileInfo position={2} />

            <GameHand position={2} />
            <GameCharacter position={2} />

            <GameCharacter position={1} />
            <GameHand position={1} />

            {/* <GameEnergy position={1} /> */}
            {/* <GameEnergy position={2} /> */}

            <button
                type="button"
                className="absolute top-[39.33%] right-[5.5%] bg-primary
                 text-black rounded-full px-[0.2rem] py-[0.175rem] overflow-hidden font-bold text-sm"
            >
                <p className=" border-black border-2 w-full px-7 py-1 rounded-full">Passar</p>
            </button>

            {/* <div className="bg-black/70 w-full h-full absolute" style={{ zIndex: 5 }} /> */}
        </GamePageWrapper>
    );
};

export default Game;
