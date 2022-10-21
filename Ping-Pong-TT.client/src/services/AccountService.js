import { connect } from 'socket.io-client'
import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop.js'
import { api } from './AxiosService'
import { leaderboardService } from './LeaderboardService.js'

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

  async editAccount(accountData) {
    const newAccountData = {name: accountData.name, picture: accountData.picture}
    console.log(newAccountData)
    const account = await api.put('/account', newAccountData)
    const newAccount = new Account(account.data)
    console.log(newAccount)
    AppState.account = newAccount
    AppState.user = newAccount
  }
  
  async joinTeam(teamName, playerId) {
    const account = await api.put(`/account/${playerId}/team/${teamName}`)
    console.log(account)
    const newAccount = new Account(account.data)
    console.log(newAccount)
    AppState.account = newAccount
    AppState.user = newAccount
    await leaderboardService.getTeamPlayers()
  }
}

export const accountService = new AccountService()
