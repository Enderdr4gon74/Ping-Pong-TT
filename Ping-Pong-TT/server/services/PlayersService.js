import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"
import { tourneyService } from "./TourneyService.js"

class PlayersService {
  async removePlayerUsingTourneyId(tourneyId, user) {
    const tourney = await tourneyService.getTourneyById(tourneyId)
    if (!tourney.players.find(p=> p.id == user.id)) {
      throw new BadRequest("You're not even on that tourney bro! - (pepto bismol)")
    }
    tourney.players.splice(tourney.players.findIndex(p=> p.id == user.id), 1)
    tourney.save()
    user = {name: user.name, picture: user.picture, id: user.id}
    return user
  }

  async addPlayerUsingTourneyId(tourneyId, user) {
    const tourney = await tourneyService.getTourneyById(tourneyId)
    if (tourney.players.find(p => p.id == user.id)) {
      throw new BadRequest("You're already on that tourney bro! - (pepto bismol)")
    }
    user = {name: user.name, picture: user.picture, id: user.id}
    tourney.players = [...tourney.players, user]
    tourney.save()
    return user
    // const tourney2 = await dbContext.Tourneys.findByIdAndUpdate(tourneyId, {$set: {
    //   playerIds: tourney1.playerIds + user
    // }})

  }
}

export const playersService = new PlayersService()