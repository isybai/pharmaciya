import * as mongoose from 'mongoose';

const rpoSchema = new mongoose.Schema({
  name: String,
  unit: String,
  price: String,
  madeBy: String,
  expireDate: String,
});

const rpo = mongoose.model('rpo', rpoSchema);

export default rpo;
