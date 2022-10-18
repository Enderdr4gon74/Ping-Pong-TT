import { matchesService } from "../services/MatchesService.js";
import BaseController from "../utils/BaseController.js";
import { logger } from "../utils/Logger.js";

export class MatchesController extends BaseController {
  constructor() {
    super('/api/matches')
    this.router
      .get('/:id', this.getMatchById)
      .put('/:id/:team/:points/score', this.editPoints)
      .put('/:id/:team/winner', this.declareWinner)
  }
  
  /* 
    gets the match by the match id
  */
  async getMatchById(req, res, next) {
    try {
      const match = await matchesService.getMatchById(req.params.id)
      res.send(match)
    } catch (error) {
      next(error)
    }
  }

  async editPoints(req, res, next) {
    try {
      const match = await matchesService.editPoints(req.params.id, req.params.team, req.params.points)
      res.send(match)
    } catch (error) {
      next(error)
    }
  }

  async declareWinner(req, res, next) {
    try {
      const match = await matchesService.declareWinner(req.params.id, req.params.team)
      // logger.log('yay', match.winnerId)
      res.send(match)
    } catch (error) {
      next(error)
    }
  }
}