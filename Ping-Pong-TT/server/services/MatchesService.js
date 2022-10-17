import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js"
import { tourneyService } from "./TourneyService.js"

class MatchesService {

  async getMatchesByTourneyId(tourneyId) {
    // await tourneyService.getTourneyById(tourneyId)
    const matches = await dbContext.Matches.find({ tourneyId }).populate('homePlayer awayPlayer winner')
    return matches
  }

  async getMatchById(matchId) {
    const match = await dbContext.Matches.findById(matchId).populate('homePlayer awayPlayer winner')
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
    // @ts-ignore
    return match
  }

  async deleteMatchesByTournamentId(tourneyId) {
    const tourney = await tourneyService.getTourneyById(tourneyId)
    const matches = await this.getMatchesByTourneyId(tourneyId)

    matches.forEach(async m => {
      await m.remove()
    })
  }

  async editPoints(matchId, side, points = 0) {
    const match = await this.getMatchById(matchId)

    if (side == 'home') {
      // @ts-ignore
      match.homeScore += parseInt(points);
    } else if (side == 'away') {
      // @ts-ignore
      match.awayScore += parseInt(points);
    }

    await match.save()
    return match
  }

  async declareWinner(matchId, team) {
    const match = await this.getMatchById(matchId)

    if (team == 'home') {
      match.winnerId = match.homePlayerId
    } else if (team == 'away') {
      match.winnerId = match.awayPlayerId
    }
    await tourneyService.updateMatches(match.set, match.matchNum, match, match.tourneyId)

    await match.save()
    return match
  }

  async

}

export const matchesService = new MatchesService()