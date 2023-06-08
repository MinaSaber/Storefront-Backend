import supertest from "supertest";
import dotenv from "dotenv";
import app from "../../server";

dotenv.config();
const { JWT_TEST_TOKEN } = process.env;
const token = JWT_TEST_TOKEN as string;

const request = supertest(app);

describe("Order Handler", () => {
  it("should return success for CREATE order", async () => {
    const response = await request
      .post("/orders")
      .auth(token, { type: "bearer" })
      .send({ user_id:1 , status: "completed" });

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it("should return success for READ all orders", async () => {
    const response = await request.get("/orders");

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it("should return success for READ orders by user id", async () => {
    const response = await request.get("/orders").send("user_id=1");

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });
});