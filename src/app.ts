import express from "express";
import http from "http";

import { authRouting } from "./routers/auth.routing";
import { documentRouting } from "./routers/document.routing";
import { Server } from "socket.io";
import { configureSocket } from "./socket/socket.handler";

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

configureSocket(io);

app.use("/api/v1/auth", authRouting);
app.use("/api/v1/document", documentRouting);

export default server;
