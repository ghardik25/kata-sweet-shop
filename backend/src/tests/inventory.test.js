const request = require("supertest");
const app = require("../app");
const sweetsRepository = require("../repositories/sweets.repository");
const userRepository = require("../repositories/user.repository");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "test-secret";

let adminToken;
let userToken;
let sweetId;

beforeEach(async () => {
  await sweetsRepository.clear();
  await userRepository.clearUsers();

  const admin = await userRepository.create({
    email: "admin@test.com",
    password: "hashed",
    role: "admin",
  });

  const user = await userRepository.create({
    email: "user@test.com",
    password: "hashed",
    role: "user",
  });

  adminToken = jwt.sign(
    { id: admin._id.toString(), role: "admin" },
    JWT_SECRET
  );

  userToken = jwt.sign(
    { id: user._id.toString(), role: "user" },
    JWT_SECRET
  );

  const sweet = await sweetsRepository.create({
    name: "Ladoo",
    category: "Indian",
    price: 10,
    quantity: 5,
  });

  sweetId = sweet._id.toString();
});

describe("INVENTORY API", () => {
  it("should allow user to purchase a sweet", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
  });

  it("should prevent purchase if out of stock", async () => {
    await sweetsRepository.updateQuantity(sweetId, 0);

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
