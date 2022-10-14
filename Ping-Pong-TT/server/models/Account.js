import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const AccountSchema = new Schema(
  {
    subs: [{ type: String, unique: true }],
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
    wins: {type: Number, default: 0 },
    losses: {type: Number, default: 0 },
    team: { type: String, enum: ['red', 'blue', 'none'], default: "none" }
    // NOTE If you wish to add additional properties do so here
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

/* 
id: string
name: string
username: string
email: string
picture: string
wins: number
losses: number
team: enum string - [red, blue]
awards: awardObject
*/