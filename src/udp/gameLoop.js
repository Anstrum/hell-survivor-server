import { Game } from "./models.js";

export function gameLoop(server, dt) {
 
    if (Game.starting) {
        if (Game.startCount > 0) {
            Game.startCount -= 1.5 * dt;
            if(Game.roundedStartCount > Math.floor(Game.startCount)) {
                console.log("Game Start in: " + Math.floor(Game.startCount))
                Game.roundedStartCount = Math.floor(Game.startCount);
            }
        } else {
            Game.startCount = 0;
            console.log("Game Started with " + Game.players.length + " players")
            Game.starting = false;
            Game.started = true;
        }
    }
    if (Game.started) {
        Game.map.reduce(dt);
        console.log("Game Update")
        Game.players.forEach((player) => {
            if (player.inGame) {
                let data = {
                    requestType: "gameUpdate",
                    mapRadius: Game.map.radius,
                }
                player.sendData(server, data, player.info);
            }
        });
        let waitingPlayers = Game.players.filter((player) => !player.inGame);
        console.log(waitingPlayers.length + " players not in game")
    }
}