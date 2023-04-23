//export all class of the file

export class Players {
	constructor() {
		this.id = null;
		this.name = null;
		this.hp = null;
		this.isDead = null;
	}
}

export class Game {
    static id = "La seule game du serveur";
    static maxPlayers = 1;
    static players = [];
    static started = false;

	static startGame() {
		this.started = true;
		this.players.forEach((player) => {
			player.hp = 100;
			player.isDead = false;
		});
	}
	static stopGame() {
		this.started = false;
		this.players.forEach((player) => {
			player.hp = 0;
			player.isDead = true;
		});
	}
}