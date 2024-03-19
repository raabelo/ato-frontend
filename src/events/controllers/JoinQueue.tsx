import { NavigateFunction } from "react-router-dom";
import { socket } from "../../services/socket";
import Requests from "../../services/api";

const JoinQueue = (player: string, navigate: NavigateFunction) => {
    const getQueueRank = () => {
        return "queue";
    };

    const handleJoinQueue = () => {
        socket.emit("joinQueue", JSON.stringify({ sessionId: getQueueRank(), playerId: player }));
        socket.on("gameReady", (match) => {
            Requests.get(`/games/${match}`).then((res) => {
                const gameState = JSON.parse(res.data.state);
                navigate(
                    `/game?session=${match}&player1=${gameState.players[0]}&player2=${gameState.players[1]}`
                );
            });
        });
    };
    handleJoinQueue();
};
export default JoinQueue;
