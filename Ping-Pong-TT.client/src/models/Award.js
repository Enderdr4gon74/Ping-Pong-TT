export class Award {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.img = data.img
    this.accountId = data.accountId
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
    this._id = data._id
    this.__v = data.__v
  }
}