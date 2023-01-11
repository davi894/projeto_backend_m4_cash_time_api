import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
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
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.name).toEqual("maria");
    expect(response.body.email).toEqual("maria@mail.com");
    expect(response.body.isActive).toEqual(true);
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
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.name).toEqual("maria");
    expect(response.body.email).toEqual("maria@mail.com");
    expect(response.body.isActive).toEqual(true);

    expect(response.status).toBe(200);
  });

  test("GET /user -  should not be able to list user profile without authentication", async () => {
    const response = await request(app).get("/user");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /user/:id -  should not be able to delete user without authentication", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const UserTobeDeleted = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    const response = await request(app).delete(
      `/user/${UserTobeDeleted.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /users/:id -  Must be able to soft delete user", async () => {
    await request(app).post("/user").send(mockedUser);

    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const UserTobeDeleted = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/user/${UserTobeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    const findUser = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.status).toBe(204);
    expect(findUser.body[0].isActive).toBe(false);
  });

  test("DELETE /user/:id -  shouldn't be able to delete user with isActive = false", async () => {
    await request(app).post("/user").send(mockedUser);

    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const UserTobeDeleted = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/user/${UserTobeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /user/:id - should not be able to delete user with invalid id", async () => {
    await request(app).post("/user").send(mockedUser);

    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .delete(`/user/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /user/:id - should not be able to delete other user", async () => {
    await request(app).post("/user").send(mockedUser);
    const secondUserResponse = await request(app)
      .post("/user")
      .send(mockedSecondUser);

    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .delete(`/user/${secondUserResponse.body.id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /user/:id - should not be able to update user without authentication", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const userTobeUpdate = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    const response = await request(app).patch(
      `/user/${userTobeUpdate.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /user/:id - should not be able to update user with invalid id", async () => {
    const newValues = { name: "Maria Rita", email: "mariarita@mail.com" };

    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const token = `Bearer ${userLoginResponse.body.token}`;

    const userTobeUpdateRequest = await request(app)
      .get(`/user`)
      .set("Authorization", token);

    const userTobeUpdateId = userTobeUpdateRequest.body[0].id;

    const response = await request(app)
      .patch(`/user/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", token)
      .send(newValues);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("PATCH /user/:id - should not be able to update isActive field value", async () => {
    const newValues = { isActive: false };

    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const token = `Bearer ${userLoginResponse.body.token}`;

    const userTobeUpdateRequest = await request(app)
      .get("/user")
      .set("Authorization", token);

    const userTobeUpdateId = userTobeUpdateRequest.body[0].id;

    const response = await request(app)
      .patch(`/user/${userTobeUpdateId}`)
      .set("Authorization", token)
      .send(newValues);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /user/:id - should not be able to update id field value", async () => {
    const newValues = { id: false };

    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const token = `Bearer ${userLoginResponse.body.token}`;

    const userTobeUpdateRequest = await request(app)
      .get("/user")
      .set("Authorization", token);

    const userTobeUpdateId = userTobeUpdateRequest.body[0].id;

    const response = await request(app)
      .patch(`/user/${userTobeUpdateId}`)
      .set("Authorization", token)
      .send(newValues);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /user/:id - should not be able to update another user", async () => {
    const newValues = { isActive: false };

    const secondUserResponse = await request(app)
      .post("/user")
      .send(mockedSecondUser);

    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const secondUserLoginResponse = await request(app)
      .post("/login")
      .send(mockedSecondUserLogin);

    const userToken = `Bearer ${userLoginResponse.body.token}`;
    const secondUserToken = `Bearer ${secondUserLoginResponse.body.token}`;

    const userTobeUpdateRequest = await request(app)
      .get("/user")
      .set("Authorization", secondUserToken);
    const userTobeUpdateId = userTobeUpdateRequest.body[0].id;

    const response = await request(app)
      .patch(`/user/${userTobeUpdateId}`)
      .set("Authorization", userToken)
      .send(newValues);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /user/:id -  should be able to update user", async () => {
    const newValues = { name: "Maria Rita", email: "mariarita@mail.com" };

    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUser);
    const token = `Bearer ${userLoginResponse.body.token}`;

    const userTobeUpdateRequest = await request(app)
      .get("/user")
      .set("Authorization", token);
    const userTobeUpdateId = userTobeUpdateRequest.body[0].id;

    const response = await request(app)
      .patch(`/user/${userTobeUpdateId}`)
      .set("Authorization", token)
      .send(newValues);

    const userUpdated = await request(app)
      .get("/user")
      .set("Authorization", token);

    expect(response.status).toBe(200);
    expect(userUpdated.body[0].name).toEqual("Maria Rita");
    expect(userUpdated.body[0].email).toEqual("mariarita@mail.com");
    expect(userUpdated.body[0]).not.toHaveProperty("password");
  });
});
