import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import { AppDataSource } from "../../../data-source";

import {
  mockedSecondUser,
  mockedSecondUserLogin,
  mockedUser,
  mockedUserLogin,
} from "../../mocks";

describe("/user", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /users -  Must be able to create a user", async () => {
    const response = await request(app).post("/user").send(mockedUser);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.name).toEqual("maria");
    expect(response.body.email).toEqual("maria@mail.com");

    expect(response.status).toBe(201);
  });

  test("POST /users -  should not be able to create a user that already exists", async () => {
    const response = await request(app).post("/user").send(mockedUser);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });

  test("GET /user -  Must be able to list user profile", async () => {
    await request(app).post("/users").send(mockedUser);
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const response = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.name).toEqual("maria");
    expect(response.body.email).toEqual("maria@mail.com");

    expect(response.status).toBe(200);
  });

  test("GET /user -  should not be able to list user profile without authentication", async () => {
    const response = await request(app).get("/user");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /user -  should not be able to delete user without authentication", async () => {
    await request(app).post("/user").send(mockedUser);

    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    const response = await request(app).delete(`/user`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /user - Must be able to soft delete user", async () => {
    await request(app).post("/user").send(mockedUser);

    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/user`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    const findUser = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.status).toBe(204);

    expect(findUser.body.isActive).toBe(false);
  });

  test("PATCH /user - should not be able to update user without authentication", async () => {
    await request(app).post("/user").send(mockedUser);

    await request(app).post("/login").send(mockedUserLogin);

    const response = await request(app).patch(`/user`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /user - should not be able to update id field value", async () => {
    await request(app).post("/user").send(mockedUser);

    const newValues = { id: false };

    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const token = `Bearer ${userLoginResponse.body.token}`;

    const response = await request(app)
      .patch(`/user`)
      .set("Authorization", token)
      .send(newValues);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /user -  should be able to update user", async () => {
    await request(app).post("/user").send(mockedUser);

    const newValues = { name: "Maria Rita", email: "mariarita@mail.com" };

    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .patch(`/user`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(newValues);

    expect(response.status).toBe(200);

    expect(response.body.name).toEqual("Maria Rita");
    expect(response.body.email).toEqual("mariarita@mail.com");
    expect(response.body).not.toHaveProperty("password");
  });
});
