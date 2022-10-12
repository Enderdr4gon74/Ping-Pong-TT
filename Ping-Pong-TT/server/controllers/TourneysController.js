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

  // 
  
  async removePlayerUsingTourneyId(req, res, next) {
    try {
      const player = await playersService.removePlayerUsingTourneyId(req.params.id, req.userInfo)
      res.send(player)
    } catch (error) {
      next(error)
    }
  }

  async addPlayerUsingTourneyId(req, res, next) {
    try {
      const player = await playersService.addPlayerUsingTourneyId(req.params.id, req.userInfo)
      res.send(player)
    } catch (error) {
      next(error)
    }
  }

  async getMatchesByTourneyId(req, res, next) {
    try {
      const matches = await matchesService.getMatchesByTourneyId(req.params.id)
      res.send(matches)
    } catch (error) {
      next(error)
    }
  }

  async getAllTourneys(req,res,next) {
    try {
      const tourneys = await tourneyService.getAllTourneys(req.query)
      res.send(tourneys)
    } catch (error) {
      next(error)
    }
  }

  async getTourneyById(req,res,next) {
    try {
      const tourney = await tourneyService.getTourneyById(req.params.id)
      res.send(tourney)
    } catch (error) {
      next(error)
    }
  }

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

  async editTourney(req, res, next) {
    try {
      const tourney = await tourneyService.editTourney(req.body, req.params.id, req.userInfo.id)
      res.send(tourney)
    } catch (error) {
      next(error)
    }
  }

  async deleteTourney(req, res, next) {
    try {
      const tourney = await tourneyService.deleteTourney(req.params.id, req.userInfo.id)
      res.send(tourney)
    } catch (error) {
      next(error)
    }
  }
}


