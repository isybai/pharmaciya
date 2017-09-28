import * as mongoose from 'mongoose';

const individualSchema = new mongoose.Schema({
  name: String,
  sur: String,
  dob: String,
  tel: String
});

const individual = mongoose.model('individual', individualSchema);

export default individual;