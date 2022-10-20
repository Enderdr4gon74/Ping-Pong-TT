

export class Tourney {

  constructor(data) {
    this.id = data._id;
    this.creatorId = data.creatorId;
    this.creator = data.creator;
    this.name = data.name;
    this.description = data.description;
    this.coverImg = data.coverImg;
    this.startDate = data.startDate;
    this.type = data.type;
    this.poolLimit = data.poolLimit;
    this.status = data.status;
    this.players = data.players;
    this.winnerId = data.winnerId;
    this.winner = data.winner;
  }
}