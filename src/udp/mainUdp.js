import dgram from "dgram";
import {isValidToken} from "../http/utils/jwt.js"
const server = dgram.createSocket("udp4");


server.on('error', (err) => {
    console.log(`Server error:\n${err.stack}`);
    server.close();
  });
  
  server.on('message', (msg, rinfo) => {
    console.log(`Received ${msg.length} bytes from ${rinfo.address}:${rinfo.port}`);
    console.log(`Message: ${msg.toString()}`);
  });
  server.bind(12345); // Replace 12345 with your desired port number
  
  server.on('listening', () => {
  });
  

// server.on("message", (msg, info) => {
//     console.log(msg.toString());
//     console.log(info.address);
//     if(isValidToken(msg.toString())){
//         console.log("token valid");
//     }
// })
// server.on("listening", () => {
//     console.log("listening udp server in port 87887");
// })

// server.bind(87887)
