import amqp, { Channel, Connection } from 'amqplib'

import { MessageBroker } from '@application/contracts/gateways'
import { env } from '@main/config/env'

export class RabbitMQAdapter implements MessageBroker {
  private connection: Connection | null = null
  private channel: Channel | null = null

  private async initializeConnection (): Promise<void> {
    if (!this.connection || !this.channel) {
      this.connection = await amqp.connect(env.rabbitMQ.url)
      this.channel = await this.connection.createChannel()
    }
  }

  async publish <TMessage>(message: TMessage, routingKey: string): Promise<void> {
    await this.initializeConnection()
    const exchange = env.rabbitMQ.exchangeName
    const messageString = JSON.stringify(message)
    if (this.channel) {
      await this.channel.assertExchange(exchange, 'direct', { durable: true })
      this.channel.publish(exchange, routingKey, Buffer.from(messageString))
    }
  }
}
