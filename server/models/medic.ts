import * as mongoose from 'mongoose';

const medicSchema = new mongoose.Schema({
  name: String,
  sur: String,
  dob: String,
  tel: String,
  spec: String,
  hos: String,
  type: String,
  local: String
});

const Medic = mongoose.model('Medic', medicSchema);

export default Medic;