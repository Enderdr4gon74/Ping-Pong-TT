import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { tourneyService } from "./TourneyService.js"

class PlayersService {

  /* 
    gets the tourney by the tourney id
    checks to see if the account is on the tourney
    removes the player specified by the index of the player
    saves the tourney edited
    generates the matches for the tournament based on the new players list
    restricts the data of the user
    returns the user
  */
  async removePlayerUsingTourneyId(tourneyId, user) {
    const tourney = await tourneyService.getTourneyById(tourneyId)
    if (!tourney.players.find(p => p.id == user.id)) {
      throw new BadRequest("You're not even on that tourney bro!")
    }
    tourney.players.splice(tourney.players.findIndex(p => p.id == user.id), 1)
    tourney.save()

    await tourneyService.generateMatches(tourneyId)

    user = { name: user.name, picture: user.picture, id: user.id }
    return user
  }

  /* 
    gets the tourney using the id
    checks if the player isn't already on the tourney
    restricts the data sent to the user's data
    saves the tourney
    generates the matches with the updated player list
    returns the new user
  */
  async addPlayerUsingTourneyId(tourneyId, user) {
    const tourney = await tourneyService.getTourneyById(tourneyId)

    // @ts-ignore
    if (tourney.players.length >= tourney.poolLimit) {
      throw new BadRequest("Tourney Is Full. Heck Off")
    }

    // if (tourney.creatorId == user.id) {
    //   throw new Forbidden("Thou Shalt not Join")
    // }

    if (tourney.status != "pending") {
      throw new BadRequest("YOu CaN NoT jOiN!")
    }

    if (tourney.players.find(p => p.id == user.id)) {
      throw new BadRequest("You're already on that tourney.")
    }
    user = { name: user.name, picture: user.picture, id: user.id }
    tourney.players = [...tourney.players, user]
    tourney.save()

    await tourneyService.generateMatches(tourneyId)

    return user
    // const tourney2 = await dbContext.Tourneys.findByIdAndUpdate(tourneyId, {$set: {
    //   playerIds: tourney1.playerIds + user
    // }})

  }
}

export const playersService = new PlayersService()