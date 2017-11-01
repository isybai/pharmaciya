import * as mongoose from 'mongoose';

const drugstoreSchema = new mongoose.Schema({
  name: String,
  address: String,
  tel: String,
  workTime: String,
  type: String,
  localArea: String
});

const Drugstore = mongoose.model('Drugstore', drugstoreSchema);

export default Drugstore;
