import { AddAccount } from '../../domain/usecases/add-account'
import { BcryptAdapter } from '../../infra/cryptography/bcrypt-adapter'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { EmailValidator } from '../../presentation/protocols/email-validator'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { Controller } from '../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log-controller.decorator'

const makeAddAccount = (): AddAccount => {
  const salt = 12

  const encrypter = new BcryptAdapter(salt)
  const addAccountRepository = new AccountMongoRepository()
  return new DbAddAccount(encrypter, addAccountRepository)
}

const makeEmailValidatorAdapter = (): EmailValidator => {
  return new EmailValidatorAdapter()
}

export const makeSignUpController = (): Controller => {
  const addAccount = makeAddAccount()
  const emailValidatorAdapter = makeEmailValidatorAdapter()

  const signUpController = new SignUpController(addAccount, emailValidatorAdapter)

  return new LogControllerDecorator(signUpController)
}
