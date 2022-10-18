import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  tourneys: [],

  activeTourney: null,

  matches: [],

  activeMatch: null,

  /** @type {import('./models/NewAccount.js').NewAccount[] | null} */
  allPlayers: null,
  maxAP: 30,
})
