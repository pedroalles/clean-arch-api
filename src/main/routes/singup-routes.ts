import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeSingUpController } from '../factories/signup'

export default (router: Router): void => {
  router.post('/singup', adaptRoute(makeSingUpController()))
}
