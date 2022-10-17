import { Schema } from "mongoose";
import { SCHEMA_OPTIONS, ObjectId } from "../db/DbUtils.js";

export const TourneySchema = new Schema({

  creatorId: { type: ObjectId, required: true, ref: 'Account' },
  name: { type: String, minlength: 1, maxlength: 25, required: true },
  description: { type: String },
  coverImg: { type: String },
  startDate: { type: Date },
  type: { type: String, enum: ['single', 'double'], default: 'single' },
  poolLimit: { type: Number, minlength: 1, required: true },
  status: { type: String, enum: ['pending', 'active', 'complete', 'canceled'], default: 'pending' },
  players: { type: [Object], default: [] },
  winnerId: { type: ObjectId, ref: 'Account' }

}, SCHEMA_OPTIONS)

TourneySchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

TourneySchema.virtual('winner', {
  localField: 'winnerId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})