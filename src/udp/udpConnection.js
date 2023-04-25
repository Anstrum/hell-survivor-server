import { isValidToken } from "../http/utils/jwt.js";

//export connection function
export function connection(server, msg, info) {
    if(isValidToken(msg.token)) {
        server.send("connected", info.port, info.address)
    }
}