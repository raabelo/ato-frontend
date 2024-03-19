import { Dispatch, SetStateAction } from "react";
import { socket } from "../../services/socket";
import iGamePlayer from "../../types/interfaces/iGamePlayer";
import DrawCard from "../game/DrawCard";
import Requests from "../../services/api";

const GameListener = (session: {
    id: string;
    setPlayer1: Dispatch<SetStateAction<iGamePlayer>>;
    setPlayer2: Dispatch<SetStateAction<iGamePlayer>>;
    player1: iGamePlayer;
    player2: iGamePlayer;
}) => {
    socket.on("[action_draw]", (action: string) => {
        const act = JSON.parse(action);
        if (act.target === session.player1.uid) {
            Requests.get(`/games/${session.id}`).then((res) => {
                const gameState = JSON.parse(res.data.state);
                if (gameState.gamelog.player1.uid === session.player1.uid) {
                    DrawCard(gameState.gamelog.player1, session.setPlayer1);
                } else if (gameState.gamelog.player2.uid === session.player1.uid) {
                    DrawCard(gameState.gamelog.player2, session.setPlayer1);
                }
            });
        } else if (act.target === session.player2.uid) {
            Requests.get(`/games/${session.id}`).then((res) => {
                const gameState = JSON.parse(res.data.state);
                if (gameState.gamelog.player1.uid === session.player2.uid) {
                    DrawCard(gameState.gamelog.player1, session.setPlayer2);
                } else if (gameState.gamelog.player2.uid === session.player2.uid) {
                    DrawCard(gameState.gamelog.player2, session.setPlayer2);
                }
            });
        }
    });
};

export default GameListener;
