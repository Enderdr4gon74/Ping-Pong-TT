import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  /** @type {import('./models/Account.js').Account} */
  activeAccount: {},

  /** @type {import('./models/Award.js').Award | null} */
  ActiveAwards: null,

  tourneys: [],

  activeTourney: null,

  matches: [],

  aboutMessage: 0,

  activeMatch: null,

  /** @type {import('./models/NewAccount.js').NewAccount[] | null} */
  allPlayers: null,
  maxAP: 30,
  
  /** @type {import('./models/NewAccount.js').NewAccount[] | null} */
  redPlayers: null,

  /** @type {import('./models/NewAccount.js').NewAccount[] | null} */
  bluePlayers: null,
})
