import { dbContext } from "../db/DbContext.js"

class AwardsService {
  async getAwardsByAccountId(accountId) {
    const awards = await dbContext.Awards.find({accountId})
    // finish here
  }

}

export const awardsService = new AwardsService()