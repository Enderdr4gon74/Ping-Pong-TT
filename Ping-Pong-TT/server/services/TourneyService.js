import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden, Unexpected } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js"
import { matchesService } from "./MatchesService.js"

class TourneyService {

  /* 
    finds the tourney bit its id
    checks if the user is the creator of the tourney
    checks if the tourney is already canceled
    finds the new tourney and sets the applicable fields as the new pieces
    populates the creator
    returns the new tourney
  */
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

  /* 
    gets the tourney
    checks to see if the user is the creator
    checks to see if the tourney is canceled already
    sets the status as canceled
    updates the tourney and puts it in the variable
    returns the updated tourney
  */
  async deleteTourney(tourneyId, userId) {
    const tourney = await this.getTourneyById(tourneyId)
    if (tourney.creatorId != userId) {
      throw new Forbidden("You can't delete what isn't yours")
    }
    if (tourney.status == "canceled") {
      throw new BadRequest("You already canceled this tourney...")
    }
    tourney.status = 'canceled'
    const newTourney = await dbContext.Tourneys.findByIdAndUpdate(tourneyId, tourney, { new: true }).populate('creator winner', 'name picture')
    return newTourney
  }

  /* 
    gets the tourneys based on the possibly query params and populates the creator and winner
    returns the tourneys
  */
  async getAllTourneys(query) {
    const tourneys = await dbContext.Tourneys.find({
      ...query
    }).populate('creator', 'name picture').populate('winner', 'name picture')
    return tourneys
  }

  /* 
    gets the tourney by its id
    populates the creator and the winner
    checks if the tourney id provided is valid
    returns the tourney
  */
  async getTourneyById(id) {
    const tourney = await dbContext.Tourneys.findById(id)
    // @ts-ignore
    await tourney.populate('creator', 'name picture').populate('winner', 'name picture')
    if (!tourney) {
      throw new BadRequest("Invalid or Bad Tourney id")
    }
    return tourney
  }

  /* 
    creates and saves into a variable the tourney using the data provided
    populates the creator on the tourney
    populates the winner on the tourney
    returns the tourney
  */
  async createTourney(tourneyData) {
    const tourney = await dbContext.Tourneys.create(tourneyData)
    await tourney.populate('creator', 'name picture')
    await tourney.populate('winner', 'name picture')
    logger.log('log', tourney)
    return tourney
  }

  /* 
    deletes the current matches that exist
    gets the tourney by its id
    makes the players its own variable
    checks if there are any players at that moment
    creates the set, matchNum, matches, match, and the awayPlayer
    starts the for loop that iterates over the players
      if the index is not 1 less than the amount of players
      else it 
  */
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

    if (!matchesToUpdate.length) {
      await this.winTourney(tourneyId, completeMatch.winnerId)
    }

    matchesToUpdate.forEach(m => {
      if (m.homePull == matchNum) {
        m.homePlayerId = completeMatch.winnerId
      } else if (m.awayPull == matchNum) {
        m.awayPlayerId = completeMatch.winnerId
      }

      m.save()
    })

    return
  }

  async winTourney(tourneyId, winnerId) {
    const tourney = await this.getTourneyById(tourneyId)

    tourney.winnerId = winnerId

    await tourney.save()
  }

}

export const tourneyService = new TourneyService()