import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"
import { tourneyService } from "./TourneyService.js"

class MatchesService {
  async getMatchesByTourneyId(tourneyId) {
    await tourneyService.getTourneyById(tourneyId)
    const matches = await dbContext.Matches.find({tourneyId})
    return matches
  }

  async getMatchById(matchId) {
    const match = await dbContext.Matches.findById(matchId)
    if (!match) {
      throw new BadRequest("Invalid or Bad Match id")
    }
    return match
  }

  async updateMatchesForTournament() {
    // TODO - implement update matches function
  }
}

export const matchesService = new MatchesService()