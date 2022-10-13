import { awardsService } from "../services/AwardsService.js";
import BaseController from "../utils/BaseController.js";

export class AwardsController extends BaseController {
  constructor() {
    super('/api/awards')
    this.router
      .get('/:id', this.getAwardsByAccountId)
      .post('/:id', this.createAward)
  }
  async getAwardsByAccountId(req, res, next) {
    try {
      const awards = await awardsService.getAwardsByAccountId(req.params.id)
      res.send(awards)
    } catch (error) {
      next(error)
    }
  }

  async createAward(req, res, next) {
    try {
      const award = await awardsService.createAward(req.params.id, req.body)
      res.send(award)
    } catch (error) {
      next(error)
    }
  }
}