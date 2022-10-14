import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/leaderboard/:amount', this.getAccounts)
      .get('/:name', this.getAccountsByTeam)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getAccountsByTeam(req, res, next) {
    try {
      const accounts = await accountService.getAccountsByTeam(req.params.name)
      res.send(accounts)
    } catch (error) {
      next(error)
    }
  }

  async getAccounts(req, res, next) {
    try {
      const accounts = await accountService.getAccounts(req.query, req.params.amount)
      res.send(accounts)
    } catch (error) {
      next(error)
    }
  }
}
