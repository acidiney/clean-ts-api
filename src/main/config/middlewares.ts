import { Express } from 'express'
import { bodyParser, contentType, cors } from '../middlewares'

export const registerMiddlewares = (app: Express): void => {
  app.use(cors)
  app.use(bodyParser)
  app.use(contentType)
}
