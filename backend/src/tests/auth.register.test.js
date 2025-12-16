const request = require("supertest");
const app = require("../app");

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
});
