import { Router } from 'express'
import { adaptRoute } from '../factories/express-route-adapter'
import { makeSingUpController } from '../factories/signup'

export default (router: Router): void => {
  router.post('/singup', adaptRoute(makeSingUpController()))
}
