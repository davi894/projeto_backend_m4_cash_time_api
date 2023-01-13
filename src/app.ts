import "express-async-errors";
import express from "express";
import "reflect-metadata";
import { projectsRouter } from "./routes/projects/projects.routes";
import routerCheckpoint from "./routes/checkpoint/checkpoint.routes";
import  handleError  from "./errors/handleError";
import sessionRoutes from "./routers/session.routes";
import usersRoutes from "./routers/users.routes";

const app = express();

app.use(express.json());

app.use("/user", usersRoutes);
app.use("/login", sessionRoutes);

app.use("", routerCheckpoint);

app.use("/projects",projectsRouter)

app.use(handleError);

export default app;
