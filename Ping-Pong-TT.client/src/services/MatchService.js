import { AppState } from "../AppState.js";
import { Match } from "../models/Match.js";
import { api } from "./AxiosService.js";


class MatchService {

  async getMatchById(matchId) {
    const res = await api.get(`/api/matches/${matchId}`)
    AppState.activeMatch = new Match(res.data)
    return
  }
}

export const matchService = new MatchService();