import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const AccountSchema = new Schema(
  {
    subs: [{ type: String, unique: true }],
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String }
    /* 
    wins: {type: number, default: 0 }
    losses: {type: number, default: 0 }
    team: { type: string, enum: [red, blue], default: "red" }
    awards: { type: [awardObject] }
    */
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