import express, { NextFunction, Request, Response } from "express";
import { Server } from "socket.io";

const app = express();

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(__dirname + "/index.html");
});

const server = app.listen(3000, () => {
    console.log("Running🏃.");
});

const io = new Server(server, { cors: { origin: "*", methods: ["GET", "POST", "PUT", "PATCH", "DELETE"] } });

io.on("connection", (socket) => {
    console.log(`User[${socket.id}] Connected!`);
    socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
    });
});