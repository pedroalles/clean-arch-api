import { DbAddAccount } from './db-add-account'

class EncryptStub {
  async encrypt (password: string): Promise<string> {
    return await new Promise(resolve => resolve('hashed_password'))
  }
}

describe('DbAddAccount UseCase', () => {
  it('should call Encrypter with correct password', async () => {
    const encrypterStub = new EncryptStub()
    const sut = new DbAddAccount(encrypterStub)
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }

    await sut.add(accountData)

    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
