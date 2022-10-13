import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { AwardSchema } from '../models/Award.js';
import { MatchSchema } from '../models/Match.js';
import { TourneySchema } from '../models/Tourney.js';
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Tourneys = mongoose.model('Tourney', TourneySchema);
  
  
  Matches = mongoose.model('Match', MatchSchema);
  


  Awards = mongoose.model('Award', AwardSchema);
  
}

export const dbContext = new DbContext()
