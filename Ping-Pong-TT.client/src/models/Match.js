

export class Match {
  constructor(data) {
    this.id = data._id;
    this.homePlayerId = data.homePlayerId;
    this.awayPlayerId = data.awayPlayerId;
    this.homePlayer = data.homePlayer;
    this.awayPlayer = data.awayPlayer;
    this.homeScore = data.homeScore;
    this.awayScore = data.awayScore;
    this.status = data.status;
    this.set = data.set;
    this.matchNum = data.matchNum;
    this.homePull = data.homePull;
    this.awayPull = data.awayPull;
    this.winnerId = data.winnerId;
    this.winner = data.winner
  }
}