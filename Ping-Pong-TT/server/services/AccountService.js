import { Logger } from 'sass'
import { dbContext } from '../db/DbContext'
import { NewAccount } from '../models/NewAccount.js'
import { BadRequest } from '../utils/Errors.js'
import { logger } from '../utils/Logger.js'

// Private Methods

/**
 * Creates account if one does not exist
 * @param {any} account
 * @param {any} user
 */
async function createAccountIfNeeded(account, user) {
  if (!account) {
    user._id = user.id
    account = await dbContext.Account.create({
      ...user,
      subs: [user.sub]
    })
  }
  return account
}

/**
 * Adds sub to account if not already on account
 * @param {any} account
 * @param {any} user
 */
async function mergeSubsIfNeeded(account, user) {
  if (!account.subs.includes(user.sub)) {
    // @ts-ignore
    account.subs.push(user.sub)
    await account.save()
  }
}
/**
 * Restricts changes to the body of the account object
 * @param {any} body
 */
function sanitizeBody(body) {
  const writable = {
    name: body.name,
    picture: body.picture
  }
  return writable
}

class AccountService {
  async editAccount(accountId, accountData) {
    const account = await dbContext.Account.findByIdAndUpdate(accountId, {
      $set: {
        name: accountData.name,
        picture: accountData.picture
      }
    }, {new: true})
    return account
  }
  
  /* 
    finds the account the team is gonna be added to
    checks to see if the account is valid
    checks to see if the account targeted is the same as the current user and that they own the account
    sets the team name as the team name provided
    saves the account back to the data base
    returns the data back
  */
  async setTeam(teamName, accountId, userId) {
    const account = await dbContext.Account.findById(accountId)
    logger.log(teamName)
    // if (teamName != 'red' || teamName != 'blue') {
    //   throw new BadRequest("not a valid team")
    // } 
    if (!account) {
      throw new BadRequest("invalid or bad account id")
    } if (accountId != userId) {
      throw new BadRequest("not yo account")
    }
    account.team = teamName
    account.save()
    return account
  }
  /**
   * Returns a user account from the Auth0 user object
   *
   * Creates user if none exists
   *
   * Adds sub of Auth0 account to account if not currently on account
   * @param {any} user
   */
  async getAccount(user) {
    let account = await dbContext.Account.findOne({
      _id: user.id
    })
    account = await createAccountIfNeeded(account, user)
    await mergeSubsIfNeeded(account, user)
    return account
  }
  
  /* 
    gets the list of accounts based on a filter of the team name and restricts the data sent
    sends the data back
  */
  async getAccountsByTeam(teamName) {
    let accounts = await (await dbContext.Account.find({team: teamName})).map(a => new NewAccount(a))
    logger.log(accounts)
    return accounts
  }
  
  /* 
    gets multiple accounts, possibly based on a query parameter and restricts the data sent
    culls the amount of accounts provided to the specified amount
  */
  async getAccounts(query, amount) {
    let accounts = await (await dbContext.Account.find({
      ...query
    })).map(a => new NewAccount(a))
    accounts.splice(amount, (accounts.length-amount))
    return accounts
    /* 
    const tourneys = await dbContext.Tourneys.find({
      ...query
    })
    */
    // let accounts = 
    // logger.log(accounts)
    // return accounts
  }

  /**
   * Updates account with the request body, will only allow changes to editable fields
   *  @param {any} user Auth0 user object
   *  @param {any} body Updates to apply to user object
   */
  async updateAccount(user, body) {
    const update = sanitizeBody(body)
    const account = await dbContext.Account.findOneAndUpdate(
      { _id: user.id },
      { $set: update },
      { runValidators: true, setDefaultsOnInsert: true, new: true }
    )
    return account
  }
}
export const accountService = new AccountService()
