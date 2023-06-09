import dgram from "dgram";
import { isValidToken } from "../http/utils/jwt.js";
import { Game, Players } from "./models.js";

//export connection function
export function findGame(server, body, info) {
    let index = Game.players.findIndex((player) => player.token === body.token);
    console.log("test")
    let answer = {
        requestType: "findGame",
        searchState: null,
        playerCount: null,
        timeToStart: null,
    }

    if (index === -1) {
        if( Game.started) {
            console.log("Game already started")
            answer.searchState = "MATCHING";
            answer.playerCount = null;
            answer.timeToStart = null;
        } else {
            console.log("User added to game")
            let player = new Players();
                player.id = body.id;
                player.token = body.token;
                player.info = info;

                Game.players.push(player);
                Game.CheckStart(server);

                //check game state
                if(Game.starting) {
                    answer.searchState = "STARTING";
                    answer.playerCount = Game.players.length;
                    answer.timeToStart = Game.startCount;
                } else {
                    answer.searchState = "MATCHING";
                    answer.playerCount = Game.players.length;
                    answer.timeToStart = null;
                }
        }
    } else {
        answer.searchState = "MATCHING";
        answer.playerCount = Game.players.length;
        answer.timeToStart = null;
        if(Game.starting) {
            answer.searchState = "STARTING";
            answer.playerCount = Game.players.length;
            answer.timeToStart = Game.startCount;
        } 
        if(Game.started) {
            answer.searchState = "STARTED";
            answer.playerCount = Game.players.length;
            answer.timeToStart = null;
        }
    };
    server.send(JSON.stringify(answer), info.port, info.address);
}