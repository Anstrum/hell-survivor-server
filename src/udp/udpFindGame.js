import dgram from "dgram";
import { isValidToken } from "../http/utils/jwt.js";
import { Game, Players } from "./models.js";

//export connection function
export function findGame(server, body, info) {
    let index = Game.players.findIndex((player) => player.token === body.token);

    let answer = {
        requestType: "findGame",
        searchState: null,
        playerCount: null,
        timeToStart: null,
    }

    if (index === -1) {
        if( Game.started) {
            //game is already started
            answer.requestType = "MATCHING";
            answer.playerCount = null;
            answer.timeToStart = null;
        } else {
            //add player to the game
            let player = new Players();
                player.id = body.id;
                player.token = body.token;

                Game.players.push(player);


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
    console.log("test")
    server.send(JSON.stringify(answer), info.port, info.address);
}