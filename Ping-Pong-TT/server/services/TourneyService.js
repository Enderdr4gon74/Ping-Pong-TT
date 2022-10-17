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

    if (!players.length) {
      return
    }

    let set = 1
    let matchNum = 1
    let matches = []
    let match

    let awayPlayer;
    // Generate Outer Matches
    for (let i = 0; i < players.length; i += 2) {

      if (i != players.length - 1) {
        awayPlayer = players[i + 1].id
      } else {
        awayPlayer = undefined;
      }

      match = {
        tourneyId: tourneyId,
        homePlayerId: players[i].id,
        awayPlayerId: awayPlayer,
        set: set,
        matchNum: matchNum
      }

      match = await matchesService.createMatch(match)
      matches = [...matches, match]

      matchNum++
    }

    // Generate Inner Matches
    set++
    let prevSet = matches
    let awayPull
    while (prevSet.length != 1) {
      matchNum = 1

      for (let i = 0; i < prevSet.length; i += 2) {
        if (i + 1 == prevSet.length) {
          awayPull = 0
        } else {
          awayPull = prevSet[i + 1].matchNum
        }

        match = {
          tourneyId: tourneyId,
          set: set,
          matchNum: matchNum,
          homePull: prevSet[i].matchNum,
          awayPull: awayPull
        }

        match = await matchesService.createMatch(match)
        matches = [...matches, match]

        matchNum++
      }

      set++
      prevSet = matches.filter(m => m.set == set - 1)
    }


  }

  async updateMatches(matchSet, matchNum, completeMatch, tourneyId) {
    const tourney = await this.getTourneyById(tourneyId)
    const matches = await matchesService.getMatchesByTourneyId(tourneyId)
    const matchesToUpdate = matches.filter(m =>
      m.set == matchSet + 1 &&
      m.homePull == matchNum ||
      m.set == matchSet + 1 &&
      m.awayPull == matchNum
    )

    matchesToUpdate.forEach(m => {
      if (m.homePull == matchNum) {
        m.homePlayerId = completeMatch.winnerId
      } else if (m.awayPull == matchNum) {
        m.awayPlayerId = completeMatch.winnerId
      }

      m.save()
    })
  }

}

export const tourneyService = new TourneyService()