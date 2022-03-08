import express from 'express'
import { loadMiddlewares } from './middlewares'

const app = express()

loadMiddlewares(app)

export { app }
