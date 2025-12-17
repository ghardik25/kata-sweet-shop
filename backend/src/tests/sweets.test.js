const request = require("supertest");
const app = require("../app");
const sweetsRepository = require("../repositories/sweets.repository");
const userRepository = require("../repositories/user.repository");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "test-secret";

let token;

beforeEach(async () => {
  sweetsRepository.clear();
  userRepository.clearUsers();

  // create user and token
  const user = userRepository.create({
    id: 1,
    email: "admin@test.com",
    password: "hashed",
    role: "admin",
  });

  token = jwt.sign({ id: user.id, role: "admin" }, JWT_SECRET);
});

describe("SWEETS API", () => {
  it("should add a new sweet", async () => {
    const response = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Ladoo",
        category: "Indian",
        price: 10,
        quantity: 100,
      });

    expect(response.statusCode).toBe(201);
  });

  it("should list all sweets", async () => {
    await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Barfi",
        category: "Indian",
        price: 20,
        quantity: 50,
      });

    const response = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${token}`);

    expect(response.body.length).toBe(1);
  });

  it("should prevent unauthorized access", async () => {
    const response = await request(app).get("/api/sweets");
    expect(response.statusCode).toBe(401);
  });
});
