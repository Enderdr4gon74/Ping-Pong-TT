import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class AwardsService {
  
  /* 
    sets the account id in the body to what it should be
    creates the award in the database using the body provided and saves into a variable
    returns the award
  */
  async createAward(accountId, body) {
    body.accountId = accountId
    const award = await dbContext.Awards.create(body)
    return award
  }
  
  /* 
    gets the awards from the database that the account id of the awards match the account id provided
    checks to see if the award id is valid
    returns the awards found
  */
  async getAwardsByAccountId(accountId) {
    const awards = await dbContext.Awards.find({accountId})
    if (!awards) {
      throw new BadRequest('Invalid or bad Account Id! - (pepto bismol)')
    }
    return awards
  }

}

export const awardsService = new AwardsService()