 import * as mongoose from 'mongoose';

const handbookSchema = new mongoose.Schema({
  name: String,
  website: String,
  contactPz: String,
  contactEz: String,
  contactTz: String,
  contactPs: String,
  contactEs: String,
  contactTs: String,
});

const Handbook = mongoose.model('Handbook', handbookSchema);

export default Handbook;
