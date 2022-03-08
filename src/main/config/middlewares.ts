import { Express } from 'express'
import { bodyParser } from '../middlewares/body-parser'

export const loadMiddlewares = (app: Express): void => {
  app.use(bodyParser)
}
