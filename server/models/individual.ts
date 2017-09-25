import * as mongoose from 'mongoose';

const individualSchema = new mongoose.Schema({
  name: String,
  sur: String,
  dob: String,
  tel: Number
});

const individual = mongoose.model('individual', individualSchema);

export default individual;