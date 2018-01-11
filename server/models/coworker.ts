import * as mongoose from 'mongoose';

const coworkerSchema = new mongoose.Schema({
  name: String,
  workPlace: String,
  tel: String,
  position: String,
  dob: String,
  subdivision: String,
  adress: String
});

const Coworker = mongoose.model('Coworker', coworkerSchema);

export default Coworker;
