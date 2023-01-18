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
  mockedUserCheckpoint,
  mockedUserLoginCheckpoint,
} from "../../mocks";

describe("/checkpoint", () => {
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
    await request(app).post("/user").send(mockedUserCheckpoint);

    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLoginCheckpoint);

    const responseGetUser = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    mockedCheckpoint.user_id = responseGetUser.body.id;

    const responseProject = await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedProject);

    const getProjectresponse = await request(app)
      .get(`/projects/${responseProject.body.id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    mockedCheckpoint.project_id = getProjectresponse.body.id;

    const responseCheckpoint = await request(app)
      .post(`/checkpoint/${getProjectresponse.body.id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedCheckpoint);

    expect(responseCheckpoint.body).toHaveProperty("entry");
    expect(responseCheckpoint.body).toHaveProperty("output");
    expect(responseCheckpoint.body).toHaveProperty("date");
    expect(responseCheckpoint.body).toHaveProperty("user_");
    expect(responseCheckpoint.body).toHaveProperty("projects_");
    expect(responseCheckpoint.body).toHaveProperty("id");
    expect(responseCheckpoint.status).toBe(201);
  });

  test("POST /checkpoint/:project_id - should not be able to create checkpoint without authorization", async () => {
    await request(app).post("/login").send(mockedUserLogin);

    await request(app).post("/projects").send(mockedProject);

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
      .post("/projects")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedProject);

    mockedCheckpoint.user_id = responseRegister.body.id;
    mockedCheckpoint.project_id = responseProject.body.id;

    const responseCheckpoint = await request(app)
      .get(`/checkpoint/${responseProject.body.id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedCheckpoint);

    expect(responseCheckpoint.body).toHaveProperty("id");
    expect(responseCheckpoint.body).toHaveProperty("entry");
    expect(responseCheckpoint.body).toHaveProperty("output");
    expect(responseCheckpoint.body).toHaveProperty("date");
    expect(responseCheckpoint.status).toBe(200);
  });

  test("GET /checkpoint/:project_id - should not be able to list all projects of checkpoints the one porject without authorization ", async () => {
    await request(app).post("/user").send(mockedUser);

    await request(app).post("/login").send(mockedUserLogin);

    const project = await request(app).post("/projects").send(mockedProject);

    const responseCheckpoint = await request(app)
      .get(`/checkpoint/:${project.body.projects_id}`)
      .send(mockedCheckpoint);

    expect(responseCheckpoint.body).toHaveProperty("message");
    expect(responseCheckpoint.status).toBe(401);
  });

  test("PATCH /checkpoint/:project_id -  should not be able to update checkpoint without authorization", async () => {
    await request(app).post("/user").send(mockedUser);

    await request(app).post("/login").send(mockedUserLogin);

    const projects = await request(app).post("/projects").send(mockedProject);

    const responseCheckpoint = await request(app)
      .patch(`/checkpoint/${projects.body.id}`)
      .send(mockedCheckpointUpdate);

    expect(responseCheckpoint.body).toHaveProperty("message");
    expect(responseCheckpoint.status).toBe(401);
  });

  test("PATCH /checkpoint/:project_id - update checkpoint in project", async () => {
    await request(app).post("/user").send(mockedUser);

    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    mockedProject.name = "teste 11";
    mockedProject.description = "teste 11";

    const project = await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedProject);

    const check = await request(app)
      .post(`/checkpoint/${project.body.id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedCheckpoint);

    mockedCheckpointUpdate.project_id = project.body.id;
    mockedCheckpointUpdate.checkpoint_id = check.body.id;

    const responseCheckpoint = await request(app)
      .patch(`/checkpoint/${project.body.id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedCheckpointUpdate);

    expect(responseCheckpoint.body).toHaveProperty("message");
    expect(responseCheckpoint.status).toBe(200);
  });
});
