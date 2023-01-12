import express from "express";
import "express-async-errors";
import "reflect-metadata";
import handleError from "./errors/handleError";
import { projectsRouter } from "./routes/projects/projects.routes";


const app = express();

app.use(express.json());
app.use(handleError);
app.use("/projects",projectsRouter)
export default app;
