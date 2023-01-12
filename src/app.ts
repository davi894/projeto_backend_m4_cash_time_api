import "reflect-metadata";
import "express-async-errors";
import express from "express";
import handleError from "./errors/handleError";
import checkpointRoute from "./routes/checkpoint/checkpoint.routes";

const app = express();

app.use(express.json());
app.use("", checkpointRoute)
app.use(handleError);

export default app;
