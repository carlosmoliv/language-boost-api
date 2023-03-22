import { StripePaymentService } from "./StripePayment";
import crypto from "node:crypto";
import { ICreateItemDTO } from "../../../../modules/orders/domain/dtos/ICreateItemDTO";
import { ItemCurrency } from "../../../../modules/orders/domain/enums/item.enums";

describe("Stripe Payment Service", () => {
  let paymentService: StripePaymentService;

  beforeAll(() => {
    paymentService = new StripePaymentService();
  });

  it("it should create a Stripe checkout session", async () => {
    const items = [
      {
        name: "Item 1",
        amount: 500,
        courseId: "12345678",
        currency: ItemCurrency.BRL,
      },
    ];

    const checkoutSessionParamaters = {
      items: items,
      orderId: crypto.randomUUID(),
    };

    const checkout = await paymentService.createCheckoutSession(
      checkoutSessionParamaters
    );

    expect(checkout).toBeDefined();
  });
});
