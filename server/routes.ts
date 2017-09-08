import * as express from 'express';

import CatCtrl from './controllers/cat';
import UserCtrl from './controllers/user';
import Cat from './models/cat';
import User from './models/user';

import Medic from './models/medic';
import MedicCtrl from './controllers/medic';

export default function setRoutes(app) {

  const router = express.Router();

  const catCtrl = new CatCtrl();
  const userCtrl = new UserCtrl();

  const medicCtrl = new UserCtrl();

  // Cats
  router.route('/cats').get(catCtrl.getAll);
  router.route('/cats/count').get(catCtrl.count);
  router.route('/cat').post(catCtrl.insert);
  router.route('/cat/:id').get(catCtrl.get);
  router.route('/cat/:id').put(catCtrl.update);
  router.route('/cat/:id').delete(catCtrl.delete);

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

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
