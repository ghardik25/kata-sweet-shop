const request = require("supertest");
const app = require("../app");
const userRepository = require("../repositories/user.repository");

beforeEach(async () => {
  await userRepository.clearUsers();
});

describe("AUTH FLOW", () => {
  const userPayload = {
    name: "Hardik",
    email: "hardik@test.com",
    password: "password123",
  };

  it("should hash password before saving user", async () => {
    await request(app)
      .post("/api/auth/register")
      .send(userPayload);

    const user = userRepository.findByEmail(userPayload.email);

    expect(user.password).not.toBe(userPayload.password);
  });

  it("should login successfully with correct credentials", async () => {
    await request(app)
      .post("/api/auth/register")
      .send(userPayload);

    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: userPayload.email,
        password: userPayload.password,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it("should return 401 for invalid password", async () => {
    await request(app)
      .post("/api/auth/register")
      .send(userPayload);

    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: userPayload.email,
        password: "wrongpassword",
      });

    expect(response.statusCode).toBe(401);
  });

  it("should return 401 if user does not exist", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "nouser@test.com",
        password: "password123",
      });

    expect(response.statusCode).toBe(401);
  });
});
