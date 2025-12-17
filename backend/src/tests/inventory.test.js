const request = require("supertest");
const app = require("../app");
const sweetsRepository = require("../repositories/sweets.repository");
const userRepository = require("../repositories/user.repository");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "test-secret";

let adminToken;
let userToken;
let sweetId;

beforeEach(() => {
  sweetsRepository.clear();
  userRepository.clearUsers();

  const admin = userRepository.create({
    id: 1,
    email: "admin@test.com",
    password: "hashed",
    role: "admin",
  });

  const user = userRepository.create({
    id: 2,
    email: "user@test.com",
    password: "hashed",
    role: "user",
  });

  adminToken = jwt.sign({ id: admin.id, role: "admin" }, JWT_SECRET);
  userToken = jwt.sign({ id: user.id, role: "user" }, JWT_SECRET);

  const sweet = sweetsRepository.create({
    name: "Ladoo",
    category: "Indian",
    price: 10,
    quantity: 5,
  });

  sweetId = sweet.id;
});

describe("INVENTORY API", () => {
  it("should allow user to purchase a sweet", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
  });

  it("should prevent purchase if out of stock", async () => {
    sweetsRepository.updateQuantity(sweetId, 0);

    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(400);
  });

  it("should allow admin to restock a sweet", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ quantity: 10 });

    expect(res.statusCode).toBe(200);
  });

  it("should block non-admin from restocking", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ quantity: 10 });

    expect(res.statusCode).toBe(403);
  });
});
