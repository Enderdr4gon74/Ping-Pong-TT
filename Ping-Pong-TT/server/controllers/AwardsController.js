import { awardsService } from "../services/AwardsService.js";
import BaseController from "../utils/BaseController.js";

export class AwardsController extends BaseController {
  constructor() {
    super('/api/awards')
    this.router
      .get('/:id', this.getAwardsByAccountId)
      .post('',)
  }
  async getAwardsByAccountId(req, res, next) {
    try {
      const awards = await awardsService.getAwardsByAccountId(req.params.id)
      res.send(awards)
    } catch (error) {
      next(error)
    }
  }
}