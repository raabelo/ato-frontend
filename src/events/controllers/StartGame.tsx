import { socket } from "../../services/socket";

// AQUI SÈRA ONDE SERA CRIADA A SESSAO PARA O JOGO

const StartGame = (player: string, session: string) => {
    const handleJoinGame = () => {
        try {
            socket.emit("joinGame", JSON.stringify({ sessionId: session, playerId: player }));
        } catch {
            throw new Error("não deu join no game");
        }
    };
    handleJoinGame();
};
export default StartGame;
