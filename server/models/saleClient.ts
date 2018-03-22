import * as mongoose from 'mongoose';

const saleClientSchema = new mongoose.Schema({
  name: String,
  adress: String,
  whos: String
});

const SaleClient = mongoose.model('SaleClient', saleClientSchema);

export default SaleClient;
