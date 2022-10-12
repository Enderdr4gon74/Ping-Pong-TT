import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js"

class TourneyService {
  addPlayerUsingTourneyId(id, id1) {
    throw new Error("Method not implemented.")
  }
  async editTourney(tourneyData, tourneyId, userId) { // NOTE - 
    const tourney = await this.getTourneyById(tourneyId)
    if (tourney.creatorId != userId) {
      throw new Forbidden("You can't edit what isn't yours")
    }
    if (tourney.status == 'canceled') {
      throw new BadRequest("That tourney has already been canceled, can't edit it now...")
    }
    const newTourney = await dbContext.Tourneys.findByIdAndUpdate(tourneyId, {$set:{
      name: tourneyData.name,
      description: tourneyData.description,
      coverImg: tourneyData.coverImg,
    }}, {new: true}).populate('creator', 'name picture')
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
    const newTourney = await dbContext.Tourneys.findByIdAndUpdate(tourneyId, tourney, {new: true}).populate('creator', 'name picture')
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
}

export const tourneyService = new TourneyService()