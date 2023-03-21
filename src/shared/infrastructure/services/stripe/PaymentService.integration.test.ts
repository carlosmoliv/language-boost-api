import { PaymentService } from "./PaymentService";
import crypto from "node:crypto";

describe("Stripe Payment Service", () => {
  let paymentService: PaymentService;

  beforeAll(() => {
    paymentService = new PaymentService();
  });

  it("it should create a Stripe checkout session", async () => {
    const items = [
      {
        name: "Item 1",
        amount: 500,
      },
    ];

    const checkoutSessionParamaters = {
      items: items,
      orderId: crypto.randomUUID(),
    };

    const checkout = await paymentService.createCheckoutSession(
      checkoutSessionParamaters
    );

    console.log(checkout);

    expect(checkout).toBeDefined();
  });
});
