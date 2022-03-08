import { Express, Router } from 'express'

import fg from 'fast-glob'

export const registerRoutes = (app: Express): void => {
  const router: Router = Router()

  app.use('/api', router)

  fg.sync('**/src/main/routes/**routes.ts').map(async (file: string) =>
    (await import(`../../../${file}`)).default(router)
  )
}
