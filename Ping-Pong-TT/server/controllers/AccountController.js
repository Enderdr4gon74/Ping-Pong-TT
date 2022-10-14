import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .get('/leaderboard/:amount', this.getAccounts)
      .get('/:name', this.getAccountsByTeam)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .put('/:id/team/:name', this.setTeam)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async setTeam(req,res,next) {
    try {
      const account = await accountService.setTeam(req.params.name, req.params.id, req.userInfo.id)
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
