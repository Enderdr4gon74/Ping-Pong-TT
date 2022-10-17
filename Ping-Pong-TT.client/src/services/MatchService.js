import { AppState } from "../AppState.js";
import { Match } from "../models/Match.js";
import { api } from "./AxiosService.js";


class MatchService {

  async getMatchById(matchId) {
    const res = await api.get(`/api/matches/${matchId}`)
    AppState.activeMatch = new Match(res.data)
    return
  }

  async changeScore(matchId, team, score) {
    const res = await api.put(`api/matches/${matchId}/${team}/${score}/score`)
    AppState.activeMatch = new Match(res.data)
    return
  }

  async declareWinner(matchId, team) {
    const res = await api.put(`api/matches/${matchId}/${team}/winner`)
    console.log(res.data)
    AppState.activeMatch = new Match(res.data)
    return
  }
}

export const matchService = new MatchService();