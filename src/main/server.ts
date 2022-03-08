import { config } from 'dotenv'
import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'

config()

async function main (): Promise<void> {
  const { default: env } = await import('./config/env')

  MongoHelper.connect(env.mongoUrl)
    .then(async () => {
      const { app } = await import('./config/app')
      app.listen(env.port, () => {
        console.log('Server running at http://localhost:5050')
      })
    })
    .catch(console.error)
}

main()
  .catch(p => p)
