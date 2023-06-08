import supertest from "supertest";
import dotenv from "dotenv";
import app from "../../server";

dotenv.config();
const { JWT_TEST_TOKEN } = process.env;
const token = JWT_TEST_TOKEN as string;

const request = supertest(app);

describe("Order Handler", () => {
  it("should return success for CREATE order with product quantity and product id", async () => {
    const response = await request
      .post("/orders/products")
      .auth(token, { type: "bearer" })
      .send({ order_id: 1, product_id: 1, quantity: 2 });

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });
});