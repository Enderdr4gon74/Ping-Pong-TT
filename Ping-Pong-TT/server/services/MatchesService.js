import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js"
import { tourneyService } from "./TourneyService.js"

class MatchesService {
    
  /* 
    gets the match(es) by the parent tourney and populates the home player and the away player
    eventually - makes sure to restrict the data on the accounts
    returns the matches
  */
  async getMatchesByTourneyId(tourneyId) {
    // await tourneyService.getTourneyById(tourneyId)
    const matches = await dbContext.Matches.find({ tourneyId }).populate('homePlayer awayPlayer winner')
    return matches
  }
  
  /* 
    gets the match using the match id and populates the home player and the away player
    checks to see if the match id provided is valid
    returns the match
  */
  async getMatchById(matchId) {
    const match = await dbContext.Matches.findById(matchId).populate('homePlayer awayPlayer winner')
    if (!match) {
      throw new BadRequest("Invalid or Bad Match id")
    }
    return match
  }
  
  /* 
    not finished
  */
  async updateMatchesForTournament() {
    // TODO - implement update matches function
  }
  
  /* 
    creates the match on the data base using the data provided and saves it in a variable
    returns the match
  */
  async createMatch(matchData) {
    const match = await dbContext.Matches.create(matchData)
    // @ts-ignore
    return match
  }
  
  /* 
    checks to see if the tourney exists
    gets the matches on the existing tourney
    removes all of the matches from the tourney
  */
  async deleteMatchesByTournamentId(tourneyId) {
    await tourneyService.getTourneyById(tourneyId)
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
    await match.save()
    await tourneyService.updateMatches(match.set, match.matchNum, match, match.tourneyId)


    return match
  }

  async

}

export const matchesService = new MatchesService()