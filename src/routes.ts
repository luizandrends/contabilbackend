import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = Router();

routes.post('/users', UserController.store);
routes.get('/users', UserController.list);
routes.get('/users/:id', UserController.get);

routes.post('/sessions', SessionController.store);

export default routes;
