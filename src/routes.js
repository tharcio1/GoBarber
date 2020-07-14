import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// quando fizemos routes.use(authMiddleware) significa que estamos usando esse middleware globalmente
// e que ele só vai ser usado pelas requisições que estão abaixo dele, ou seja, as duas requisições post,
// acima não vão utilizar o authMiddleware.
routes.use(authMiddleware);

routes.put('/users', UserController.update);

export default routes;
