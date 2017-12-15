import * as mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  name: String,
  product: String,
  count: String,
  date: String,
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
