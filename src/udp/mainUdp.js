import dgram from "dgram";
import { isValidToken } from "../http/utils/jwt.js";
const server = dgram.createSocket("udp4");

//create game class
class Players {
	constructor() {
		this.id = null
		this.name = null;
		this.hp = {}
		this.isDead = {};
	}
}
class Game {
	constructor() {
		this.players = [];
		this.started = false;
	}
}


server.on("message", (msg, info) => {
	let body = getBody(msg)
	if(!body) return

	switch(body.requestType) {
		case "connection":
			if (isValidToken(body.token)) {
				server.send("connected", info.port, info.address);
			}
			break;
		case "findGame":
			if ( !isValidToken(body.token)) {
				return
			}
			//find if body.token is in lobby
			let index = lobby.findIndex((item) => item.token === body.token);
			if (index === -1) {
				//if not in lobby, add to lobby
				lobby.push({ token: body.token, port: info.port, address: info.address });
			} else {
				//if in lobby, remove from lobby and send to game
			}
			break;
		default:
			break;
	}
});


//handles bad json format
function getBody(msg) {
	let body
	try {
		body = JSON.parse(msg.toString());
	} catch (error) {
		body = null
	}
	return body
}

server.on("listening", () => {
	console.log("listening udp server in port 12345");
});

server.bind(12345);
