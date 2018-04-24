import * as mongoose from 'mongoose';

const docSchema = new mongoose.Schema({
  name: String,
  url: String,
  type: String,
});

const Doc = mongoose.model('Doc', docSchema);

export default Doc;
