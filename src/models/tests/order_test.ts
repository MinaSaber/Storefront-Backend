import dotenv from "dotenv";
import { orderStore } from "../order";

dotenv.config();

const store = new orderStore();

describe("Order Model", () => {
  it("should have an INDEX method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a SHOW method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a CREATE method", () => {
    expect(store.createOrder).toBeDefined();
  });

  it("CREATE method should add an order", async () => {
    const { user_id, status } = await store.createOrder({ 
      user_id: 3,
      status: "completed"
    });

    expect({ user_id, status }).toEqual({
        user_id: 3,
        status: "completed",
    });
  });

  it("INDEX method should return a list of all orders", async () => {
    const [{ user_id, status }] = await store.index();

    expect({ user_id, status }).toEqual({
        user_id: 3,
        status: "completed",
    });
  });

  it("SHOW method should return the orders of a user", async () => {
    const { user_id, status } = await store.show("3");

    expect({ user_id, status }).toEqual({
        user_id: 3,
        status: "completed",
    });
  });
});