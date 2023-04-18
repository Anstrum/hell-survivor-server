import dgram from "dgram";

const server = dgram.createSocket({type: "udp4"});
server.bind(12345)

server.on("listening", () => {
    console.log("listening udp server in port 12345");
})

server.on("message", (msg, info) => {
    console.log(msg.toString());
    console.log(info.address);

    if (msg.toString() === "ping") {
        server.send(JSON.stringify({xPos: 231, yPos: 3021}), info.port, info.address)
    }
})