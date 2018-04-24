import * as mongoose from 'mongoose';

const tenderSchema = new mongoose.Schema({
  docN: Number,
  name: String,
  lot: String,
  med: String,
  sum: String,
  result: String,
});

const Tender = mongoose.model('Tender', tenderSchema);

export default Tender;
