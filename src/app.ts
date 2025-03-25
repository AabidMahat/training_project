import express from "express";
import { authRouting } from "./routers/auth.routing";
import { documentRouting } from "./routers/document.routing";

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api/v1/auth", authRouting);
app.use("/api/v1/document", documentRouting);

export default app;
