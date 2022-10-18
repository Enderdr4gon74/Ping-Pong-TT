export class Account {
  constructor(data) {
    this.id = data.id
    this.email = data.email
    this.name = data.name
    this.picture = data.picture
    this.wins = data.wins
    this.losses = data.losses
    this.team = data.team
    // TODO add additional properties if needed
  }
}
