export class NewAccount {
  constructor(data) {
    this.name = data.name
    this.picture = data.picture
    this.wins = data.wins
    this.losses = data.losses
    this.team = data.team
    this.id = data.id
  } 
}

/* 
  name: { type: String, required: true },
  picture: { type: String },
  wins: {type: Number, default: 0 },
  losses: {type: Number, default: 0 },
  team: { type: String, enum: ['red', 'blue', 'none'], default: "none" }
*/