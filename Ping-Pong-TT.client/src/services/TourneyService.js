import { AppState } from "../AppState.js"
import { Match } from "../models/Match.js"
import { Tourney } from "../models/Tourney.js"
import { api } from "./AxiosService.js"


class TourneyService {

  async getTourneys() {
    const res = await api.get('/api/tourneys')
    AppState.tourneys = res.data.map(t => new Tourney(t))
    return
  }

  async getTourneyById(tourneyId) {
    const res = await api.get(`/api/tourneys/${tourneyId}`)
    AppState.activeTourney = new Tourney(res.data)
    return
  }

  async getMatchesByTourneyId(tourneyId) {
    AppState.matches = []
    const res = await api.get(`/api/tourneys/${tourneyId}/matches`)

    let count = 0;
    let set = [];
    let setNum = 1
    // console.log(res.data.length)
    while (count < res.data.length) {
      if (res.data[count].set == setNum) {
        console.log(count)
        set = [...set, new Match(res.data[count])]
        count++
      } else {
        AppState.matches = [...AppState.matches, set]
        console.log(set)
        set = []
        setNum++
      }

    }

    AppState.matches = AppState.matches = [...AppState.matches, set]

    // console.log(AppState.matches)
    // AppState.matches = res.data.map(m => new Match(m))
    return
  }

}

export const tourneyService = new TourneyService()