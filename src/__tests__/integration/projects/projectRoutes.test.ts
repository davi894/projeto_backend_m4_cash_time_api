import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import { AppDataSource } from "../../../data-source";
import {
  mockedProject,
  mockedSecondUser,
  mockedSecondUserLogin,
  mockedUser,
  mockedUserLogin,
} from "../../mocks";

describe("/projects", () => {
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

  test("POST /projects - should be able to create project", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedProject);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("hourValue");
    expect(response.body).toHaveProperty("totalValue");
    expect(response.body).toHaveProperty("totalTime");
    expect(response.body.name).toEqual("Site de farmácia");
    expect(response.status).toBe(201);
  });

  test("POST /projects - should not be able to create project without authorization", async () => {
    await request(app).post("/login").send(mockedUserLogin);

    const projectResponse = await request(app)
      .post("/projects")
      .send(mockedProject);

    expect(projectResponse.body).toHaveProperty("message");
    expect(projectResponse.status).toBe(401);
  });

  test("POST /projects - should not be able to create project that already exists", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const ProjectResponse = await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedProject);

    expect(ProjectResponse.body).toHaveProperty("message");
    expect(ProjectResponse.status).toBe(409);
  });

  test("GET /projects - should be able to list all projects of user", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedProject);

    const projectListResponse = await request(app)
      .get("/projects")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(projectListResponse.body).toHaveLength(1);
    expect(projectListResponse.status).toBe(200);
  });

  test("GET /projects - should not be able to list all projects of user without authorization", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedProject);

    const projectListResponse = await request(app).get("/projects");

    expect(projectListResponse.body).toHaveProperty("message");
    expect(projectListResponse.status).toBe(401);
  });

  test("GET /projects/:project_id - should be able to list one project", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    mockedProject.name = "Teste 1";

    const createProjectResponse = await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedProject);

    const getProjectresponse = await request(app)
      .get(`/projects/${createProjectResponse.body.id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);


    expect(getProjectresponse.body).toHaveProperty("id");
    expect(getProjectresponse.body).toHaveProperty("name");
    expect(getProjectresponse.body).toHaveProperty("description");
    expect(getProjectresponse.body).toHaveProperty("status");
    expect(getProjectresponse.body).toHaveProperty("createdAt");
    expect(getProjectresponse.body).toHaveProperty("updatedAt");
    expect(getProjectresponse.body).toHaveProperty("hourValue");
    expect(getProjectresponse.body).toHaveProperty("totalValue");
    expect(getProjectresponse.body.name).toEqual("Teste 1");
    expect(getProjectresponse.status).toBe(200);
  });

  test("GET /projects/:project_id - should not be able to list one project with invalid id", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const getProjectResponse = await request(app)
      .get("/projects/7e1ad8a4-a704-4ba4-b9e6-658debfb20f6")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(getProjectResponse.body).toHaveProperty("message");
    expect(getProjectResponse.status).toBe(404);
  });

  test("GET /projects/:project_id - should not be able to list one project from another user", async () => {
    const secondUserProject = {
      name: "Site empresarial",
      hour_value: 15.0,
      total_value: 6000.0,
      description: "uma site para uma empresa de grande porte.",
    };

    await request(app).post("/user").send(mockedSecondUser);

    const firstUserLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const secondUserLoginResponse = await request(app)
      .post("/login")
      .send(mockedSecondUserLogin);

    const createProjectResponse = await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${secondUserLoginResponse.body.token}`)
      .send(secondUserProject);

    const getProjectResponse = await request(app)
      .get(`/projects/${createProjectResponse.body.id}`)
      .set("Authorization", `Bearer ${firstUserLoginResponse.body.token}`);

    expect(getProjectResponse.body).toHaveProperty("message");
    expect(getProjectResponse.status).toBe(404);
  });
});
