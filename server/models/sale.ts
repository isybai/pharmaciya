import * as mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
  name: String,
  unit: String,
  price: String,
  contain: String,
  madeBy: String,
  expireDate: String,
});

const sale = mongoose.model('sale', saleSchema);

export default sale;
