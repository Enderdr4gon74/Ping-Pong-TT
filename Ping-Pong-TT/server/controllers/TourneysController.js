import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { tourneyService } from "../services/TourneyService.js";
import { logger } from "../utils/Logger.js";
import { matchesService } from "../services/MatchesService.js";
import { playersService } from "../services/PlayersService.js";

export class TourneysController extends BaseController {
  constructor() {
    super('api/tourneys')
    this.router
      .get('', this.getAllTourneys)
      .get('/:id', this.getTourneyById)
      .get('/:id/matches', this.getMatchesByTourneyId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTourney)
      .put('/:id', this.editTourney)
      .put('/:id/player', this.addPlayerUsingTourneyId)
      .delete("/:id", this.deleteTourney)
      .delete('/:id/player', this.removePlayerUsingTourneyId)
  }

  
  /* 
    remove players from a tourney using the tourney id and the user's id
  */
  async removePlayerUsingTourneyId(req, res, next) {
    try {
      const player = await playersService.removePlayerUsingTourneyId(req.params.id, req.userInfo)
      res.send(player)
    } catch (error) {
      next(error)
    }
  }
  
  /* 
    adds a player to a tourney using the tourney's id and their players id
  */
  async addPlayerUsingTourneyId(req, res, next) {
    try {
      const player = await playersService.addPlayerUsingTourneyId(req.params.id, req.userInfo)
      res.send(player)
    } catch (error) {
      next(error)
    }
  }
  
  /* 
    gets the matches by their parent tournament's id    
  */
  async getMatchesByTourneyId(req, res, next) {
    try {
      const matches = await matchesService.getMatchesByTourneyId(req.params.id)
      res.send(matches)
    } catch (error) {
      next(error)
    }
  }
  
  /* 
    gets all of the tourneys with possible query parameters
  */
  async getAllTourneys(req, res, next) {
    try {
      const tourneys = await tourneyService.getAllTourneys(req.query)
      res.send(tourneys)
    } catch (error) {
      next(error)
    }
  }
  
  /* 
    gets a single tourney be its id
  */
  async getTourneyById(req, res, next) {
    try {
      const tourney = await tourneyService.getTourneyById(req.params.id)
      res.send(tourney)
    } catch (error) {
      next(error)
    }
  }
  
  /* 
    creates a tourney using the data provided with some left out.
  */
  async createTourney(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const tourneyData = req.body
      const tourney = await tourneyService.createTourney(tourneyData)
      logger.log(tourney)
      res.send(tourney)
    } catch (error) {
      next(error)
    }
  }
  
  /* 
    allows you to edit data on the tourneys
  */
  async editTourney(req, res, next) {
    try {
      const tourney = await tourneyService.editTourney(req.body, req.params.id, req.userInfo.id)
      res.send(tourney)
    } catch (error) {
      next(error)
    }
  }
  
  /* 
    deletes a tourney using the id of the tourney
  */
  async deleteTourney(req, res, next) {
    try {
      const tourney = await tourneyService.deleteTourney(req.params.id, req.userInfo.id)
      res.send(tourney)
    } catch (error) {
      next(error)
    }
  }
}


