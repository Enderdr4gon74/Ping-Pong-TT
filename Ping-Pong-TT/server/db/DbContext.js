import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { TourneySchema } from '../models/Tourney.js';
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Tourneys = mongoose.model('Tourney', TourneySchema)
}

export const dbContext = new DbContext()
