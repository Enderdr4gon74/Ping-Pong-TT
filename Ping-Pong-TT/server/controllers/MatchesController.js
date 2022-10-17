import { matchesService } from "../services/MatchesService.js";
import BaseController from "../utils/BaseController.js";

export class MatchesController extends BaseController {
  constructor() {
    super('/api/matches')
    this.router
      .get('/:id', this.getMatchById)
  }

  async getMatchById(req, res, next) {
    try {
      const match = await matchesService.getMatchById(req.params.id)
      res.send(match)
    } catch (error) {
      next(error)
    }
  }
}