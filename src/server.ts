import express, { NextFunction, Request, Response } from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
    console.log(`User[${socket.id}] Connected!`);
    socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
    });
});

server.listen(3000, () => {
    console.log("Running🏃.");
});
