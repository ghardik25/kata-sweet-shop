const request = require("supertest");
const app = require("../app");
const userRepository = require("../repositories/user.repository");

beforeEach(async () => {
  await userRepository.clearUsers();
});

describe("POST /api/auth/register", () => {
  it("should register a new user and return 201", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Hardik",
        email: "hardik@test.com",
        password: "password123",
      });

    expect(response.statusCode).toBe(201);
  });

  it("should return 400 if email is missing", async () => {
  const response = await request(app)
    .post("/api/auth/register")
    .send({
      name: "Hardik",
      password: "secret123",
    });

  expect(response.statusCode).toBe(400);
});

  it("should return 400 if email already exists", async () => {
  await request(app).post("/api/auth/register").send({
    email: "duplicate@test.com",
    password: "secret123",
  });

  const response = await request(app)
    .post("/api/auth/register")
    .send({
      email: "duplicate@test.com",
      password: "secret123",
    });

  expect(response.statusCode).toBe(400);
});
     
});
