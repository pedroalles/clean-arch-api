import { IAuthentication, IAuthenticationModel } from '../../../domain/usecases/authentication'
import { LoadAccountByEmailRepository } from '../../protocols/load-account-by-email-repository'

export class DbAuthentication implements IAuthentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async auth (authentication: IAuthenticationModel): Promise<string> {
    await this.loadAccountByEmailRepository.load(authentication.email)
    return null
  }
}
