import { IEmailValidator } from '../presentation/protocols'
import validator from 'validator'

export class EmailValidatorAdapter implements IEmailValidator {
  isValid (email: string): Boolean {
    return validator.isEmail(email)
  }
}
