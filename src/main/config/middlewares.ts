import { Express } from 'express'
import { bodyParser } from '../middlewares/body-parser'
import { cors } from '../middlewares/cors'

export const loadMiddlewares = (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
}
