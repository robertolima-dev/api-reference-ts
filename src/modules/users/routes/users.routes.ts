import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import isAuthenticated from 'src/middlewares/auth/isAuthenticated';
import multer from 'multer'
import uploadConfig from '../../../config/upload'
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const usersController = new UsersController();
const usersAvatarController = new UserAvatarController();
const upload = multer(uploadConfig)

usersRouter.get('/', usersController.index);
usersRouter.get('/:id', usersController.show);
usersRouter.post('/', usersController.create);
usersRouter.put('/:id', usersController.update);
usersRouter.delete('/:id', usersController.delete);

usersRouter.patch('/avatar', isAuthenticated, upload.single('avatar'), usersAvatarController.update);

export default usersRouter;
