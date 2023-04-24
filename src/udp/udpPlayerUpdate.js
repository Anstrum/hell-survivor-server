import { Game } from "./models.js";

export function playerUpdate(server, body, info) {
    let index = Game.players.findIndex((player) => player.token === body.token);
    if (index === -1) return;
    Game.players[index].inGame = true; 

    //manage player inputs
}