import "dotenv/config";
import path from "path";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource(
  process.env.NODE_ENV === "test"
    ? {
        type: "sqlite",
        database: ":memory:",
        synchronize: true,
        entities: ["src/entities/*.ts"],
      }
    : {
        type: "postgres",
        host: process.env.PGHOST,
        port: parseInt(process.env.PGPORT!),
        username: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        logging: true,
        synchronize: false,
        entities: [path.join(__dirname, "./entities/**.{js,ts}")],
        migrations: [path.join(__dirname, "./migrations/**.{js,ts}")],
      }
);

export default AppDataSource;
