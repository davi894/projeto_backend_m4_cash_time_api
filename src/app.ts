import express from "express";
import "express-async-errors";
import "reflect-metadata";
import { handleError } from "./errors/handleError";
import sessionRoutes from "./routers/session.routes";
import usersRoutes from "./routers/users.routes";

const app = express();

app.use(express.json());
app.use("/user", usersRoutes);
app.use("/login", sessionRoutes);

app.use(handleError);

export default app;
