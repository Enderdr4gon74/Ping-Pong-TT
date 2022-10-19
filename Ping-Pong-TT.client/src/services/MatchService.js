import { AppState } from "../AppState.js";
import { Match } from "../models/Match.js";
import { api } from "./AxiosService.js";
import { tourneyService } from "./TourneyService.js";


class MatchService {

  async getMatchById(matchId) {
    const res = await api.get(`/api/matches/${matchId}`)
    AppState.activeMatch = new Match(res.data)
    console.log(AppState.activeMatch)
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

  async getTourneyBelongingToMatch(){
    const match = AppState.activeMatch
    console.log(match)
    const tourney = await api.get(`/api/tourneys/${match.tourneyId}`)
    console.log(tourney)
  }
}

export const matchService = new MatchService();