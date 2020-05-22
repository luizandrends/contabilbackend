import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import PasswordRecoveryController from './app/controllers/PasswordRecoveryController';

import AuthMiddleware from './app/middleware/auth';

const routes = Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.post('/password-recovery', PasswordRecoveryController.store);

routes.use(AuthMiddleware);

routes.get('/users/:id', UserController.get);
routes.get('/users', UserController.list);

export default routes;
