import dgram from "dgram";
import { isValidToken } from "../http/utils/jwt.js";

//export connection function
export function connection(server, msg, info) {
    server.send("connected", info.port, info.address);
}