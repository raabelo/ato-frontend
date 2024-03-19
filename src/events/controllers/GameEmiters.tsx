import { socket } from "../../services/socket";
import iGamePlayer from "../../types/interfaces/iGamePlayer";

export const DrawCardAction = (sessionId: string, sender: string, player: iGamePlayer) => {
    const action = "[action_draw]";
    console.log("emit");
    socket.emit(
        "gameAction",
        JSON.stringify({
            playerId: sender,
            sessionId: sessionId,
            action: action,
            actionTarget: player.uid,
        })
    );
};
