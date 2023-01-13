import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import { AppDataSource } from "../../../data-source";
import {
  mockedProject,
  mockedUser,
  mockedUserLogin,
  mockedCheckpoint,
  mockedCheckpointUpdate,
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

  test("POST /checkpoint/:project_id - checkpoint registration", async () => {
    const responseRegister = await request(app).post("/user").send(mockedUser);

    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const responseProject = await request(app)
      .post("/project")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedProject);

    mockedCheckpoint.user_id = responseRegister.body[0].id;
    mockedCheckpoint.project_id = responseProject.body[0].id;

    const responseCheckpoint = await request(app)
      .post("/checkpoint/:project_id")
      .send(mockedCheckpoint);

    expect(responseCheckpoint.body).toHaveProperty("message");
    expect(responseCheckpoint.status).toBe(201);
  });

  test("POST /checkpoint/:project_id - should not be able to create checkpoint without authorization", async () => {
    await request(app).post("/login").send(mockedUserLogin);

    await request(app).post("/project").send(mockedProject);

    const responseCheckpoint = await request(app)
      .post("/checkpoint/:project_id")
      .send(mockedCheckpoint);

    expect(responseCheckpoint.body).toHaveProperty("message");
    expect(responseCheckpoint.status).toBe(401);
  });

  test("GET /checkpoint/:project_id - listing of all checkpoints in a project", async () => {
    const responseRegister = await request(app).post("/user").send(mockedUser);

    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const responseProject = await request(app)
      .post("/project")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedProject);

    mockedCheckpoint.user_id = responseRegister.body[0].id;
    mockedCheckpoint.project_id = responseProject.body[0].id;

    const responseCheckpoint = await request(app)
      .get("/checkpoint/:project_id")
      .send(mockedCheckpoint);

    expect(responseCheckpoint.body).toHaveProperty("map");
    expect(responseCheckpoint.body).toBe(
      expect.objectContaining({
        entry: expect.any.toString(),
        exit: expect.any.toString(),
        date: expect.any.toString(),
        user_id: expect.any.toString(),
        project_id: expect.any.toString(),
      })
    );
    expect(responseCheckpoint.status).toBe(200);
  });

  test("GET /checkpoint/:project_id - should not be able to list all projects of checkpoints the one porject without authorization ", async () => {
    await request(app).post("/user").send(mockedUser);

    await request(app).post("/login").send(mockedUserLogin);

    await request(app).post("/project").send(mockedProject);

    const responseCheckpoint = await request(app)
      .get("/checkpoint/:project_id")
      .send(mockedCheckpoint);

    expect(responseCheckpoint.body).toHaveProperty("message");
    expect(responseCheckpoint.status).toBe(401);
  });

  test("PATCH /checkpoint/:project_id - update checkpoint in project", async () => {
    await request(app).post("/user").send(mockedUser);

    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    await request(app)
      .get("/project/:project_id")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedProject);

    const responseCheckpoint = await request(app)
      .patch("/checkpoint/:project_id")
      .send(mockedCheckpointUpdate);

    expect(responseCheckpoint.body).toHaveProperty("message");
    expect(responseCheckpoint.status).toBe(200);
  });

  test("PATCH /checkpoint/:project_id -  should not be able to update checkpoint without authorization", async () => {
    await request(app).post("/user").send(mockedUser);

    await request(app).post("/login").send(mockedUserLogin);

    await request(app).post("/project").send(mockedProject);

    const responseCheckpoint = await request(app)
      .patch("/checkpoint/:project_id")
      .send(mockedCheckpointUpdate);

    expect(responseCheckpoint.body).toHaveProperty("message");
    expect(responseCheckpoint.status).toBe(401);
  });
});
