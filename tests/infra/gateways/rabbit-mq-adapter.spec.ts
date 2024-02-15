import amqplib from 'amqplib'
import { RabbitMQAdapter } from '@infra/gateways'

jest.mock('amqplib')

describe('RabbitMQAdapter', () => {
  let sut: RabbitMQAdapter

  beforeAll(() => {
    sut = new RabbitMQAdapter()
  })

  test('Publish a message to RabbitMQ', async () => {
    const mockedConnection = { createChannel: jest.fn() }
    const mockedChannel = { assertExchange: jest.fn(), publish: jest.fn() };
    (amqplib.connect as jest.Mock).mockResolvedValue(mockedConnection);
    (mockedConnection.createChannel).mockResolvedValue(mockedChannel)
    const message = { some: 'message' }
    const routingKey = 'routingKey'

    await sut.publish({ some: 'message' }, 'routingKey')

    expect(amqplib.connect).toHaveBeenCalledWith('amqp://localhost')
    expect(mockedConnection.createChannel).toHaveBeenCalled()
    expect(mockedChannel.assertExchange).toHaveBeenCalledWith('logExchange', 'direct', { durable: true })
    expect(mockedChannel.publish).toHaveBeenCalledWith('logExchange', routingKey, Buffer.from(JSON.stringify(message)))
  })
})
