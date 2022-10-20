import { Schema } from "mongoose";
import { SCHEMA_OPTIONS, ObjectId } from "../db/DbUtils.js";

export const MatchSchema = new Schema({
  tourneyId: { type: ObjectId, required: true, ref: 'Tourney' },
  homePlayerId: { type: ObjectId, ref: 'Account' },
  awayPlayerId: { type: ObjectId, ref: 'Account' },
  homeScore: { type: Number, default: 0 },
  awayScore: { type: Number, default: 0 },
  homeFouls: { type: Number, default: 0 },
  awayFouls: { type: Number, default: 0 },
  status: { type: String, enum: ['pending', 'active', 'complete'], default: 'pending' },
  set: { type: Number, default: 1 },
  matchNum: { type: Number, default: 1 },
  homePull: { type: Number },
  awayPull: { type: Number },
  winnerId: { type: ObjectId, ref: 'Account' },
  isABuy: { type: Boolean, default: false }
}, SCHEMA_OPTIONS)

MatchSchema.virtual('tourney', {
  localField: 'tourneyId',
  foreignField: '_id',
  justOne: true,
  ref: 'Tourney'
})

MatchSchema.virtual('homePlayer', {
  localField: 'homePlayerId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

MatchSchema.virtual('awayPlayer', {
  localField: 'awayPlayerId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
MatchSchema.virtual('winner', {
  localField: 'winnerId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
