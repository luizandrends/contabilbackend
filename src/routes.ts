import { Router } from 'express';

import UserController from './app/controllers/UserController';

const routes = Router();

routes.post('/users', UserController.store);
routes.get('/users', UserController.list);
routes.get('/users/:id', UserController.get);

export default routes;
