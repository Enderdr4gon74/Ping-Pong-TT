import { Schema } from "mongoose";
import { SCHEMA_OPTIONS, ObjectId } from "../db/DbUtils.js";

export const MatchSchema = new Schema({
  tourneyId: { type: ObjectId, required: true, ref: 'Tourney' },
  homePlayer: { type: ObjectId },
  awayPlayer: { type: ObjectId },
  homeScore: { type: Number, default: 0 },
  awayScore: { type: Number, default: 0 },
  homeFouls: { type: Number, default: 0 },
  awayFouls: { type: Number, default: 0 },
  status: { type: String, enum: ['pending', 'active', 'complete'], default: 'pending' },
  set: { type: Number, default: 1 },
  matchNum: { type: Number, default: 1 },
  matchPull: { type: Number }
}, SCHEMA_OPTIONS)

MatchSchema.virtual('tourney', {
  localField: 'tourneyId',
  foreignField: '_id',
  justOne: true,
  ref: 'Tourney'
})
