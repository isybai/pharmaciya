 import * as mongoose from 'mongoose';

const medicSchema = new mongoose.Schema({
  name: String,
  sur: String,
  spec: String,
  hos: String,
  type: String,
  local: String,
  workTimeFrom: String,
  workTimeTill: String,
  tel: Number
});

const Medic = mongoose.model('Medic', medicSchema);

export default Medic;


 