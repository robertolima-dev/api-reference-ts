import { Router } from 'express';
import authRouter from '../modules/users/routes/auth.routes';
import userRouter from '../modules/users/routes/users.routes'

const routes = Router();

routes.use('/api/v1/users', userRouter);
routes.use('/api/v1/auth', authRouter);

export default routes;
