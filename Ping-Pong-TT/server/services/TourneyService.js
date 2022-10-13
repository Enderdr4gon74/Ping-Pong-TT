import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden, Unexpected } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js"
import { matchesService } from "./MatchesService.js"

class TourneyService {
  async editTourney(tourneyData, tourneyId, userId) { // NOTE - 
    const tourney = await this.getTourneyById(tourneyId)
    if (tourney.creatorId != userId) {
      throw new Forbidden("You can't edit what isn't yours")
    }
    if (tourney.status == 'canceled') {
      throw new BadRequest("That tourney has already been canceled, can't edit it now...")
    }
    const newTourney = await dbContext.Tourneys.findByIdAndUpdate(tourneyId, {
      $set: {
        name: tourneyData.name,
        description: tourneyData.description,
        coverImg: tourneyData.coverImg,
      }
    }, { new: true }).populate('creator', 'name picture')
    logger.log('log', newTourney)
    return newTourney
  }
  async deleteTourney(tourneyId, userId) {
    const tourney = await this.getTourneyById(tourneyId)
    if (tourney.creatorId != userId) {
      throw new Forbidden("You can't delete what isn't yours")
    }
    if (tourney.status == "canceled") {
      throw new BadRequest("You already canceled this tourney...")
    }
    tourney.status = 'canceled'
    const newTourney = await dbContext.Tourneys.findByIdAndUpdate(tourneyId, tourney, { new: true }).populate('creator', 'name picture')
    return newTourney
  }
  async getAllTourneys(query) {
    const tourneys = await dbContext.Tourneys.find({
      ...query
    }).populate('creator', 'name picture')
    return tourneys
  }
  async getTourneyById(id) {
    const tourney = await dbContext.Tourneys.findById(id).populate('creator', 'name picture')
    if (!tourney) {
      throw new BadRequest("Invalid or Bad Tourney id")
    }
    return tourney
  }
  async createTourney(tourneyData) {
    const tourney = await dbContext.Tourneys.create(tourneyData)
    await tourney.populate('creator', 'name picture')
    logger.log('log', tourney)
    return tourney
  }


  async generateMatches(tourneyId) {
    await matchesService.deleteMatchesByTournamentId(tourneyId)
    const tourney = await this.getTourneyById(tourneyId)
    const players = tourney.players

    if (players.length < 1) {
      throw new Unexpected("Not enough players to generate bracket")
    }

    let set = 1
    let matchNum = 1
    let buyRound = false
    let matches = []
    let match

    // Fix Player Numbers if needed
    if (players.length % 2 != 0) {
      buyRound = true
    }
    
    let awayPlayer;
    // Generate Outer Matches
    for (let i = 0; i < players.length; i += 2) {

      if (i != players.length) {
        awayPlayer = players[i + 1]
      } else {
        awayPlayer = "buy"
      }

      match = {
        tourneyId: tourneyId, 
        homePlayer: players[i],
        awayPlayer: awayPlayer,
        set: set,
        matchNum: matchNum
      }

      match = await matchesService.createMatch(match)
      matches = [...matches, match]

      matchNum++
    }

    // Generate Inner Matches


  }


}

export const tourneyService = new TourneyService()