import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import isAuthenticated from '../../../middlewares/auth/isAuthenticated';

const authRouter = Router();
const authController = new AuthController();

authRouter.post('/login', authController.login);
authRouter.get('/me', isAuthenticated, authController.me);

export default authRouter;
