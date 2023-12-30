export const env = {
  port: process.env.APP_PORT ?? 8080,
  db: {
    mongo: {
      uri: process.env.MONGO_URI ?? 'mongodb://localhost:27017/knowledge-boost-api-test'
    }
  }
}
