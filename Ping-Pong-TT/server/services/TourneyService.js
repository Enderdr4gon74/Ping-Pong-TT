import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden, Unexpected } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js"
import { awardsService } from "./AwardsService.js"
import { matchesService } from "./MatchesService.js"

class TourneyService {

  /* 
  gets the tourney by its id
  populates the creator and the winner
  checks if the tourney id provided is valid
  returns the tourney
*/
  async getTourneyById(id) {
    const tourney = await dbContext.Tourneys.findById(id)
    // @ts-ignore
    await tourney.populate('creator winner', 'name picture')
    if (!tourney) {
      throw new BadRequest("Invalid or Bad Tourney id")
    }
    return tourney
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
  creates and saves into a variable the tourney using the data provided
  populates the creator on the tourney
  populates the winner on the tourney
  returns the tourney
*/
  async createTourney(tourneyData) {
    const tourneys = await this.getAllTourneys()

    if (tourneys.filter(t => t.name == tourneyData.name).length) {
      throw new BadRequest("This Name Is TakEn")
    }

    if (!tourneyData.coverImg) {
      tourneyData.coverImg = "https://thiscatdoesnotexist.com"
    } else if (tourneys.filter(t => t.coverImg == tourneyData.coverImg).length) {
      throw new BadRequest("tHIs ImGae IS tAkEn")
    }

    const tourney = await dbContext.Tourneys.create(tourneyData)
    await tourney.populate('creator', 'name picture')
    await tourney.populate('winner', 'name picture')
    return tourney
  }






  /* 
  finds the tourney bit its id
  checks if the user is the creator of the tourney
  checks if the tourney is already canceled
  finds the new tourney and sets the applicable fields as the new pieces
  populates the creator
  returns the new tourney
*/
  async editTourney(tourneyData, tourneyId, userId) { // NOTE - 
    // logger.log("editing Tourney")
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
    // logger.log('log', newTourney)
    return newTourney
  }



  async editStatus(status, tourneyId, userId) {
    const tourney = await this.getTourneyById(tourneyId)
    tourney.status = status.status;
    await tourney.save()
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
    let isABuy;
    // Generate Outer Matches
    for (let i = 0; i < players.length; i += 2) {
      isABuy = false;

      // Add a Buy if Needed
      if (i != players.length - 1) {
        awayPlayer = players[i + 1].id
      } else {
        awayPlayer = undefined;
        isABuy = true;
      }

      // Make the match Object
      match = {
        tourneyId: tourneyId,
        homePlayerId: players[i].id,
        awayPlayerId: awayPlayer,
        set: set,
        matchNum: matchNum,
        isABuy: isABuy
      }

      // Make the match a match and add it to the list
      match = await matchesService.createMatch(match)
      matches = [...matches, match]

      matchNum++
    }

    // Generate Inner Matches
    set++
    let prevSet = matches
    let awayPull
    let homePull
    while (prevSet.length != 1) {
      matchNum = 1

      for (let i = 0; i < prevSet.length; i += 2) {
        isABuy = false
        // If this is the last match and a buy is needed and theres no buy
        if (i + 1 >= prevSet.length && prevSet.length % 2 != 0 && isABuy == false) {
          awayPull = 0
          homePull = prevSet[i].matchNum
          i--
          isABuy = true
        }
        // If this match is the buy match
        else if (i == (set - 2) * 2) {
          if (prevSet.length % 2 != 0) {
            awayPull = 0
            homePull = prevSet[i].matchNum
            i--
            isABuy = true
          } else {
            awayPull = prevSet[i + 1].matchNum
            homePull = prevSet[i].matchNum
          }
        } else {
          awayPull = prevSet[i + 1].matchNum
          homePull = prevSet[i].matchNum
        }

        match = {
          tourneyId: tourneyId,
          set: set,
          matchNum: matchNum,
          homePull: homePull,
          awayPull: awayPull,
          isABuy: isABuy,
        }

        match = await matchesService.createMatch(match)
        matches = [...matches, match]

        matchNum++
      }

      set++
      prevSet = matches.filter(m => m.set == set - 1)
    }

    await this.autoUpdateBuys(matches)

    // logger.log("complete")
  }

  async autoUpdateBuys(matches) {
    const matchesToWin = matches.filter(m => m.isABuy && m.homePlayerId)

    // logger.log("Matches to Win: ", matchesToWin.length)

    for (let m in matchesToWin) {
      await matchesService.declareWinner(matchesToWin[m]._id, 'home')
    }

    return matchesToWin
  }

  async updateMatches(matchSet, matchNum, completeMatch, tourneyId, userId) {
    const tourney = await this.getTourneyById(tourneyId)
    const matches = await matchesService.getMatchesByTourneyId(tourneyId)
    const matchesToUpdate = matches.filter(m =>
      m.set == matchSet + 1 &&
      m.homePull == matchNum ||
      m.set == matchSet + 1 &&
      m.awayPull == matchNum
    )

    if (!matchesToUpdate.length && tourney.players.length >= 2) {
      await this.winTourney(tourneyId, completeMatch.winnerId, userId)
    }

    let buyWarning = false;
    matchesToUpdate.forEach(m => {
      if (m.homePull == matchNum) {
        m.homePlayerId = completeMatch.winnerId
      } else if (m.awayPull == matchNum) {
        m.awayPlayerId = completeMatch.winnerId
      }

      m.save()

      if (m.isABuy) {
        buyWarning = true;
      }
    })

    if (buyWarning) {
      await this.autoUpdateBuys(matches)
    }

    return
  }









  async winTourney(tourneyId, winnerId, userId) {
    const tourney = await this.getTourneyById(tourneyId)

    tourney.winnerId = winnerId
    tourney.status = 'complete'
    // await this.editStatus('complete', tourneyId, userId)
    await awardsService.createAward(winnerId, { name: tourney.name, img: tourney.coverImg })
    await tourney.save()
  }

}

export const tourneyService = new TourneyService()