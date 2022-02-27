import env from '../main/config/env'
import { MongoHelper } from '../infra/db/mongodb/helpers/mongodb-helper'

const { PORT, mongoUrl } = env

void MongoHelper.connect(mongoUrl).then(async () => {
  const app = (await import('./config/app')).default
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
}).catch(console.error)
