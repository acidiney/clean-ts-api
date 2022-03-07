import { Account } from '../models/account'

export interface AddAccountModel extends Omit<Account, 'id'> {}

export interface AddAccount {
  add: (account: AddAccountModel) => Promise<Account>
}
