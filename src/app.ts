import "reflect-metadata";
import express from "express";
import routerCheckpoint from "./routes/checkpoint/checkpoint.routes";
import handleError from "./errors/handleError";

const app = express();

app.use(express.json());
app.use("", routerCheckpoint);

app.use(handleError);

export default app;
