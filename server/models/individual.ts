import * as mongoose from 'mongoose';

const individualSchema = new mongoose.Schema({
  name: String,
  dob: String,
  tel: String,
  history: String,
  calledBy: String
});

const individual = mongoose.model('individual', individualSchema);

export default individual;
