import { container } from "tsyringe";
import { StripePaymentService } from "./implentations/StripePaymentPaymentProvider";
import { IPaymentServiceProvider } from "./IPaymentServiceProvider";

container.registerSingleton<IPaymentServiceProvider>(
  "PaymentServiceProvider",
  StripePaymentService
);
