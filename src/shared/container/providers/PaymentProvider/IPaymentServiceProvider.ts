import { ICheckoutSession } from "./dtos/ICheckoutSessionDTO";

export interface IPaymentServiceProvider {
  createCheckoutSession(data: ICheckoutSession): Promise<String>;
}
