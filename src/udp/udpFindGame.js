import dgram from "dgram";
import { isValidToken } from "../http/utils/jwt.js";
import { Game, Players } from "./models.js";

//export connection function
export function findGame(server, body, info) {
    let index = Game.players.findIndex((player) => player.token === body.token);
    let answer = {
        requestType: "findGame",
        gameFound: false,
        lobbyId: null,
        playerCount: null,
    }

    if (index === -1) {
        if( Game.started) {
            answer.gameFound = false;
            answer.lobbyId = null;
            answer.playerCount = null;
        } else {
            let player = new Players();
                player.id = body.id;
                player.name = body.name;
                player.token = body.token;

                Game.players.push(player);

            answer.gameFound = true;
            answer.lobbyId = Game.id;
            answer.playerCount = Game.players.length;
        }
    } else {
        answer.gameFound = true;
        answer.lobbyId = Game.id;
        answer.playerCount = Game.players.length;
    };
    server.send(JSON.stringify(answer), info.port, info.address);
}