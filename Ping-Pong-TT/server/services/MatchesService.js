import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js"
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

  async createMatch(matchData) {
    const match = await dbContext.Matches.create(matchData)
    logger.log('log', match)
    return match
  }

  async deleteMatchesByTournamentId(tourneyId) {
    const tourney = await tourneyService.getTourneyById(tourneyId)
    const matches = await this.getMatchesByTourneyId(tourneyId)

    matches.forEach(async m => {
      await m.remove()
    })
  }
}

export const matchesService = new MatchesService()