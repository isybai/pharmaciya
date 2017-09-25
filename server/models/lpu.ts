 import * as mongoose from 'mongoose';

const lpuSchema = new mongoose.Schema({
  name: String,
  address: String,
  tel: Number,
  type: String,
});

const Lpu = mongoose.model('Lpu', lpuSchema);

export default Lpu; 