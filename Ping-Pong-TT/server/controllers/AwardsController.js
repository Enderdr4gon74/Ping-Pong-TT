import { awardsService } from "../services/AwardsService.js";
import BaseController from "../utils/BaseController.js";

export class AwardsController extends BaseController {
  constructor() {
    super('/api/awards')
    this.router
      .get('/:id', this.getAwardsByAccountId)
      .post('/:id', this.createAward)
  }
    
  /* 
    gets all the awards for the account id provided
  */
  async getAwardsByAccountId(req, res, next) {
    try {
      const awards = await awardsService.getAwardsByAccountId(req.params.id)
      res.send(awards)
    } catch (error) {
      next(error)
    }
  }
  
  /* 
    creates an award for the player whose id is provided
  */
  async createAward(req, res, next) {
    try {
      const award = await awardsService.createAward(req.params.id, req.body)
      res.send(award)
    } catch (error) {
      next(error)
    }
  }
}