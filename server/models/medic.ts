 import * as mongoose from 'mongoose';

const medicSchema = new mongoose.Schema({
  name: String,
  spec: String,
  hos: String,
  type: String,
  local: String,
  workTime: String,
  tel: String
});

const Medic = mongoose.model('Medic', medicSchema);

export default Medic;


