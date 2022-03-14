import { CompareFieldValidation, EmailValidation, RequiredFieldValidation, ValidationComposite } from '../../../presentation/helpers/validators'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'

export const makeSingUpValidation = (): ValidationComposite => {
  return new ValidationComposite([
    new RequiredFieldValidation('name'),
    new RequiredFieldValidation('email'),
    new RequiredFieldValidation('password'),
    new RequiredFieldValidation('passwordConfirmation'),

    new CompareFieldValidation('password', 'passwordConfirmation'),

    new EmailValidation('email', new EmailValidatorAdapter())
  ])
}
