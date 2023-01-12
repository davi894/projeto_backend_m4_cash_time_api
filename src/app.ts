import express from "express";
import "express-async-errors";
import "reflect-metadata";
import routerCheckpoint from "./routes/checkpoint/checkpoint.routes";
import handleError from "./errors/handleError";

const app = express();

app.use(express.json());
app.use("", routerCheckpoint);
app.use(handleError);

export default app;
