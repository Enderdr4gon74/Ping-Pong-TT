import { AppState } from "../AppState.js"
import { Award } from "../models/Award.js"
import { api } from "./AxiosService.js"

class AwardsService {
  async getAwardsByPlayerId(playerId) {
    const awards = await api.get(`/api/awards/${playerId}`)
    AppState.ActiveAwards = awards.data.map(a => new Award(a))
  }

  async getAwardsByUserId() {
    const playerId = AppState.user.id
    const awards = await api.get(`/api/awards/${playerId}`)
    AppState.ActiveAwards = awards.data.map(a => new Award(a))
  }
}

export const awardsService = new AwardsService()