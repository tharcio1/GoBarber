import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// quando fizemos routes.use(authMiddleware) significa que estamos usando esse middleware globalmente
// e que ele só vai ser usado pelas requisições que estão abaixo dele, ou seja, as duas requisições post,
// acima não vão utilizar o authMiddleware.
routes.use(authMiddleware);

routes.put('/users', UserController.update);


routes.get('/providers', ProviderController.index);

routes.post('/appointments', AppointmentController.store);

routes.post('/files', upload.single('file'), FileController.store);//upload.single('file') file é o nome do campo que iremos preencher com o arquivo.

export default routes;
