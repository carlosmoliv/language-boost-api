import './config/module-alias'
import { app } from '@main/config/app'
import { env } from '@main/config/env'
import { MongoConnection } from '@infra/db/mongo/helpers'

MongoConnection.getInstance().connect(env.db.mongo.uri)
  .then(async () => {
    app.listen(env.port, () => { console.log(`Server is running at http://localhost:${env.port}`) })
  })
  .catch(console.error)
