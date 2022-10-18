import { AppState } from "../AppState.js"
import { NewAccount } from "../models/NewAccount.js"
import { api } from "./AxiosService.js"

class LeaderboardService {
  async getPlayers() {
    const players = await api.get(`/account/leaderboard/${AppState.maxAP}`)
    let newPlayers = [...players.data.map(p => new NewAccount(p))]
    newPlayers.sort((a,b) => b.wins - a.wins)
    console.log(newPlayers)
    AppState.allPlayers = newPlayers  // i be codin fr
    console.log(AppState.allPlayers)
  }
}

export const leaderboardService = new LeaderboardService()