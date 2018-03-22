import * as express from 'express';

import UserCtrl from './controllers/user';
import MedicCtrl from './controllers/medic';
import IndividualCtrl from './controllers/individual';
import RenterCtrl from './controllers/renter';
import LpuCtrl from './controllers/lpu';
import DrugstoreCtrl from './controllers/drugstore';
import TaskCtrl from './controllers/task';
import CoworkerCtrl from './controllers/coworker';
import HandbookCtrl from './controllers/handbook';
import OrderCtrl from './controllers/order';
import SaleClientCtrl from './controllers/saleClient';


export default function setRoutes(app) {

  const router = express.Router();

  const userCtrl = new UserCtrl();

  const medicCtrl = new MedicCtrl();
  const individualCtrl = new IndividualCtrl();
  const renterCtrl = new RenterCtrl();
  const lpuCtrl = new LpuCtrl();
  const drugstoreCtrl = new DrugstoreCtrl();
  const taskCtrl = new TaskCtrl();
  const coworkerCtrl = new CoworkerCtrl();
  const handbookCtrl = new HandbookCtrl();
  const orderCtrl = new OrderCtrl();
  const saleClientCtrl = new SaleClientCtrl();

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  // Medics
  router.route('/medics').get(medicCtrl.getAll);
  router.route('/medics/count').get(medicCtrl.count);
  router.route('/medic').post(medicCtrl.insert);
  router.route('/medic/:id').get(medicCtrl.get);
  router.route('/medic/:id').put(medicCtrl.update);
  router.route('/medic/:id').delete(medicCtrl.delete);

  // individuals
  router.route('/individuals').get(individualCtrl.getAll);
  router.route('/individuals/count').get(individualCtrl.count);
  router.route('/individual').post(individualCtrl.insert);
  router.route('/individual/:id').get(individualCtrl.get);
  router.route('/individual/:id').put(individualCtrl.update);
  router.route('/individual/:id').delete(individualCtrl.delete);

  // renters
  router.route('/renters').get(renterCtrl.getAll);
  router.route('/renters/count').get(renterCtrl.count);
  router.route('/renter').post(renterCtrl.insert);
  router.route('/renter/:id').get(renterCtrl.get);
  router.route('/renter/:id').put(renterCtrl.update);
  router.route('/renter/:id').delete(renterCtrl.delete);

  // lpus
  router.route('/lpus').get(lpuCtrl.getAll);
  router.route('/lpus/count').get(lpuCtrl.count);
  router.route('/lpu').post(lpuCtrl.insert);
  router.route('/lpu/:id').get(lpuCtrl.get);
  router.route('/lpu/:id').put(lpuCtrl.update);
  router.route('/lpu/:id').delete(lpuCtrl.delete);

  // drugstore
  router.route('/drugstores').get(drugstoreCtrl.getAll);
  router.route('/drugstores/count').get(drugstoreCtrl.count);
  router.route('/drugstore').post(drugstoreCtrl.insert);
  router.route('/drugstore/:id').get(drugstoreCtrl.get);
  router.route('/drugstore/:id').put(drugstoreCtrl.update);
  router.route('/drugstore/:id').delete(drugstoreCtrl.delete);

  // task
  router.route('/tasks').get(taskCtrl.getAll);
  router.route('/tasks/count').get(taskCtrl.count);
  router.route('/task').post(taskCtrl.insert);
  router.route('/task/:id').get(taskCtrl.get);
  router.route('/task/:id').put(taskCtrl.update);
  router.route('/task/:id').delete(taskCtrl.delete);

  // coworker
  router.route('/coworkers').get(coworkerCtrl.getAll);
  router.route('/coworkers/count').get(coworkerCtrl.count);
  router.route('/coworker').post(coworkerCtrl.insert);
  router.route('/coworker/:id').get(coworkerCtrl.get);
  router.route('/coworker/:id').put(coworkerCtrl.update);
  router.route('/coworker/:id').delete(coworkerCtrl.delete);


  // Handbook
  router.route('/handbooks').get(handbookCtrl.getAll);
  router.route('/handbooks/count').get(handbookCtrl.count);
  router.route('/handbook').post(handbookCtrl.insert);
  router.route('/handbook/:id').get(handbookCtrl.get);
  router.route('/handbook/:id').put(handbookCtrl.update);
  router.route('/handbook/:id').delete(handbookCtrl.delete);

  // Orders
  router.route('/orders').get(orderCtrl.getAll);
  router.route('/orders/count').get(orderCtrl.count);
  router.route('/order').post(orderCtrl.insert);
  router.route('/order/:id').get(orderCtrl.get);
  router.route('/order/:id').put(orderCtrl.update);
  router.route('/order/:id').delete(orderCtrl.delete);

  // SaleClient
  router.route('/saleClients').get(saleClientCtrl.getAll);
  router.route('/saleClients/count').get(saleClientCtrl.count);
  router.route('/saleClient').post(saleClientCtrl.insert);
  router.route('/saleClient/:id').get(saleClientCtrl.get);
  router.route('/saleClient/:id').put(saleClientCtrl.update);
  router.route('/saleClient/:id').delete(saleClientCtrl.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
