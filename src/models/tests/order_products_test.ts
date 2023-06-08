import dotenv from "dotenv";
import { orderStore } from "../order";

dotenv.config();

const store = new orderStore();

describe("Order Model", () => {

  it("should have a CREATE method", () => {
    expect(store.createOrder).toBeDefined();
  });

  it("CREATE order product method should add an order with product quantity and product id", async () => {
    const { order_id, product_id, quantity } = await store.createOrderProduct({
      orderId: 2,
      productId: 3,
      quantity: 4,
    });

    expect({ order_id, product_id, quantity }).toEqual({
      order_id: "2",
      product_id: "3",
      quantity: "4",
    });
  });

});