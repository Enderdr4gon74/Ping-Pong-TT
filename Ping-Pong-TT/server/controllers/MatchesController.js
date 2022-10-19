import { Auth0Provider } from "@bcwdev/auth0provider";
import { matchesService } from "../services/MatchesService.js";
import BaseController from "../utils/BaseController.js";
import { logger } from "../utils/Logger.js";

export class MatchesController extends BaseController {
  constructor() {
    super('/api/matches')
    this.router
      .get('/:id', this.getMatchById)
      .get('', this.getMatches)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .put('/:id/:team/:points/score', this.editPoints)
      .put('/:id/:team/winner', this.declareWinner)
  }

  async getMatches(req, res, next) {
    try {
      const matches = await matchesService.getMatches()
      res.send(matches)
    } catch (error) {
      next(error)
    }
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
      const userId = req.userInfo.id
      const match = await matchesService.editPoints(req.params.id, req.params.team, req.params.points, userId)
      res.send(match)
    } catch (error) {
      next(error)
    }
  }




  async declareWinner(req, res, next) {
    try {
      const match = await matchesService.declareWinner(req.params.id, req.params.team)
      // logger.log('congrats', match.winnerId)
      res.send(match)
    } catch (error) {
      next(error)
    }
  }
}