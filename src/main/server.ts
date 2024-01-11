import 'module-alias/register'

import { app } from '@main/config/app'
import { env } from '@main/config/env'
import { MongoHelper } from '@infra/db/mongo/helpers'

MongoHelper.connect(env.db.mongo.uri).then(async () => {
  app.listen(env.port, () => { console.log(`Server is running at http://localhost:${env.port}`) }
  )
}).catch(console.error)
