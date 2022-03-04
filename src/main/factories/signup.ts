import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongodbRespository } from '../../infra/db/mongodb/account-repository/account'
import { LogMongodbRespository } from '../../infra/db/mongodb/log-repository/log'
import { SingUpController } from '../../presentation/controllers/singup/singup'
import { IController } from '../../presentation/protocols'
import { LogControllerDecorator } from '../decorators/log'
import { makeSingUpValidation } from './signup-validation'

export const makeSingUpController = (): IController => {
  const salt = 12

  const bcryptAdapter =
    new BcryptAdapter(salt)

  const accountMongodbRespository =
    new AccountMongodbRespository()

  const dbAddAccount =
    new DbAddAccount(bcryptAdapter, accountMongodbRespository)

  const singUpController =
    new SingUpController(dbAddAccount, makeSingUpValidation())

  const logMongodbRespository =
    new LogMongodbRespository()

  return new LogControllerDecorator(singUpController, logMongodbRespository)
}
