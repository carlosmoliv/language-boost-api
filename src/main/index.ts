import 'module-alias/register'
import { env } from '@main/config/env'
import { app } from '@main/config/app'

app.listen(env.port, () => { console.log(`Server is running at http://localhost:${env.port}`) })
