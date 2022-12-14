import { AppState } from "../AppState.js"
import { Match } from "../models/Match.js"
import { Tourney } from "../models/Tourney.js"
import { api } from "./AxiosService.js"
import { router } from "../router.js"


class TourneyService {

  async createTourney(tourneyData) {
    const tourney = await api.post('/api/tourneys', tourneyData)
    const newTourney = new Tourney(tourney.data)
    AppState.tourneys.push(newTourney)
  }

  async getTourneys() {
    const res = await api.get('/api/tourneys')
    AppState.tourneys = res.data.map(t => new Tourney(t))
    console.log(AppState.tourneys)
    return
  }

  async getTourneyById(tourneyId) {
    const res = await api.get(`/api/tourneys/${tourneyId}`)
    AppState.activeTourney = new Tourney(res.data)
    return
  }

  async joinTourney(tourneyId) {
    const res = await api.put(`/api/tourneys/${tourneyId}/player`)
    console.log(res.data)
    await this.getTourneyById(tourneyId)
    await this.getMatchesByTourneyId(tourneyId)
    return
  }

  async leaveTourney(tourneyId) {
    const res = await api.delete(`/api/tourneys/${tourneyId}/player`)
    await this.getTourneyById(tourneyId)
    await this.getMatchesByTourneyId(tourneyId)
    return
  }

  async beginTourney(tourneyId, status) {
    const res = await api.put(`/api/tourneys/${tourneyId}/status`, {
      status: status
    })
    await this.getTourneyById(tourneyId)

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
        set = [...set, new Match(res.data[count])]
        count++
      } else {
        AppState.matches = [...AppState.matches, set]
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