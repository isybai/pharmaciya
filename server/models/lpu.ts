 import * as mongoose from 'mongoose';

const lpuSchema = new mongoose.Schema({
  name: String,
  address: String,
  tel: String,
  localArea: String,
  workTime: String,
  type: String,
  director: String,
  directorPhone: String,
  department: String,
});

const Lpu = mongoose.model('Lpu', lpuSchema);

export default Lpu;
