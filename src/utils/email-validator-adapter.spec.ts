import { EmailValidatorAdapter } from './email-validator-adapter'

import validator from 'validator'
import { EmailValidator } from '../presentation/protocols/email-validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

const makeSut = (): EmailValidator => {
  return new EmailValidatorAdapter()
}

describe('EmailValidatorAdapter', () => {
  test('should return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email@mail.com')

    expect(isValid).toBe(false)
  })

  test('should return true if validator returns true', () => {
    const sut = makeSut()
    const isValid = sut.isValid('valid_email@mail.com')

    expect(isValid).toBe(true)
  })

  test('should calls validator with correct email', () => {
    const sut = makeSut()

    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    const correctEmail = 'any_email@mail.com'
    sut.isValid(correctEmail)

    expect(isEmailSpy).toHaveBeenCalledWith(correctEmail)
  })
})
