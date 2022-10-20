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
      .put('', this.editAccount)
      .put('/:id/team/:name', this.setTeam)
  }

  async editAccount(req, res, next) {
    try {
      const account = await accountService.editAccount(req.userInfo.id, req.body)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  /* 
    Gets the user Account by their user id.
  */
  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  /* 
    sets a specific accounts team
  */
  async setTeam(req,res,next) {
    try {
      const account = await accountService.setTeam(req.params.name, req.params.id, req.userInfo.id)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }
  
  /* 
    gets the account by what the team they're on
  */
  async getAccountsByTeam(req, res, next) {
    try {
      const accounts = await accountService.getAccountsByTeam(req.params.name)
      res.send(accounts)
    } catch (error) {
      next(error)
    }
  }
  
  /* 
    gets multiple accounts with an amount set and possibly query parameters
  */
  async getAccounts(req, res, next) {
    try {
      const accounts = await accountService.getAccounts(req.query, req.params.amount)
      res.send(accounts)
    } catch (error) {
      next(error)
    }
  }
}
