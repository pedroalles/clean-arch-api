import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongodbRespository } from '../../infra/db/mongodb/account-repository/account'
import { SingUpController } from '../../presentation/controllers/singup/singup'
import { IController } from '../../presentation/protocols'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { LogControllerDecorator } from '../decorators/log'

export const makeSingUpController = (): IController => {
  const salt = 12

  const emailValidatorAdapter =
    new EmailValidatorAdapter()

  const bcryptAdapter =
    new BcryptAdapter(salt)

  const accountMongodbRespository =
    new AccountMongodbRespository()

  const dbAddAccount =
    new DbAddAccount(bcryptAdapter, accountMongodbRespository)

  const singUpController =
    new SingUpController(emailValidatorAdapter, dbAddAccount)

  return new LogControllerDecorator(singUpController)
}
