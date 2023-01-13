import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
<<<<<<< HEAD
import {AppDataSource} from "../../../data-source";
=======
import { AppDataSource } from "../../../data-source";
>>>>>>> 7677174c9bb0a84f565a5c256e0515ffb3db18c3
import { mockedUser, mockedUserLogin } from "../../mocks";

describe("/login", () => {
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

  test("POST /login -  should be able to login with the user", async () => {
    const response = await request(app).post("/login").send(mockedUserLogin);

    expect(response.body).toHaveProperty("token");
    expect(response.status).toBe(200);
  });

  test("POST /login -  should not be able to login with the user with incorrect password or email", async () => {
    const response = await request(app).post("/login").send({
      email: "felipe@mail.com",
      password: "1234567",
    });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("POST /login -  should not be able to login with the user with isActive = false", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const findUser = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    await request(app)
      .delete(`/user/${findUser.body[0].id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    const response = await request(app).post("/login").send(mockedUserLogin);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });
});
