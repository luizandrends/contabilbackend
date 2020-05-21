import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import AuthMiddleware from './app/middleware/auth';

const routes = Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(AuthMiddleware);

routes.get('/users', UserController.list);
routes.get('/users/:id', UserController.get);

export default routes;
