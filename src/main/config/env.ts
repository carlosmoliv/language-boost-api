export const env = {
  port: process.env.APP_PORT ?? 8080,
  db: {
    mongo: {
      uri: process.env.MONGO_URI ?? 'mongodb://localhost:27017/language-boost-api-dev'
    }
  },
  jwt: {
    secret: process.env.JWT_SECRET ?? 'b2a903772872b7169d196aa24346f2224197d9fc4365922aabbd2a2c806e0e3b'
  },
  rabbitMQ: {
    url: process.env.RABBITMQ_URL ?? 'amqp://localhost',
    exchangeName: process.env.RABBITMQ_URL_EXCHANGE ?? 'testExchange'
  }
}
