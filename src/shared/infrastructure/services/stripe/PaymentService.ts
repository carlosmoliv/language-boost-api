import Stripe from "stripe";
import { Item } from "../../../../modules/orders/infrastructure/mongo/models/Item";
import { AppError } from "../../../errors/AppError";
import { logger } from "../../adapters/logger.utils";

interface ICheckoutItem {
  name: string;
  amount: number;
}

export class PaymentService {
  private stripe: Stripe;

  constructor() {
    if (!process.env.STRIPE_SECRET_KEY)
      throw new AppError(
        "StripeSecretKeyError",
        "Stripe secret key not provided"
      );

    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2022-11-15",
    });
  }

  async createCheckoutSession(items: ICheckoutItem[], orderId: string) {
    const lineItems = items.map((item: ICheckoutItem) => {
      return {
        price_data: {
          currency: "USD",
          unit_amount: Math.floor(item.amount * 100),
          product_data: {
            name: item.name,
          },
        },
        quantity: 1,
      };
    });

    try {
      const checkout = this.stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${process.env.NODE_URL}:${process.env.PORT}/services/stripe/webhook/checkout/success?id=${orderId}`,
        cancel_url: `${process.env.NODE_URL}:${process.env.PORT}/services/stripe/webhook/checkout/canceled?id=${orderId}`,
      });

      return checkout;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}
