import { matchesService } from "../services/MatchesService.js";
import BaseController from "../utils/BaseController.js";

export class MatchesController extends BaseController {
  constructor() {
    super('/api/matches')
    this.router
      .get('/:id', this.getMatchById)
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
}