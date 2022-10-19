import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async getProfileById(profileId){
    const profile = await api.get(`api/profiles/${profileId}`)
    AppState.activeAccount = new Account(profile.data)
    console.log(new Account(profile.data))
    console.log(AppState.activeAccount)
  }
}

export const accountService = new AccountService()
