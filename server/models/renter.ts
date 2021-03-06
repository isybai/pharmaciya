import * as mongoose from 'mongoose';

const renterSchema = new mongoose.Schema({
  name: String,
  dob: String,
  tel: String,
  type: String,
  liter: String,
  square: String,
  price: String,
  dateFrom: String,
  dateUntil: String,
  priceSum: String,
  deposite: String,
  tbo: String,
  electric: String,
  telNet: String,
  sumAll: String,
  factPay: String,
  datePay: String,
  typePay: String,
  status: String,
  note: String,
  docNumber: String,
  docSide: String,
  docSidePos: String,
  docSideTel: String,
  rentersProduct: String,
});

const Renter = mongoose.model('Renter', renterSchema);

export default Renter;
