
import "express-async-errors";
import express from "express";
import "reflect-metadata";
import handleError from "./errors/handleError";
import { projectsRouter } from "./routes/projects/projects.routes";

const app = express();

app.use(express.json());

app.use("", routerCheckpoint);

app.use("/projects",projectsRouter)

app.use(handleError);
export default app;
