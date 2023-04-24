import dgram from "dgram";
import { isValidToken } from "../http/utils/jwt.js";
import { connection } from "./udpConnextion.js";
import { findGame } from "./udpFindGame.js";
import { Game } from "./models.js";
import { playerUpdate } from "./udpPlayerUpdate.js";

const server = dgram.createSocket("udp4");

function getBody(msg) {
	let body;
	try {
		body = JSON.parse(msg.toString());
	} catch (error) {
		body = null;
	}
	return body;
}


server.on("message", (msg, info) => {
	let body = getBody(msg);
	if (!body) return;
	if (!isValidToken(body.token)) {
		return;
    }

	switch (body.requestType) {
		case "connection":
			connection(server, body, info);
		break;
		case "findGame":
			findGame(server, body, info);
			Game.CheckStart(server)
		break;
		case "playerUpdate":
			playerUpdate(server, body, info)
		break;
	}
});




server.on("listening", () => {
	console.log("listening udp server in port 12345");
	// Game.startGame(server)
});

server.bind(12345);
