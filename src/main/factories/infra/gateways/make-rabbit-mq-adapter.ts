import { RabbitMQAdapter } from '@infra/gateways'

export const makeRabbitMQAdapter = (): RabbitMQAdapter => new RabbitMQAdapter()
