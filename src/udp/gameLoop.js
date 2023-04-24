import { Game } from "./models.js";

export function gameLoop(server, dt) {
 
    if (Game.starting) {
        if (Game.startCount > 0) {
            Game.startCount -= 0.5;
        } else {
            Game.starting = false;
            Game.started = true;
        }
    }
    if (Game.started) {
        Game.map.reduce(dt);
        Game.players.forEach((player) => {
            //update game
            player.sendData(server, player, player.info);
        });
    }
}