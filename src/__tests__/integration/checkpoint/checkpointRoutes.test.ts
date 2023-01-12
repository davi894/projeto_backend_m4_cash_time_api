import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import {
  mockedProject,
  mockedSecondUser,
  mockedSecondUserLogin,
  mockedUser,
  mockedUserLogin,
} from "../../mocks";

describe("/project", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/user").send(mockedUser);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /checkpoint/:project_id -  should not be able to list all projects of user without authorization", () => {


  });
});
