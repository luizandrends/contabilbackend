import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import PasswordRecoveryController from './app/controllers/PasswordRecoveryController';
import PasswordResetController from './app/controllers/PasswordResetController';
import FileController from './app/controllers/FileController';

import AuthMiddleware from './app/middleware/auth';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.post('/password-recovery', PasswordRecoveryController.store);
routes.post('/password-reset', PasswordResetController.store);

routes.use(AuthMiddleware);

routes.get('/users/:id', UserController.get);
routes.get('/users', UserController.list);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
