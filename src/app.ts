import express from "express";
import http from "http";
import cors from "cors";

import { authRouting } from "./routers/auth.routing";
import { documentRouting } from "./routers/document.routing";
import { Server } from "socket.io";
import { configureSocket } from "./socket/socket.handler";
import { workSpaceRouting } from "./routers/workspace.routing";
import { activityRouter } from "./routers/activity.routing";
import { workspaceUserRouter } from "./routers/workspaceuser.routing";
import { requestRouting } from "./routers/request.routing";

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    origin: "*",
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

configureSocket(io);

app.use("/api/v1/auth", authRouting);
app.use("/api/v1/document", documentRouting);
app.use("/api/v1/workspace", workSpaceRouting);
app.use("/api/v1/activity", activityRouter);
app.use("/api/v1/workspaceUser", workspaceUserRouter);
app.use("/api/v1/request", requestRouting);

export default server;
