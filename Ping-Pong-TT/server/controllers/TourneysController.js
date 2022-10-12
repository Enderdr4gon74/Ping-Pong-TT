import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { tourneyService } from "../services/TourneyService.js";
import { logger } from "../utils/Logger.js";

export class TourneysController extends BaseController {
  constructor() {
    super('api/tourneys')
    this.router
      .get('', this.getAllTourneys)
      .get('/:id', this.getTourneyById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTourney)
      .put('/:id', this.editTourney)
      .delete("/:id", this.deleteTourney)
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


