
import Order from '../models/order';
import BaseCtrl from './base';

export default class OrderCtrl extends BaseCtrl {
  model = Order;
  fileupload = (req, res) => {
    console.log(req.body);
    console.log(res);

    console.log(__dirname + '\Files');
  }
}
