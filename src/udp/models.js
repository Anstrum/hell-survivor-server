import { gameLoop } from "./gameLoop.js";



export class Players {
	constructor() {
		this.info = null;
		this.id = null;
		this.hp = null;
		this.isDead = null;
		this.inGame = false;

		this.sendData = (server, data, info) => {
			server.send(JSON.stringify(data), info.port, info.address)
		}
	}
}

class Map {
	constructor() {	
		this.radius = 10000
		this.reduceSpeed = 150
		this.deleted = false
	}

	reduce(dt) {
		this.radius -= this.reduceSpeed * dt
		if(this.deleted) return
		if (this.radius <= 0) {
			this.deleted = true
			this.radius = 0
		}
	}
}

export class Game {
    static id = "La seule game du serveur";
    static maxPlayers = 10;
    static minPlayers = 1;
    static players = [];
    static starting = false;
    static started = false;
	static startCount = 0;

	static map = new Map()

	static startGame(server) {
		console.log("Game started")
		this.players.forEach((player) => {
			player.hp = 100;
			player.isDead = false;
		});

		Game.startCount = 10;
		Game.starting = true;
		setInterval(() => {
			gameLoop(server, 1 / 60);
		}, 1 / 60 * 1000);
	}
	static CheckStart(server) {
		if(Game.players.length >= Game.minPlayers && !Game.starting && !Game.started){
			Game.startGame(server);
		}
	}
	static stopGame() {
		this.started = false;
		this.players.forEach((player) => {
			player.hp = 0;
			player.isDead = true;
		});
	}
}