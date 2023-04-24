import { Game } from "./models.js";

export function gameLoop(server, dt) {
 
    if (Game.starting) {
        if (Game.startCount > 0) {
            Game.startCount -= 1.5 * dt;
            console.log("Game Start in: " + Math.floor(Game.startCount))
        } else {
            Game.startCount = 0;
            console.log("Game Started")
            Game.starting = false;
            Game.started = true;
        }
    }
    if (Game.started) {
        Game.map.reduce(dt);
        Game.players.forEach((player) => {
            if (!player.inGame) {
                return
            }
            // player.sendData(server, player, player.info);
        });
    }
}