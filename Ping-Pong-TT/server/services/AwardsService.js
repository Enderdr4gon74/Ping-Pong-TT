import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class AwardsService {
  async createAward(accountId, body) {
    body.accountId = accountId
    const award = await dbContext.Awards.create(body)
    return award
  }

  async getAwardsByAccountId(accountId) {
    const awards = await dbContext.Awards.find({accountId})
    if (!awards) {
      throw new BadRequest('Invalid or bad Account Id! - (pepto bismol)')
    }
    return awards
  }

}

export const awardsService = new AwardsService()