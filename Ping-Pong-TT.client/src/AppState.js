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

  rules: [
    {
      title: 'GAMES ARE PLAYED TO 11 POINTS',
      body: 'A Game is played to 11 points. A Game must be won by two points. A Match is generally the best three of five Games.'
    },
    {
      title: 'ALTERNATE SERVES EVERY TWO POINTS',
      body: 'Each side of the table alternates serving two points at a time. EXCEPTION: After tied 10-10 (“deuce”), service alternates at every point. Can you lose on a serve in ping pong? Yes! There is no separate rule for serving on Game Point.'
    },
    {
      title: 'TOSS THE BALL STRAIGHT UP WHEN SERVING',
      body: 'How do you serve the ball in ping pong? Hold the ball in your open palm, behind your end of the table. Toss at least 6” straight up, and strike it on the way down. It must hit your side of the table and then the other side. NOTE: Once the ball leaves the server\'s hand it is in play, and so counts as the receiver\'s point if the ball is missed or mis-hit.'
    },
    {
      title: 'THE SERVE CAN LAND ANYWHERE IN SINGLES',
      body: 'There is no restriction on where the ball lands on your side or your opponent\'s side of the table. It can bounce two or more times on your opponent\'s side (if so, that\'s your point), bounce over the side, or even hit the edge.'
    },
    {
      title: 'DOUBLES SERVES MUST GO RIGHT COURT TO RIGHT COURT',
      body: 'The serve must bounce in the server\'s right court, and receiver\'s right court (NOTE: landing on center line is fair). Doubles partners switch places after their team serves twice.'
    },
    {
      title: 'A SERVE THAT TOUCHES THE NET ON THE WAY OVER IS A “LET”',
      body: 'Can the ball hit the net in ping pong? Yes, during a RALLY, if it touches the top of the net and then otherwise lands as a legitimate hit. BUT not when serving. If a served ball hits the net on the way over and otherwise legally bounces in play, it\'s a “let” serve and is done over. There is no limit on how many times this can happen.'
    },
    {
      title: 'ALTERNATE HITTING IN A DOUBLES RALLY',
      body: 'Doubles partners must alternate hitting balls in a rally, no matter where the ball lands on the table.'
    },
    {
      title: 'VOLLEYS ARE NOT ALLOWED ',
      body: 'Can you hit the ball before it bounces in ping pong? No. In regular tennis you may “volley” the ball (hitting the ball before it bounces on your side of the net). But in table tennis, this results in a point for your opponent. NOTE: When your opponent hits a ball that sails over your end of the table without touching it and then hits you or your paddle, that is still your point.'
    },
    {
      title: 'IF YOUR HIT BOUNCES BACK OVER THE NET BY ITSELF IT IS YOUR POINT',
      body: 'If you hit the ball in a rally or on a serve and it bounces back over the net after hitting your opponent\'s side of the table (due to extreme spin), without your opponent touching it, that is your point.'
    },
    {
      title: 'TOUCHING THE BALL WITH YOUR PADDLE HAND IS ALLOWED',
      body: 'What happens if the ball hits your finger or hand during a ping pong rally?  If the ball touches your PADDLE hand and otherwise results in a legal hit, there is no rule violation and play shall continue as normal. Your paddle hand includes all fingers and hand area below the wrist. But what if the ball touches a player\'s body anywhere else during a ping pong rally? You may not touch the ball with your non-paddle hand for any reason. It will result in a point for your opponent. BUT if  your opponent\'s hit sails over your side of the table without touching it, and hits any part of you or your paddle, that is still your point.'
    },
    {
      title: 'YOU MAY NOT TOUCH THE TABLE WITH YOUR NON-PADDLE HAND',
      body: 'You may touch the ball or the table with your paddle hand (after reaching in to return a short serve, for example), or other parts of your body. NOTE: If the table moves at all from your touching it during a rally, that is your opponent\'s point.'
    },
    {
      title: 'AN “EDGE” BALL BOUNCING OFF THE HORIZONTAL TABLE TOP SURFACE IS GOOD',
      body: 'An otherwise legal serve or hit may contact the top edge of the horizontal table top surface and be counted as valid, even if it bounces sidewise. The vertical sides of the table are NOT part of the legal playing surface.'
    },
    {
      title: 'HONOR SYSTEM APPLIES TO DISAGREEMENTS',
      body: 'If no referee is present during a match and the players disagree on a certain call, the “honor system” applies and the players should find a way to agree, or play the point over. Ping pong carries a tradition of fierce but fair play. Help us keep it that way!'
    },
  ],

  altRules: window.localStorage.getItem('altRules')
})