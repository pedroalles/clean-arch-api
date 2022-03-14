import { CompareFieldValidation, EmailValidation, RequiredFieldValidation, ValidationComposite } from '../../../presentation/helpers/validators'
import { IEmailValidator } from '../../../presentation/protocols'
import { makeSingUpValidation } from './signup-validation'

jest.mock('../../../presentation/helpers/validators/validation-composite')

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('SingUpValidation Factory', () => {
  it('should call ValidationComposite with all validations', () => {
    makeSingUpValidation()
    expect(ValidationComposite).toHaveBeenCalledWith([
      new RequiredFieldValidation('name'),
      new RequiredFieldValidation('email'),
      new RequiredFieldValidation('password'),
      new RequiredFieldValidation('passwordConfirmation'),

      new CompareFieldValidation('password', 'passwordConfirmation'),

      new EmailValidation('email', makeEmailValidator())
    ])
  })
})
