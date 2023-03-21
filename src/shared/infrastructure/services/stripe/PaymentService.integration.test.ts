import { PaymentService } from "./PaymentService";

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

    const checkout = await paymentService.createCheckoutSession(items, "1");
    console.log(checkout);

    expect(checkout).toBeDefined();
  });
});
