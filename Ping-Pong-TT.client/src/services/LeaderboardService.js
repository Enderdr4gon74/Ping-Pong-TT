import { AppState } from "../AppState.js"
import { NewAccount } from "../models/NewAccount.js"
import { api } from "./AxiosService.js"

async function getRedPlayers() {
  const players = await api.get(`/account/red`)
  let newPlayers = [...players.data.map(p => new NewAccount(p))]
  newPlayers.sort((a,b) => b.wins - a.wins)
  console.log(newPlayers)
  AppState.redPlayers = newPlayers  // i be codin fr
  console.log(AppState.redPlayers)
}

async function getBluePlayers() {
  const players = await api.get(`/account/blue`)
  let newPlayers = [...players.data.map(p => new NewAccount(p))]
  newPlayers.sort((a,b) => b.wins - a.wins)
  console.log(newPlayers)
  AppState.bluePlayers = newPlayers  // i be codin fr
  console.log(AppState.bluePlayers)
}

class LeaderboardService {
  async getPlayers() {
    const players = await api.get(`/account/leaderboard/${AppState.maxAP}`)
    let newPlayers = [...players.data.map(p => new NewAccount(p))]
    newPlayers.sort((a,b) => b.wins - a.wins)
    console.log(newPlayers)
    AppState.allPlayers = newPlayers  // i be codin fr
    console.log(AppState.allPlayers)
  }

  async getTeamPlayers() {
    await getBluePlayers()
    await getRedPlayers()
  }
  
}

export const leaderboardService = new LeaderboardService()